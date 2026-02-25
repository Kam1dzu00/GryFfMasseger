import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.background};
  font-family: 'Roboto', 'SF Pro', sans-serif;
`;

export const Sidebar = styled.div<{ active?: boolean }>`
  width: 350px;
  background-color: ${props => props.theme.sidebar};
  border-right: 1px solid ${props => props.theme.border};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    display: ${props => props.active ? 'flex' : 'none'};
  }
`;

export const SidebarHeader = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.border};
`;

export const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ChatItem = styled.div<{ active?: boolean }>`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? props.theme.background : 'transparent')};
  &:hover {
    background-color: ${props => props.theme.background};
  }
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 15px;
  flex-shrink: 0;
`;

export const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatName = styled.h4`
  margin: 0 0 5px 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.text};
`;

export const LastMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.secondaryText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MainArea = styled.div<{ active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  background-image: url('https://w.wallhaven.cc/full/vg/wallhaven-vg8885.jpg'); /* Placeholder pattern */
  background-blend-mode: overlay;

  @media (max-width: 768px) {
    width: 100%;
    display: ${props => props.active ? 'flex' : 'none'};
  }
`;

export const ChatHeader = styled.div`
  padding: 10px 20px;
  background-color: ${props => props.theme.card};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MessageBubble = styled.div<{ isMine: boolean }>`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${(props) => (props.isMine ? props.theme.accent : props.theme.card)};
  color: ${(props) => (props.isMine ? '#ffffff' : props.theme.text)};
  align-self: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const MessageTime = styled.span<{ isMine: boolean }>`
  font-size: 11px;
  color: ${(props) => (props.isMine ? 'rgba(255, 255, 255, 0.7)' : props.theme.secondaryText)};
  display: block;
  text-align: right;
  margin-top: 5px;
`;

export const InputArea = styled.div`
  padding: 10px 20px;
  background-color: ${props => props.theme.card};
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};
  outline: none;
  font-size: 16px;
  background-color: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
  &:focus {
    border-color: ${props => props.theme.accent};
  }
`;

export const SendButton = styled.button`
  background-color: #FF8C00;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s;
  &:active {
    transform: scale(0.95);
  }
`;

export const BackButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-right: 10px;
  display: none;
  color: #555;

  @media (max-width: 768px) {
    display: block;
  }
`;
