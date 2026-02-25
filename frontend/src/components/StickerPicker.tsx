import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 60px;
  right: 10px;
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.div<{ active?: boolean }>`
  flex: 1;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background: ${props => props.active ? '#fff' : '#f9f9f9'};
  border-bottom: ${props => props.active ? '2px solid #FF8C00' : 'none'};
  font-weight: 500;
  font-size: 14px;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

const Sticker = styled.img`
  width: 100%;
  cursor: pointer;
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.05);
  }
`;

// Mock Data
const MOCK_STICKERS = [
    'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
    'https://cdn-icons-png.flaticon.com/512/4712/4712027.png',
    'https://cdn-icons-png.flaticon.com/512/4712/4712109.png',
    'https://cdn-icons-png.flaticon.com/512/4712/4712100.png',
    'https://cdn-icons-png.flaticon.com/512/4712/4712137.png',
    'https://cdn-icons-png.flaticon.com/512/4712/4712009.png',
];

const MOCK_GIFS = [
    'https://media.tenor.com/P5d0J3mJzWMAAAAM/cat-dance.gif',
    'https://media.tenor.com/C3068y2kH3AAAAAM/cat-vibing.gif',
    'https://media.tenor.com/bX6tZ7p-d2gAAAAM/hello-hi.gif',
    'https://media.tenor.com/k91Y7L6C2YMAAAAM/thumbs-up-ok.gif',
];

interface StickerPickerProps {
    onSelect: (url: string) => void;
}

const StickerPicker: React.FC<StickerPickerProps> = ({ onSelect }) => {
    const [activeTab, setActiveTab] = React.useState('stickers');

    return (
        <Container>
            <Tabs>
                <Tab active={activeTab === 'stickers'} onClick={() => setActiveTab('stickers')}>Stickers</Tab>
                <Tab active={activeTab === 'gifs'} onClick={() => setActiveTab('gifs')}>GIFs</Tab>
            </Tabs>
            <Content>
                {activeTab === 'stickers' ? (
                    MOCK_STICKERS.map((url, i) => (
                        <Sticker key={i} src={url} onClick={() => onSelect(url)} />
                    ))
                ) : (
                    MOCK_GIFS.map((url, i) => (
                        <Sticker key={i} src={url} onClick={() => onSelect(url)} />
                    ))
                )}
            </Content>
        </Container>
    );
};

export default StickerPicker;
