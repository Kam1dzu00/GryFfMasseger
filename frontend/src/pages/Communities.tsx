import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { Container, CommunityList, CommunityCard, CommunityCover, CommunityInfo, CommunityAvatar, CommunityName, CommunityType, SearchBar, Input, Button } from './Communities.styles';
import styled from 'styled-components';

// Modal Styles (Reusable)
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
`;

const Communities: React.FC = () => {
  const [communities, setCommunities] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({ name: '', description: '', type: 'public', avatarUrl: '', coverUrl: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadCommunities();
  }, [searchQuery]);

  const loadCommunities = async () => {
    try {
      const res = await api.getCommunities(searchQuery);
      setCommunities(res.data);
    } catch (error) {
      console.error('Failed to load communities', error);
    }
  };

  const handleCreateCommunity = async () => {
    try {
      const res = await api.createCommunity(newCommunity);
      navigate(`/community/${res.data.id}`);
    } catch (error) {
      console.error('Failed to create community', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'coverUrl') => {
      if (e.target.files && e.target.files[0]) {
          try {
              const res = await api.uploadFile(e.target.files[0]);
              setNewCommunity({ ...newCommunity, [field]: res.data.url });
          } catch (error) {
              console.error('Upload failed', error);
          }
      }
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>Communities</h2>
        <Button primary onClick={() => setShowCreateModal(true)}>+ Create Community</Button>
      </div>

      <SearchBar>
        <Input 
          placeholder="Search communities..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </SearchBar>

      <CommunityList>
        {communities.map(community => (
          <CommunityCard key={community.id} onClick={() => navigate(`/community/${community.id}`)}>
            <CommunityCover url={community.coverUrl} />
            <CommunityInfo>
              <CommunityAvatar src={community.avatarUrl || 'https://via.placeholder.com/60'} />
              <CommunityName>{community.name}</CommunityName>
              <CommunityType>{community.type}</CommunityType>
              <div style={{ fontSize: 12, color: '#999', marginTop: 5 }}>{community.description}</div>
            </CommunityInfo>
          </CommunityCard>
        ))}
      </CommunityList>

      {/* Create Modal */}
      {showCreateModal && (
        <ModalOverlay onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h3>Create Community</h3>
            <Input placeholder="Name" value={newCommunity.name} onChange={e => setNewCommunity({...newCommunity, name: e.target.value})} />
            <Input placeholder="Description" value={newCommunity.description} onChange={e => setNewCommunity({...newCommunity, description: e.target.value})} />
            <select 
              value={newCommunity.type} 
              onChange={e => setNewCommunity({...newCommunity, type: e.target.value})}
              style={{ padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
            >
              <option value="public">Public Page</option>
              <option value="group">Group</option>
              <option value="event">Event</option>
            </select>
            
            <div>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 5 }}>Avatar</label>
                <input type="file" onChange={e => handleFileUpload(e, 'avatarUrl')} />
            </div>
            <div>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 5 }}>Cover</label>
                <input type="file" onChange={e => handleFileUpload(e, 'coverUrl')} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button primary onClick={handleCreateCommunity}>Create</Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Communities;
