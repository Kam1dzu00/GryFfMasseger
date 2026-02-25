import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', 'SF Pro', sans-serif;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ProfileHeader = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

export const CoverImage = styled.div<{ url?: string }>`
  height: 200px;
  background-color: #ddd;
  background-image: url(${props => props.url || 'https://via.placeholder.com/960x200'});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const ProfileInfo = styled.div`
  padding: 0 20px 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 30px;
  }
`;

export const AvatarWrapper = styled.div`
  margin-top: -50px;
  border: 4px solid white;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  background: white;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-top: -60px;
  }
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserDetails = styled.div`
  flex: 1;
  margin-left: 20px;
  padding-top: 10px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const UserName = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const UserStatus = styled.p`
  margin: 5px 0 0;
  color: #757575;
  font-size: 14px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-top: 15px;
    width: 100%;
    justify-content: center;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
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

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const CardTitle = styled.h3`
  margin: 0 0 15px;
  font-size: 16px;
  color: #333;
`;

export const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
  display: flex;
  justify-content: space-between;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Tabs = styled.div`
  background: white;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #eee;
`;

export const Tab = styled.div<{ active?: boolean }>`
  padding: 15px 0;
  cursor: pointer;
  color: ${props => props.active ? '#FF8C00' : '#555'};
  border-bottom: 2px solid ${props => props.active ? '#FF8C00' : 'transparent'};
  font-weight: 500;
`;

export const CreatePost = styled(Card)`
  display: flex;
  gap: 15px;
`;

export const PostInput = styled.input`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 15px;
  outline: none;
  &:focus {
    border-color: #FF8C00;
  }
`;

export const Post = styled(Card)`
  margin-bottom: 15px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const PostAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostAuthor = styled.div`
  font-weight: 500;
`;

export const PostDate = styled.div`
  font-size: 12px;
  color: #999;
`;

export const PostContent = styled.div`
  font-size: 15px;
  line-height: 1.5;
`;
