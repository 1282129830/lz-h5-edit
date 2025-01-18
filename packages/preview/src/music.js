import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Music } from '@lzshow/utils';

export default function MusicIcon(props) {
  const { backMusicUrl } = props;
  const [musicPlay, setMusicPlay] = useState(true);

  const musicHandler = useRef(new Music());

  const onPlay = () => {
    const { current } = musicHandler;
    if (current) {
      if (musicPlay) {
        current.pause();
      } else {
        current.play();
      }
      setMusicPlay(!musicPlay);
    }
  };

  useEffect(() => {
    const { current } = musicHandler;
    if (current) {
      current.setSrc(backMusicUrl);

      // 监听音频播放状态
      current.audio.addEventListener('play', () => {
        setMusicPlay(true);
      });
      
      current.audio.addEventListener('pause', () => {
        setMusicPlay(false);
      });
    }
    return () => {
      if (current) {
        current.pause();
      }
    };
  }, [backMusicUrl]);

  return <div style={{ animationPlayState: musicPlay ? 'running' : 'paused' }} 
              className="music-container" onClick={onPlay}/>;
}

MusicIcon.propTypes = {
  backMusicUrl: PropTypes.string,
};

MusicIcon.defaultProps = {
  backMusicUrl: '',
};
