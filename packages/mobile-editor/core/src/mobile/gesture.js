export class GestureHandler {
    constructor(element, callbacks) {
      this.hammer = new Hammer(element);
      this.initGestures();
      this.callbacks = callbacks;
    }
  
    initGestures() {
      // 单指拖动
      this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
      this.hammer.on('pan', (e) => {
        this.callbacks.onDrag(e.deltaX, e.deltaY);
      });
  
      // 双指缩放
      this.hammer.get('pinch').set({ enable: true });
      this.hammer.on('pinch', (e) => {
        this.callbacks.onPinch(e.scale);
      });
  
      // 旋转手势
      this.hammer.get('rotate').set({ enable: true });
      this.hammer.on('rotate', (e) => {
        this.callbacks.onRotate(e.rotation);
      });
    }
  }