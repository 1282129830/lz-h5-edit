import React, { useState, useRef } from 'react';
import {
  Modal, List, Button, Space,
} from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

const musicList = [
  { id: 1, name: '婚礼进行曲', url: 'https://example.com/music1.mp3' },
  { id: 2, name: '浪漫音乐', url: 'https://example.com/music2.mp3' },
  { id: 3, name: '甜蜜时光', url: 'https://example.com/music3.mp3' },
  // 添加更多音乐...
];

const MusicPlayer = ({ element, onCancel, onConfirm }) => {
  const [selectedMusic, setSelectedMusic] = useState(element.music);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const handleSelect = (music) => {
    setSelectedMusic(music);
    audioRef.current.src = music.url;
    setPlaying(true);
    audioRef.current.play();
  };

  const togglePlay = (music) => {
    if (selectedMusic?.id !== music.id) {
      handleSelect(music);
      return;
    }

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleConfirm = () => {
    audioRef.current.pause();
    onConfirm({ music: selectedMusic });
  };

  const handleCancel = () => {
    audioRef.current.pause();
    onCancel();
  };

  return (
    <Modal
      title="选择背景音乐"
      open={true}
      onCancel={handleCancel}
      onOk={handleConfirm}
      destroyOnClose
      width={400}
    >
      <List
        dataSource={musicList}
        renderItem={item => (
          <List.Item>
            <div className="music-item">
              <Space>
                <Button
                  type="text"
                  icon={selectedMusic?.id === item.id && playing ? 
                    <PauseCircleOutlined /> : <PlayCircleOutlined />
                  }
                  onClick={() => togglePlay(item)}
                />
                <span className={selectedMusic?.id === item.id ? 'selected' : ''}>
                  {item.name}
                </span>
              </Space>
            </div>
          </List.Item>
        )}
      />
      <style jsx>{`
        .music-item {
          width: 100%;
          display: flex;
          align-items: center;
        }
        
        .selected {
          color: #1890ff;
          font-weight: 500;
        }
      `}</style>
    </Modal>
  );
};

export default MusicPlayer; 