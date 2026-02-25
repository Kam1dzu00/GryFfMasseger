import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Container, Sidebar, SidebarHeader, ChatList, ChatItem, Avatar, ChatInfo, ChatName, LastMessage, MainArea, ChatHeader, MessagesArea, MessageBubble, MessageTime, InputArea, Input, SendButton, BackButton } from './Chat.styles';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import styled from 'styled-components';
import { FaPlus, FaSearch, FaUser, FaUsers, FaPaperclip, FaGlobe, FaNewspaper, FaPhone, FaVideo, FaSmile, FaMoon, FaSun, FaArrowLeft } from 'react-icons/fa';
import SimplePeer from 'simple-peer';
// @ts-ignore
import { Buffer } from 'buffer';
import StickerPicker from '../components/StickerPicker';
import { useTheme } from '../context/ThemeContext';

// Polyfill Buffer for SimplePeer
if (!window.Buffer) {
    window.Buffer = Buffer;
}

const SOCKET_URL = 'http://localhost:3000';

interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
  isMine: boolean;
}

interface Chat {
  id: number;
  type: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  updatedAt: string;
  ownerId?: number; 
  partnerId?: number;
  wallpaper?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
}

// Modal Styles (Quick implementation)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const UserItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #f5f5f5;
  }
`;

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Search Modal State
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  
  // Group Modal State
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [groupSearchResults, setGroupSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  // Chat Info Modal
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [addMemberQuery, setAddMemberQuery] = useState('');
  const [addMemberResults, setAddMemberResults] = useState<User[]>([]);
  const { theme, toggleTheme } = useTheme();

  // Call State
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>(null);

  // File Upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Initial Setup: Auth & Socket
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Decode token or fetch user info (simplest: fetch /auth/me if endpoint existed, or decode)
    // For now, let's rely on the token being valid and decode it manually if needed, 
    // OR create a /me endpoint. I added /me endpoint in previous step.
    api.default.get('/auth/me')
        .then(res => {
            setCurrentUser(res.data);
            // Register for signaling
            newSocket.emit('register_user', res.data.id);
            setName(res.data.username);
        })
        .catch(() => navigate('/login'));

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('call_user', (data: any) => {
        setReceivingCall(true);
        setCaller(data.from);
        setName(data.name);
        setCallerSignal(data.signal);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  // Effect to handle myVideo ref when stream changes
  useEffect(() => {
      if (stream && myVideo.current) {
          myVideo.current.srcObject = stream;
      }
  }, [stream]);

  // 2. Fetch Chats
  useEffect(() => {
      if (currentUser) {
        fetchChats();
      }
  }, [currentUser]);

  const fetchChats = async () => {
      try {
          const res = await api.getChats();
          setChats(res.data);
      } catch (error) {
          console.error('Error fetching chats:', error);
      }
  };

  // 3. Listen for incoming messages
  useEffect(() => {
    if (!socket || !currentUser) return;

    const handleReceiveMessage = (data: any) => {
        console.log('Received message:', data);
        
        // Update messages if looking at this chat
        if (activeChat === data.chatId) {
            setMessages((prev) => [...prev, {
                id: data.id,
                content: data.content,
                senderId: data.senderId,
                createdAt: new Date(data.createdAt).toLocaleTimeString(),
                isMine: data.senderId === currentUser.id
            }]);
        }

        // Update chat list (last message)
        setChats(prevChats => {
            return prevChats.map(chat => {
                if (chat.id === data.chatId) {
                    return { ...chat, lastMessage: data.content, updatedAt: new Date().toISOString() };
                }
                return chat;
            }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        });
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
        socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, activeChat, currentUser]);

  // 4. Handle Chat Selection
  useEffect(() => {
      if (activeChat && socket) {
          // Join the room
          socket.emit('join_room', activeChat);

          // Fetch history
          api.getMessages(activeChat).then(res => {
              const formattedMessages = res.data.map((msg: any) => ({
                  id: msg.id,
                  content: msg.content,
                  senderId: msg.senderId,
                  createdAt: new Date(msg.createdAt).toLocaleTimeString(),
                  isMine: msg.senderId === currentUser?.id
              }));
              setMessages(formattedMessages);
          });
      }
  }, [activeChat, socket, currentUser]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (currentMessage.trim() && socket && currentUser && activeChat) {
      const messageData = {
        roomId: activeChat,
        message: currentMessage,
        sender: currentUser.id,
      };
      socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // User Search
  useEffect(() => {
      if (searchQuery.length > 1) {
          const delayDebounceFn = setTimeout(() => {
              api.searchUsers(searchQuery).then(res => {
                  setSearchResults(res.data);
              });
          }, 300);
          return () => clearTimeout(delayDebounceFn);
      } else {
          setSearchResults([]);
      }
  }, [searchQuery]);

  const startChat = async (partnerId: number) => {
      try {
          const res = await api.createPrivateChat(partnerId);
          const newChat = res.data;
          
          // Refresh chats
          await fetchChats();
          
          setActiveChat(newChat.id);
          setShowSearchModal(false);
          setSearchQuery('');
      } catch (error) {
          console.error('Error creating chat:', error);
      }
  };

  // Group Search
  useEffect(() => {
    if (groupSearchQuery.length > 1) {
      const delayDebounceFn = setTimeout(() => {
        api.searchUsers(groupSearchQuery).then(res => {
          setGroupSearchResults(res.data);
        });
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setGroupSearchResults([]);
    }
  }, [groupSearchQuery]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0] && socket && currentUser && activeChat) {
          try {
              const res = await api.uploadFile(e.target.files[0]);
              const messageData = {
                  roomId: activeChat,
                  message: res.data.url, // For now, just sending URL as text. In real app, separate 'type' field
                  sender: currentUser.id,
              };
              socket.emit('send_message', messageData);
          } catch (error) {
              console.error('Upload failed', error);
          }
      }
  };

  const handleStickerSelect = async (url: string) => {
      if (socket && currentUser && activeChat) {
          const messageData = {
              roomId: activeChat,
              message: url,
              sender: currentUser.id,
          };
          socket.emit('send_message', messageData);
          setShowStickerPicker(false);
      }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length === 0) return;
    try {
      const participantIds = selectedUsers.map(u => u.id);
      const res = await api.createGroupChat(groupName, participantIds);
      const newChat = res.data;
      
      await fetchChats();
      setActiveChat(newChat.id);
      
      // Reset
      setShowGroupModal(false);
      setGroupName('');
      setSelectedUsers([]);
      setGroupSearchQuery('');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleOpenChatInfo = async () => {
      if (!activeChat) return;
      try {
          const res = await api.getChatParticipants(activeChat);
          setParticipants(res.data);
          setShowChatInfo(true);
      } catch (error) {
          console.error('Error fetching participants', error);
      }
  };

  // Add Member Search
  useEffect(() => {
    if (addMemberQuery.length > 1) {
      const delayDebounceFn = setTimeout(() => {
        api.searchUsers(addMemberQuery).then(res => {
          setAddMemberResults(res.data);
        });
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setAddMemberResults([]);
    }
  }, [addMemberQuery]);

  const handleAddMember = async (userId: number) => {
      if (!activeChat) return;
      try {
          await api.addParticipant(activeChat, userId);
          // Refresh participants
          const res = await api.getChatParticipants(activeChat);
          setParticipants(res.data);
          setAddMemberQuery('');
          setShowAddMember(false);
      } catch (error) {
          console.error('Error adding member', error);
      }
  };

  const handleCall = (video: boolean) => {
    if (!activeChatData || activeChatData.type !== 'private') return;
    
    // Get partner ID
    const partnerId = activeChatData.name; // This is actually partner name in current mock, need real ID.
    // Wait, activeChatData doesn't have partner ID easily accessible if we just store "name".
    // We need to fetch participants or store them in chat object.
    // Let's assume for now we can get it. 
    // Actually, createPrivateChat returns the chat. getUserChats formats it.
    // We need to improve getUserChats to return partnerId for private chats.
    
    // For now, let's implement the UI and logic assuming we have partnerId.
    // We'll update the Chat interface and backend shortly.
    
    navigator.mediaDevices.getUserMedia({ video: video, audio: true }).then((currentStream) => {
      setStream(currentStream);
      setCallAccepted(false);
      setCallEnded(false);
      
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: currentStream,
      });

      peer.on('signal', (data: any) => {
        socket?.emit('call_user', {
          userToCall: activeChatData.partnerId, 
          signalData: data,
          from: currentUser.id,
          name: currentUser.username,
        });
      });

      peer.on('stream', (userStream: any) => {
        if (userVideo.current) {
          userVideo.current.srcObject = userStream;
        }
      });

      socket?.on('call_accepted', (signal: any) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    });
  };

  const answerCall = () => {
    setCallAccepted(true);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: currentStream,
      });

      peer.on('signal', (data: any) => {
        socket?.emit('answer_call', { signal: data, to: caller });
      });

      peer.on('stream', (userStream: any) => {
        if (userVideo.current) {
          userVideo.current.srcObject = userStream;
        }
      });

      peer.signal(callerSignal);
      connectionRef.current = peer;
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
        connectionRef.current.destroy();
    }
    // Stop tracks
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setReceivingCall(false);
  };

  const handleUpdateWallpaper = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0] && activeChat) {
          try {
              const res = await api.uploadFile(e.target.files[0]);
              await api.updateChat(activeChat, { wallpaper: res.data.url });
              // Update local state
              setChats(chats.map(c => c.id === activeChat ? { ...c, wallpaper: res.data.url } : c));
          } catch (error) {
              console.error('Wallpaper upload failed', error);
          }
      }
  };

  const activeChatData = chats.find(c => c.id === activeChat);

  // Responsive state
  const isMobile = window.innerWidth <= 768; // Simplistic check, better use a hook

  return (
    <Container>
      {/* Call Modal */}
      {(stream || receivingCall) && (
          <ModalOverlay>
              <ModalContent style={{ width: 600, alignItems: 'center', background: '#333', color: 'white' }}>
                  <h3>{receivingCall && !callAccepted ? `${name} is calling...` : (callAccepted ? 'Call in progress' : 'Calling...')}</h3>
                  
                  <div style={{ display: 'flex', gap: 20, justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                      {/* My Video */}
                      {stream && (
                          <div style={{ position: 'relative' }}>
                              <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px', borderRadius: 10, transform: 'scaleX(-1)' }} />
                              <span style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: 5, fontSize: 12 }}>You</span>
                          </div>
                      )}
                      {/* User Video */}
                      {callAccepted && !callEnded && (
                          <div style={{ position: 'relative' }}>
                              <video playsInline ref={userVideo} autoPlay style={{ width: '300px', borderRadius: 10 }} />
                              <span style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: 5, fontSize: 12 }}>{name || 'Partner'}</span>
                          </div>
                      )}
                  </div>

                  <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
                      {receivingCall && !callAccepted ? (
                          <>
                              <Button primary onClick={answerCall} style={{ background: '#4CAF50' }}>Answer</Button>
                              <Button onClick={leaveCall} style={{ background: '#f44336', color: 'white' }}>Decline</Button>
                          </>
                      ) : (
                          <Button onClick={leaveCall} style={{ background: '#f44336', color: 'white' }}>End Call</Button>
                      )}
                  </div>
              </ModalContent>
          </ModalOverlay>
      )}

      {/* Sidebar (Chat List) */}
      <Sidebar active={!activeChat}>
        <SidebarHeader>
          <h3 style={{ margin: 0, color: '#FF8C00' }}>GryFf</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/communities')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>
                <FaGlobe size={18} title="Сообщества" />
            </button>
            <button onClick={() => navigate('/feed')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>
                <FaNewspaper size={18} title="Новости" />
            </button>
            <button onClick={() => currentUser && navigate(`/profile/${currentUser.id}`)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>
                <FaUser size={18} title="Профиль" />
            </button>
            <button onClick={toggleTheme} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>
                {theme === 'light' ? <FaMoon size={18} title="Темная тема" /> : <FaSun size={18} title="Светлая тема" />}
            </button>
            <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>Выход</button>
          </div>
        </SidebarHeader>

        <div style={{ padding: 10 }}>
            <div style={{ position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', top: 10, left: 10, color: '#999' }} />
                <Input 
                    placeholder="Поиск..." 
                    style={{ paddingLeft: 35, width: '100%', boxSizing: 'border-box' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        <div style={{ padding: '0 10px 10px', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setShowGroupModal(true)} style={{ background: '#FF8C00', color: 'white', border: 'none', borderRadius: 5, padding: '5px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                <FaUsers /> Группа
            </button>
            <button onClick={() => setShowSearchModal(true)} style={{ background: '#FF8C00', color: 'white', border: 'none', borderRadius: 5, padding: '5px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                <FaPlus /> Чат
            </button>
        </div>
        <ChatList>
          {chats.map((chat) => (
            <ChatItem key={chat.id} active={activeChat === chat.id} onClick={() => setActiveChat(chat.id)}>
              <Avatar />
              <ChatInfo>
                <ChatName>{chat.name}</ChatName>
                <LastMessage>{chat.lastMessage || 'No messages yet'}</LastMessage>
              </ChatInfo>
            </ChatItem>
          ))}
          {chats.length === 0 && (
              <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
                  No chats yet. Click + to start one.
              </div>
          )}
        </ChatList>
      </Sidebar>
      <MainArea active={!!activeChat}>
        {activeChat ? (
            <>
                <ChatHeader onClick={handleOpenChatInfo} style={{ cursor: 'pointer' }}>
                <BackButton onClick={(e) => { e.stopPropagation(); setActiveChat(null); }}>
                    <FaArrowLeft size={18} />
                </BackButton>
                <Avatar style={{ width: 40, height: 40, marginRight: 10 }} />
                <h4 style={{ margin: 0 }}>{activeChatData?.name}</h4>
                {/* Call Buttons */}
                {activeChatData?.type === 'private' && (
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 15, marginRight: 15 }}>
                        <button onClick={() => handleCall(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>
                            <FaPhone size={18} title="Audio Call" />
                        </button>
                        <button onClick={() => handleCall(true)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>
                            <FaVideo size={18} title="Video Call" />
                        </button>
                    </div>
                )}
                {/* Wallpaper Button */}
                <div style={{ marginLeft: activeChatData?.type === 'private' ? 0 : 'auto', marginRight: 15 }}>
                    <button onClick={() => document.getElementById('wallpaper-upload')?.click()} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#757575' }}>
                        <span style={{ fontSize: 18 }}>🖼️</span>
                    </button>
                    <input type="file" id="wallpaper-upload" style={{ display: 'none' }} onChange={handleUpdateWallpaper} />
                </div>
                </ChatHeader>
                <MessagesArea style={{ backgroundImage: activeChatData?.wallpaper ? `url(${activeChatData.wallpaper})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} isMine={msg.isMine}>
                    {msg.content.startsWith('http') && (msg.content.match(/\.(jpeg|jpg|gif|png)$/) != null) ? (
                        <img src={msg.content} style={{ maxWidth: '100%', borderRadius: 5 }} />
                    ) : (
                        msg.content
                    )}
                    <MessageTime isMine={msg.isMine}>{msg.createdAt}</MessageTime>
                    </MessageBubble>
                ))}
                <div ref={messagesEndRef} />
                </MessagesArea>
                <InputArea>
                {showStickerPicker && (
                    <div style={{ position: 'absolute', bottom: '70px', left: '20px', zIndex: 100 }}>
                        <StickerPicker onSelect={handleStickerSelect} />
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload}
                />
                <button onClick={() => setShowStickerPicker(!showStickerPicker)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginRight: 5, color: '#757575' }}>
                    <FaSmile size={20} />
                </button>
                <button onClick={() => fileInputRef.current?.click()} style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginRight: 10, color: '#757575' }}>
                    <FaPaperclip size={20} />
                </button>
                <Input 
                    placeholder="Сообщение..." 
                    value={currentMessage} 
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <SendButton onClick={sendMessage}>Отпр.</SendButton>
                </InputArea>
            </>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#999' }}>
                Select a chat to start messaging
            </div>
        )}
      </MainArea>

      {/* Search Modal */}
      {showSearchModal && (
          <ModalOverlay onClick={() => setShowSearchModal(false)}>
              <ModalContent onClick={e => e.stopPropagation()}>
                  <h3>New Chat</h3>
                  <SearchInput 
                    placeholder="Search users by name or email..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <div style={{ overflowY: 'auto', flex: 1 }}>
                      {searchResults.map(user => (
                          <UserItem key={user.id} onClick={() => startChat(user.id)}>
                              <Avatar style={{ width: 30, height: 30, marginRight: 10 }} />
                              <div>{user.username}</div>
                          </UserItem>
                      ))}
                      {searchQuery && searchResults.length === 0 && (
                          <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>No users found</div>
                      )}
                  </div>
                  <button onClick={() => setShowSearchModal(false)} style={{ marginTop: 15, padding: 10, cursor: 'pointer' }}>Cancel</button>
              </ModalContent>
          </ModalOverlay>
      )}
      {/* Chat Info Modal */}
      {showChatInfo && (
          <ModalOverlay onClick={() => setShowChatInfo(false)}>
              <ModalContent onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3>{activeChatData?.name}</h3>
                    <button onClick={() => setShowChatInfo(false)} style={{ border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer' }}>×</button>
                  </div>
                  
                  {activeChatData?.type === 'group' && (
                      <button onClick={() => setShowAddMember(true)} style={{ marginBottom: 15, padding: 8, cursor: 'pointer', background: '#f0f0f0', border: 'none', borderRadius: 5 }}>
                          + Add Member
                      </button>
                  )}

                  {showAddMember && (
                      <div style={{ marginBottom: 15, padding: 10, background: '#f9f9f9', borderRadius: 5 }}>
                          <SearchInput 
                            placeholder="Search user to add..." 
                            value={addMemberQuery}
                            onChange={e => setAddMemberQuery(e.target.value)}
                            autoFocus
                          />
                           <div style={{ maxHeight: 150, overflowY: 'auto' }}>
                                {addMemberResults.map(user => (
                                    <UserItem key={user.id} onClick={() => handleAddMember(user.id)}>
                                        <Avatar style={{ width: 25, height: 25, marginRight: 10 }} />
                                        <div>{user.username}</div>
                                    </UserItem>
                                ))}
                           </div>
                           <button onClick={() => setShowAddMember(false)} style={{ marginTop: 5, fontSize: 12, cursor: 'pointer' }}>Cancel</button>
                      </div>
                  )}

                  <h4>Participants ({participants.length})</h4>
                  <div style={{ overflowY: 'auto', flex: 1 }}>
                      {participants.map(p => (
                          <UserItem key={p.id} onClick={() => navigate(`/profile/${p.id}`)}>
                              <Avatar style={{ width: 30, height: 30, marginRight: 10 }} />
                              <div>{p.username}</div>
                              {activeChatData?.type === 'group' && activeChatData.ownerId === p.id && <span style={{ marginLeft: 5, fontSize: 11, color: '#FF8C00' }}>Owner</span>}
                          </UserItem>
                      ))}
                  </div>
              </ModalContent>
          </ModalOverlay>
      )}

      {/* Group Modal */}
      {showGroupModal && (
        <ModalOverlay onClick={() => setShowGroupModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h3>New Group Chat</h3>
            <Input 
              placeholder="Group Name" 
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              style={{ marginBottom: 15 }}
            />
            <SearchInput 
              placeholder="Search users to add..." 
              value={groupSearchQuery}
              onChange={e => setGroupSearchQuery(e.target.value)}
            />
            
            <div style={{ marginBottom: 10 }}>
                <strong>Selected:</strong>
                {selectedUsers.map(u => (
                    <span key={u.id} style={{ background: '#e0e0e0', padding: '2px 8px', borderRadius: 10, margin: '0 5px', fontSize: 12 }}>
                        {u.username} <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setSelectedUsers(prev => prev.filter(pu => pu.id !== u.id))}>x</span>
                    </span>
                ))}
            </div>

            <div style={{ overflowY: 'auto', flex: 1, border: '1px solid #eee', borderRadius: 5 }}>
                {groupSearchResults.map(user => {
                    const isSelected = selectedUsers.some(u => u.id === user.id);
                    return (
                        <UserItem key={user.id} onClick={() => {
                            if (!isSelected) {
                                setSelectedUsers(prev => [...prev, user]);
                                setGroupSearchQuery('');
                            }
                        }}>
                            <Avatar style={{ width: 30, height: 30, marginRight: 10 }} />
                            <div style={{ flex: 1 }}>{user.username}</div>
                            {isSelected && <span style={{ color: 'green' }}>✓</span>}
                        </UserItem>
                    );
                })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 15 }}>
                <button onClick={() => setShowGroupModal(false)} style={{ padding: 10, cursor: 'pointer' }}>Cancel</button>
                <SendButton onClick={handleCreateGroup} style={{ width: 'auto', padding: '0 20px', borderRadius: 5 }}>Create</SendButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Chat;
