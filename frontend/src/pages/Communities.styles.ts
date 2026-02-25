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

export const CommunityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Full width cards on mobile */
  }
`;

export const CommunityCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CommunityCover = styled.div<{ url?: string }>`
  height: 100px;
  background-color: #ddd;
  background-image: url(${props => props.url || 'https://via.placeholder.com/200x100'});
  background-size: cover;
  background-position: center;
`;

export const CommunityInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

export const CommunityAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: -40px;
  border: 3px solid white;
  background: white;
`;

export const CommunityName = styled.h3`
  margin: 10px 0 5px;
  font-size: 16px;
`;

export const CommunityType = styled.span`
  font-size: 12px;
  color: #757575;
  text-transform: uppercase;
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: ${props => props.primary ? '#FF8C00' : '#ddd'};
  color: ${props => props.primary ? 'white' : '#333'};
  cursor: pointer;
  font-weight: 500;
`;
