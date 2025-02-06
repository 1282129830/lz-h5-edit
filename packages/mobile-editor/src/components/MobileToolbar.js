export default function MobileToolbar({ onTextEdit, onImageReplace, onMusicChange }) {
    return (
      <div className="mobile-toolbar">
        <FloatingButton 
          icon="text" 
          onClick={onTextEdit}
          tooltip="编辑文字"
        />
        <FloatingButton
          icon="image"
          onClick={onImageReplace}
          tooltip="更换图片"
        />
        <FloatingButton
          icon="music"
          onClick={onMusicChange}
          tooltip="更换音乐"
        />
        <FloatingButton
          icon="undo"
          onClick={handleUndo}
          tooltip="撤销"
        />
      </div>
    );
  }