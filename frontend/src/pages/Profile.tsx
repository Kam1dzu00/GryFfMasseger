import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import styled from 'styled-components';

// ... (Styles are imported or defined below)

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', 'SF Pro', sans-serif;
`;

const ProfileHeader = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const CoverImage = styled.div<{ url?: string }>`
  height: 200px;
  background-color: #ddd;
  background-image: url(${props => props.url || 'https://via.placeholder.com/960x200'});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ProfileInfo = styled.div`
  padding: 0 20px 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const AvatarWrapper = styled.div`
  margin-top: -50px;
  border: 4px solid white;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  background: white;
  overflow: hidden;
  z-index: 2;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  flex: 1;
  margin-left: 20px;
  padding-top: 10px;
`;

const UserName = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const UserStatus = styled.p`
  margin: 5px 0 0;
  color: #757575;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  background: ${props => props.primary ? '#FF8C00' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    background: ${props => props.primary ? '#e67e00' : '#f5f5f5'};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const CardTitle = styled.h3`
  margin: 0 0 15px;
  font-size: 16px;
  color: #333;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
  display: flex;
  justify-content: space-between;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

const Tab = styled.div<{ active?: boolean }>`
  cursor: pointer;
  color: ${props => props.active ? '#FF8C00' : '#555'};
  border-bottom: 2px solid ${props => props.active ? '#FF8C00' : 'transparent'};
  font-weight: 500;
  padding-bottom: 5px;
`;

const CreatePost = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const PostInput = styled.input`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 15px;
  outline: none;
  &:focus {
    border-color: #FF8C00;
  }
`;

const Post = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 15px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PostAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostAuthor = styled.div`
  font-weight: 500;
`;

const PostDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const PostContent = styled.div`
  font-size: 15px;
  line-height: 1.5;
`;

interface UserProfile {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  coverUrl?: string;
  status?: string;
  city?: string;
  birthDate?: string;
  about?: string;
  wallPosts?: WallPost[];
}

interface WallPost {
  id: number;
  content: string;
  mediaUrl?: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    avatarUrl?: string;
  };
}

// ... (previous imports)

// Modal Styles (can reuse from Chat or create shared)
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
  gap: 15px;
  overflow-y: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('wall');
  const [newPostContent, setNewPostContent] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [friendshipStatus, setFriendshipStatus] = useState<string>('none');
  const [friends, setFriends] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const navigate = useNavigate();

  // Edit Form State
  const [editForm, setEditForm] = useState({
      username: '',
      status: '',
      city: '',
      birthDate: '',
      about: '',
      avatarUrl: '',
      coverUrl: ''
  });

  useEffect(() => {
    // Get current user
    api.default.get('/auth/me').then(res => setCurrentUser(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (userId) {
      loadProfile(userId);
    } else if (currentUser) {
        // If no userId provided, redirect to own profile
        navigate(`/profile/${currentUser.id}`);
    }
  }, [userId, currentUser, navigate]);

  const loadProfile = async (id: string) => {
    try {
      const res = await api.getProfile(id);
      setProfile(res.data);
      
      // Load friends
      const friendsRes = await api.getFriends(id);
      setFriends(friendsRes.data);

      // Check friendship status
      if (currentUser && currentUser.id !== parseInt(id)) {
          const statusRes = await api.getFriendshipStatus(parseInt(id));
          setFriendshipStatus(statusRes.data.status);
      }

      // Load Photos
      const photosRes = await api.getUserPhotos(id);
      setPhotos(photosRes.data);

      // Init form
      if (res.data) {
          setEditForm({
              username: res.data.username || '',
              status: res.data.status || '',
              city: res.data.city || '',
              birthDate: res.data.birthDate || '',
              about: res.data.about || '',
              avatarUrl: res.data.avatarUrl || '',
              coverUrl: res.data.coverUrl || ''
          });
      }
    } catch (error) {
      console.error('Failed to load profile', error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !userId) return;
    try {
      await api.createWallPost(userId, newPostContent);
      setNewPostContent('');
      loadProfile(userId); // Refresh posts
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  const handleMessage = async () => {
      if (!currentUser || !profile) return;
      try {
          const res = await api.createPrivateChat(profile.id);
          navigate('/chat');
      } catch (error) {
          console.error('Failed to start chat', error);
      }
  };

  const handleSaveProfile = async () => {
      try {
          const res = await api.updateProfile(editForm);
          setProfile(res.data); // Update local profile data
          setIsEditing(false);
      } catch (error) {
          console.error('Failed to update profile', error);
      }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'coverUrl') => {
      if (e.target.files && e.target.files[0]) {
          try {
              const res = await api.uploadFile(e.target.files[0]);
              setEditForm({ ...editForm, [field]: res.data.url });
          } catch (error) {
              console.error('Upload failed', error);
          }
      }
  };

  const handleFriendAction = async () => {
      if (!profile) return;
      try {
          if (friendshipStatus === 'none') {
              await api.sendFriendRequest(profile.id);
              setFriendshipStatus('sent');
          } else if (friendshipStatus === 'received') {
              await api.acceptFriendRequest(profile.id);
              setFriendshipStatus('friends');
              // Reload friends
              const friendsRes = await api.getFriends(profile.id.toString());
              setFriends(friendsRes.data);
          } else if (friendshipStatus === 'friends' || friendshipStatus === 'sent') {
              await api.removeFriend(profile.id);
              setFriendshipStatus('none');
              const friendsRes = await api.getFriends(profile.id.toString());
              setFriends(friendsRes.data);
          }
      } catch (error) {
          console.error('Friend action failed', error);
      }
  };

  const isMyProfile = currentUser && profile && currentUser.id === profile.id;

  const getFriendButtonText = () => {
      switch (friendshipStatus) {
          case 'friends': return 'Remove Friend';
          case 'sent': return 'Cancel Request';
          case 'received': return 'Accept Request';
          default: return 'Add Friend';
      }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <Container>
      <button onClick={() => navigate('/chat')} style={{ marginBottom: 10, cursor: 'pointer', border: 'none', background: 'transparent', color: '#FF8C00' }}>← Back to Chat</button>
      
      <ProfileHeader>
        <CoverImage url={profile.coverUrl} />
        <ProfileInfo>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <AvatarWrapper>
              <Avatar src={profile.avatarUrl || 'https://via.placeholder.com/150'} />
            </AvatarWrapper>
            <UserDetails>
              <UserName>{profile.username}</UserName>
              <UserStatus>{profile.status || 'No status'}</UserStatus>
            </UserDetails>
          </div>
          <ActionButtons>
            {!isMyProfile && (
                <>
                    <Button primary onClick={handleMessage}>Message</Button>
                    <Button onClick={handleFriendAction}>{getFriendButtonText()}</Button>
                </>
            )}
            {isMyProfile && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
          </ActionButtons>
        </ProfileInfo>
      </ProfileHeader>

      <ContentGrid>
        {/* Left Sidebar */}
        <Sidebar>
            <Card>
                <CardTitle>Info</CardTitle>
                <InfoItem>
                    <span>City:</span>
                    <span>{profile.city || 'Not specified'}</span>
                </InfoItem>
                <InfoItem>
                    <span>Birthday:</span>
                    <span>{profile.birthDate || 'Not specified'}</span>
                </InfoItem>
                <InfoItem>
                    <span>About:</span>
                    <span>{profile.about || '-'}</span>
                </InfoItem>
            </Card>
            <Card>
                <CardTitle>Friends {friends.length > 0 && `(${friends.length})`}</CardTitle>
                {friends.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {friends.slice(0, 6).map(friend => (
                            <div key={friend.id} onClick={() => navigate(`/profile/${friend.id}`)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                                <img src={friend.avatarUrl || 'https://via.placeholder.com/50'} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
                                <div style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{friend.username}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ color: '#999', fontSize: 14 }}>No friends yet</div>
                )}
            </Card>
            <Card>
                <CardTitle>Photos {photos.length > 0 && `(${photos.length})`}</CardTitle>
                {photos.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
                        {photos.slice(0, 6).map(photo => (
                            <img key={photo.id} src={photo.mediaUrl} style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 4, cursor: 'pointer' }} onClick={() => setActiveTab('photos')} />
                        ))}
                    </div>
                ) : (
                    <div style={{ color: '#999', fontSize: 14 }}>No photos</div>
                )}
            </Card>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
            <Card>
                <Tabs>
                    <Tab active={activeTab === 'wall'} onClick={() => setActiveTab('wall')}>Wall</Tab>
                    <Tab active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>Photos</Tab>
                    <Tab active={activeTab === 'videos'} onClick={() => setActiveTab('videos')}>Videos</Tab>
                </Tabs>
                
                {activeTab === 'wall' && (
                <>
                    {(isMyProfile || true) && ( // Allow posting on others' walls for now (VK style)
                        <CreatePost>
                            <img src={currentUser?.avatarUrl || 'https://via.placeholder.com/40'} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                            <div style={{ flex: 1, display: 'flex', gap: 10 }}>
                                <PostInput 
                                    placeholder="What's on your mind?" 
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
                                />
                                <Button primary onClick={handleCreatePost}>Post</Button>
                            </div>
                        </CreatePost>
                    )}

                    {profile.wallPosts && profile.wallPosts.map(post => (
                        <Post key={post.id}>
                            <PostHeader>
                                <PostAvatar src={post.author.avatarUrl || 'https://via.placeholder.com/40'} />
                                <div>
                                    <PostAuthor>{post.author.username}</PostAuthor>
                                    <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
                                </div>
                            </PostHeader>
                            <PostContent>{post.content}</PostContent>
                        </Post>
                    ))}
                    {(!profile.wallPosts || profile.wallPosts.length === 0) && (
                        <div style={{ textAlign: 'center', color: '#999', padding: 20 }}>No posts yet</div>
                    )}
                </>
            )}

            {activeTab === 'photos' && (
                <div style={{ padding: 15 }}>
                    {photos.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                            {photos.map(photo => (
                                <img key={photo.id} src={photo.mediaUrl} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 5 }} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#999', padding: 20 }}>No photos uploaded yet</div>
                    )}
                </div>
            )}
            </Card>
        </MainContent>
      </ContentGrid>

      {/* Edit Profile Modal */}
      {isEditing && (
          <ModalOverlay onClick={() => setIsEditing(false)}>
              <ModalContent onClick={e => e.stopPropagation()}>
                  <h3>Edit Profile</h3>
                  <div>
                      <Label>Username</Label>
                      <Input value={editForm.username} onChange={e => setEditForm({...editForm, username: e.target.value})} />
                  </div>
                  <div>
                      <Label>Status</Label>
                      <Input value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})} />
                  </div>
                  <div>
                      <Label>City</Label>
                      <Input value={editForm.city} onChange={e => setEditForm({...editForm, city: e.target.value})} />
                  </div>
                  <div>
                      <Label>Birthday (YYYY-MM-DD)</Label>
                      <Input type="date" value={editForm.birthDate} onChange={e => setEditForm({...editForm, birthDate: e.target.value})} />
                  </div>
                  <div>
                      <Label>About</Label>
                      <textarea 
                        value={editForm.about} 
                        onChange={e => setEditForm({...editForm, about: e.target.value})} 
                        style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 5, minHeight: 80 }}
                      />
                  </div>
                  <div>
                      <Label>Avatar</Label>
                      <Input type="file" onChange={e => handleFileUpload(e, 'avatarUrl')} />
                      {editForm.avatarUrl && <img src={editForm.avatarUrl} style={{ width: 50, height: 50, marginTop: 5 }} />}
                  </div>
                  <div>
                      <Label>Cover</Label>
                      <Input type="file" onChange={e => handleFileUpload(e, 'coverUrl')} />
                      {editForm.coverUrl && <img src={editForm.coverUrl} style={{ width: 100, height: 30, marginTop: 5 }} />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                      <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button primary onClick={handleSaveProfile}>Save</Button>
                  </div>
              </ModalContent>
          </ModalOverlay>
      )}
    </Container>
  );
};

export default Profile;
