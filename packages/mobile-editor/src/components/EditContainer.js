import { GestureHandler } from '@lzshow/mobile-gesture';
import MobileToolbar from './MobileToolbar';

export default function EditContainer({ template }) {
  const containerRef = useRef();
  
  // 初始化手势系统
  useEffect(() => {
    const gesture = new GestureHandler(containerRef.current, {
      onDrag: (dx, dy) => handleElementMove(dx, dy),
      onPinch: (scale) => handleElementScale(scale),
      onRotate: (degree) => handleElementRotate(degree)
    });
    return () => gesture.destroy();
  }, []);

  // 渲染可编辑元素
  const renderEditableElements = () => {
    return template.elements.map(element => (
      <MobileElement
        key={element.id}
        element={element}
        onUpdate={handleElementUpdate}
      />
    ));
  };

  return (
    <div className="mobile-editor-container" ref={containerRef}>
      {renderEditableElements()}
      <MobileToolbar 
        onTextEdit={openTextEditor}
        onImageReplace={openImagePicker}
        onMusicChange={openMusicSelector}
      />
    </div>
  );
}