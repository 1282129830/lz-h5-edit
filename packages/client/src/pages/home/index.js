/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Button } from 'antd';
import JParticles from 'jparticles';

import './index.scss';

const bgRef = React.createRef();

export default () => {
  React.useEffect(() => {
    const Ctor = JParticles.particle;
    const hannder = new Ctor('#bg', {
      num: 40,
    });
    console.log(hannder);
  }, []);
  return (
    <div className="page-home">
      <div className="banner">
        <div className="title-left">
          <h1 className="site-name">槿墨H5</h1>
          <div className="sub-title">是一款专为设计师打造的H5请帖模板制作工具，旨在提供一个简洁、高效的创作平台，帮助设计师快速制作和发布精美的请帖H5页面。该工具集成了丰富的模板库和高度自定义的设计选项，使得即使没有编程经验的设计师也能轻松上手。</div>
          <div className="line" />
          <div className="btn-container">
            <a href="#/list" className="m-r-12">
              <Button type="primary">开始探索</Button>
            </a>
            <a href="#/create" className="m-r-12">
              <Button>体验创造</Button>
            </a>
          </div>
          <div className="line" />
          {/* <div className="eq">
            <img src="http://www.lzuntalented.cn/img/lzshow-logo.png" alt="" />
          </div> */}
        </div>
        <div className="home-logo">
          <img src="http://www.lzuntalented.cn/img/home-log.png" alt="" width="100%" />
          <img src="http://www.lzuntalented.cn/img/heart-logo.png" alt="" height="48" />
        </div>
      </div>
      <div ref={bgRef} id="bg" className="bg-container" />
    </div>
  );
};
