import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Reuse styles from Profile/Communities
import { 
    Container, 
    Card as CardBase, 
    Post as PostBase, 
    PostHeader as PostHeaderBase, 
    PostAvatar as PostAvatarBase, 
    PostAuthor as PostAuthorBase, 
    PostDate as PostDateBase, 
    PostContent as PostContentBase 
} from './Profile.styles';

const FeedContainer = styled(Container)`
  padding-top: 20px;
  max-width: 600px; /* Feed usually narrower */
  
  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
`;

const FeedCard = styled(CardBase)`
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const FeedPostHeader = styled(PostHeaderBase)`
    margin-bottom: 10px;
`;

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      // @ts-ignore
      const res = await api.getNewsFeed();
      setPosts(res.data);
    } catch (error) {
      console.error('Failed to load feed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeedContainer>
      <button onClick={() => navigate('/chat')} style={{ marginBottom: 10, cursor: 'pointer', border: 'none', background: 'transparent', color: '#FF8C00' }}>← Back to Chat</button>
      <FeedHeader>
        <Title>News Feed</Title>
      </FeedHeader>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.length > 0 ? (
            posts.map(post => (
              <FeedCard key={post.id}>
                  <FeedPostHeader>
                    {/* Logic: If community post, show community avatar. If user post, show user avatar */}
                    <PostAvatarBase 
                        src={post.community ? (post.community.avatarUrl || 'https://via.placeholder.com/40') : (post.author.avatarUrl || 'https://via.placeholder.com/40')} 
                        onClick={() => {
                            if (post.community) navigate(`/community/${post.community.id}`);
                            else navigate(`/profile/${post.author.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                    <div>
                      <PostAuthorBase 
                        onClick={() => {
                            if (post.community) navigate(`/community/${post.community.id}`);
                            else navigate(`/profile/${post.author.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {post.community ? post.community.name : post.author.username}
                      </PostAuthorBase>
                      <PostDateBase>
                        {new Date(post.createdAt).toLocaleString()}
                        {post.community && (
                            <span style={{ color: '#999', marginLeft: 5, fontSize: 12 }}>
                                via {post.author.username}
                            </span>
                        )}
                      </PostDateBase>
                    </div>
                  </FeedPostHeader>
                  <PostContentBase>{post.content}</PostContentBase>
                  {post.mediaUrl && <img src={post.mediaUrl} style={{ maxWidth: '100%', marginTop: 10, borderRadius: 5 }} />}
              </FeedCard>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: '#999', padding: 40, background: 'white', borderRadius: 10 }}>
              No news yet. Add friends or join communities to see updates!
            </div>
          )}
        </div>
      )}
    </FeedContainer>
  );
};

export default Feed;
