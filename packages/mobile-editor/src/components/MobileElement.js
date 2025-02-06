export default function MobileElement({ element, onUpdate }) {
    // 文字元素编辑
    const handleTextChange = (newText) => {
      onUpdate({ ...element, text: newText });
    };
  
    // 图片元素替换
    const handleImageReplace = (newUrl) => {
      onUpdate({ ...element, url: newUrl });
    };
  
    return (
      <div 
        className="mobile-element"
        style={getElementStyle(element)}
        data-type={element.type}
      >
        {element.type === 'text' ? (
          <EditableText 
            content={element.text}
            onChange={handleTextChange}
          />
        ) : (
          <EditableImage 
            src={element.url}
            onReplace={handleImageReplace}
          />
        )}
      </div>
    );
  }