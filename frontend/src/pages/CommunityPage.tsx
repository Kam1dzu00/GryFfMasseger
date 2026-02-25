import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import styled from 'styled-components';

// Reuse styles from Profile
import { 
    Container, ProfileHeader, CoverImage, ProfileInfo, AvatarWrapper, Avatar, 
    UserDetails, UserName, UserStatus, ActionButtons, Button,
    ContentGrid, Sidebar, Card, CardTitle, InfoItem, MainContent, Tabs, Tab, 
    CreatePost, PostInput, Post as PostStyled, PostHeader, PostAvatar, PostAuthor, PostDate, PostContent 
} from './Profile.styles';

const DiscussionItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

const Comment = styled.div`
  padding: 10px;
  background: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CommunityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('wall');
  const [newPostContent, setNewPostContent] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [activeDiscussion, setActiveDiscussion] = useState<any>(null);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.default.get('/auth/me').then(res => setCurrentUser(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (id) {
      loadCommunity(id);
    }
  }, [id]);

  useEffect(() => {
      if (activeTab === 'discussions' && id) {
          loadDiscussions(id);
      }
  }, [activeTab, id]);

  const loadCommunity = async (communityId: string) => {
    try {
      const res = await api.getCommunity(communityId);
      setCommunity(res.data);
    } catch (error) {
      console.error('Failed to load community', error);
    }
  };

  const loadDiscussions = async (communityId: string) => {
      try {
          const res = await api.getDiscussions(communityId);
          setDiscussions(res.data);
      } catch (error) {
          console.error('Failed to load discussions', error);
      }
  };

  const handleJoinLeave = async () => {
      if (!id) return;
      try {
          const res = await api.toggleCommunityMembership(id);
          // Reload to get fresh state
          loadCommunity(id);
      } catch (error) {
          console.error('Failed to join/leave', error);
      }
  };

  const handleCreatePost = async () => {
      if (!newPostContent.trim() || !id) return;
      try {
          await api.createCommunityPost(id, newPostContent);
          setNewPostContent('');
          loadCommunity(id);
      } catch (error) {
          console.error('Failed to create post', error);
          alert('Failed to post. Only owners can post on public pages.');
      }
  };

  const handleCreateDiscussion = async () => {
      if (!newDiscussionTitle.trim() || !newDiscussionContent.trim() || !id) return;
      try {
          await api.createDiscussion(id, newDiscussionTitle, newDiscussionContent);
          setNewDiscussionTitle('');
          setNewDiscussionContent('');
          loadDiscussions(id);
      } catch (error) {
          console.error('Failed to create discussion', error);
      }
  };

  const handleOpenDiscussion = async (discussionId: string) => {
      try {
          const res = await api.getDiscussionDetails(discussionId);
          setActiveDiscussion(res.data);
      } catch (error) {
          console.error('Failed to load discussion details', error);
      }
  };

  const handleAddComment = async () => {
      if (!newComment.trim() || !activeDiscussion) return;
      try {
          const res = await api.addDiscussionComment(activeDiscussion.id, newComment);
          setNewComment('');
          // Refresh discussion
          handleOpenDiscussion(activeDiscussion.id);
      } catch (error) {
          console.error('Failed to add comment', error);
      }
  };

  if (!community) return <div>Loading...</div>;

  // Determine if user can post
  // Public Page: Owner only
  // Group: Members
  const canPost = community.type === 'group' 
    ? community.isMember 
    : (currentUser && community.ownerId === currentUser.id);

  return (
    <Container>
      <button onClick={() => navigate('/communities')} style={{ marginBottom: 10, cursor: 'pointer', border: 'none', background: 'transparent', color: '#FF8C00' }}>← Back to Communities</button>
      
      <ProfileHeader>
        <CoverImage url={community.coverUrl} />
        <ProfileInfo>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <AvatarWrapper>
              <Avatar src={community.avatarUrl || 'https://via.placeholder.com/150'} />
            </AvatarWrapper>
            <UserDetails>
              <UserName>{community.name}</UserName>
              <UserStatus>{community.type} • {community.members?.length || 0} members</UserStatus>
            </UserDetails>
          </div>
          <ActionButtons>
            <Button primary onClick={handleJoinLeave}>
                {community.isMember ? 'Unsubscribe' : 'Subscribe'}
            </Button>
            {/* If owner, show manage button */}
            {currentUser && community.ownerId === currentUser.id && (
                <Button>Manage</Button>
            )}
          </ActionButtons>
        </ProfileInfo>
      </ProfileHeader>

      <ContentGrid>
        <Sidebar>
            <Card>
                <CardTitle>About</CardTitle>
                <InfoItem>
                    <span style={{ lineHeight: 1.5 }}>{community.description || 'No description'}</span>
                </InfoItem>
            </Card>
            {/* Can add Members widget here */}
        </Sidebar>

        <MainContent>
            <Card>
                <Tabs>
                    <Tab active={activeTab === 'wall'} onClick={() => { setActiveTab('wall'); setActiveDiscussion(null); }}>Wall</Tab>
                    <Tab active={activeTab === 'discussions'} onClick={() => setActiveTab('discussions')}>Discussions</Tab>
                </Tabs>
                
                {activeTab === 'wall' && (
                  <div style={{ padding: '0 15px 15px' }}>
                    {canPost && (
                        <CreatePost>
                            <img src={currentUser?.avatarUrl || 'https://via.placeholder.com/40'} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                            <div style={{ flex: 1, display: 'flex', gap: 10 }}>
                                <PostInput 
                                    placeholder="What's new?" 
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
                                />
                                <Button primary onClick={handleCreatePost}>Post</Button>
                            </div>
                        </CreatePost>
                    )}

                    {community.wallPosts && community.wallPosts.map((post: any) => (
                        <PostStyled key={post.id}>
                            <PostHeader>
                                <PostAvatar src={post.author.avatarUrl || 'https://via.placeholder.com/40'} />
                                <div>
                                    <PostAuthor>{post.author.username}</PostAuthor>
                                    <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
                                </div>
                            </PostHeader>
                            <PostContent>{post.content}</PostContent>
                        </PostStyled>
                    ))}
                    {(!community.wallPosts || community.wallPosts.length === 0) && (
                        <div style={{ textAlign: 'center', color: '#999', padding: 20 }}>No posts yet</div>
                    )}
                  </div>
                )}
                
                {activeTab === 'discussions' && !activeDiscussion && (
                    <div style={{ padding: 15 }}>
                        {community.isMember && (
                            <div style={{ marginBottom: 20, padding: 15, background: '#f9f9f9', borderRadius: 5 }}>
                                <h4>Create Topic</h4>
                                <input 
                                    placeholder="Topic Title" 
                                    value={newDiscussionTitle} 
                                    onChange={e => setNewDiscussionTitle(e.target.value)}
                                    style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 5, border: '1px solid #ddd' }}
                                />
                                <textarea 
                                    placeholder="Content" 
                                    value={newDiscussionContent} 
                                    onChange={e => setNewDiscussionContent(e.target.value)}
                                    style={{ width: '100%', padding: 8, minHeight: 60, borderRadius: 5, border: '1px solid #ddd', marginBottom: 10 }}
                                />
                                <Button primary onClick={handleCreateDiscussion}>Create</Button>
                            </div>
                        )}

                        {discussions.map(disc => (
                            <DiscussionItem key={disc.id} onClick={() => handleOpenDiscussion(disc.id)}>
                                <div style={{ fontWeight: 'bold', fontSize: 16 }}>{disc.title}</div>
                                <div style={{ fontSize: 12, color: '#757575', marginTop: 5 }}>
                                    by {disc.author.username} • {new Date(disc.createdAt).toLocaleDateString()}
                                </div>
                            </DiscussionItem>
                        ))}
                        {discussions.length === 0 && <div style={{ textAlign: 'center', color: '#999' }}>No discussions yet</div>}
                    </div>
                )}

                {activeTab === 'discussions' && activeDiscussion && (
                    <div style={{ padding: 15 }}>
                        <button onClick={() => setActiveDiscussion(null)} style={{ marginBottom: 10, cursor: 'pointer', border: 'none', background: 'transparent', color: '#FF8C00' }}>← Back to list</button>
                        <h3>{activeDiscussion.title}</h3>
                        <div style={{ padding: 15, background: '#f0f0f0', borderRadius: 5, marginBottom: 20 }}>
                            <div style={{ fontSize: 12, color: '#757575', marginBottom: 5 }}>{activeDiscussion.author.username} wrote:</div>
                            {activeDiscussion.content}
                        </div>

                        <h4>Comments</h4>
                        {activeDiscussion.comments && activeDiscussion.comments.map((comment: any) => (
                            <Comment key={comment.id}>
                                <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 3 }}>{comment.author.username}</div>
                                {comment.content}
                            </Comment>
                        ))}

                        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                            <input 
                                placeholder="Write a comment..." 
                                value={newComment} 
                                onChange={e => setNewComment(e.target.value)}
                                style={{ flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
                            />
                            <Button primary onClick={handleAddComment}>Send</Button>
                        </div>
                    </div>
                )}
            </Card>
        </MainContent>
      </ContentGrid>
    </Container>
  );
};

export default CommunityPage;
