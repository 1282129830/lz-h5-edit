import React from 'react';
import { Row, Col, Icon } from 'antd';
import PropTypes from 'prop-types';
import Typed from 'react-typed';

import './index.scss';

let typeHandler = null;

function QQVideo(props) {
  const {
    text, bgColor, showStatus, typeSpeed, cursorChar, startDelay, ...ohters
  } = props;
  React.useEffect(() => {
    if (typeHandler) typeHandler.reset(true);
  }, [text, showStatus, typeSpeed, cursorChar, startDelay]);
  return (
    <div style={{ backgroundColor: bgColor }}>
      <Typed
        typedRef={(typed) => { typeHandler = typed; }}
        style={{ ...ohters }}
        strings={[text]}
        typeSpeed={Number(typeSpeed)}
        startDelay={Number(startDelay)}
        cursorChar={cursorChar}
        showCursor={true}
      />
    </div>
  );
}

QQVideo.prototype.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  place: PropTypes.string,
  height: PropTypes.number,
};

QQVideo.prototype.defaultProps = {
  imgSrc: '',
  name: '',
  place: '',
  height: 0,
};

export default QQVideo;
