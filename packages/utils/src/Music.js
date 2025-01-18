export default class Music {
  constructor() {
    const audio = window.document.createElement('audio');
    audio.loop = 'loop';
    audio.autoplay = 'autoplay';
    this.audio = audio;
  }

  setSrc(src) {
    this.audio.src = src;
    this.play();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  // 微信浏览器自动播放
  initWxAutoPlay() {
    // 监听微信 JS-SDK 准备就绪
    if(typeof window.WeixinJSBridge !== 'undefined') {
      this.handleWxReady();
    } else {
      document.addEventListener("WeixinJSBridgeReady", this.handleWxReady.bind(this), false);
    }
    
    // 监听页面触摸事件,用户首次触摸时自动播放
    document.addEventListener('touchstart', () => {
      this.play();
    }, { once: true });
  }

  handleWxReady() {
    // 微信 JS-SDK 准备就绪后自动播放
    this.play();
  }
}
