import React, { useState } from 'react';
import {
  Modal, Input, message,
} from 'antd';

const TextEditor = ({ element, onCancel, onConfirm }) => {
  const [content, setContent] = useState(element.content);
  
  const handleConfirm = () => {
    const { constraints } = element.mobileEdit;
    if (constraints?.maxLength && content.length > constraints.maxLength) {
      message.error(`文字长度不能超过${constraints.maxLength}个字符`);
      return;
    }
    
    onConfirm({ content });
  };

  return (
    <Modal
      title="编辑文本"
      open={true}
      onCancel={onCancel}
      onOk={handleConfirm}
      destroyOnClose
    >
      <Input.TextArea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={4}
        maxLength={element.mobileEdit?.constraints?.maxLength}
        showCount={!!element.mobileEdit?.constraints?.maxLength}
      />
    </Modal>
  );
};

export default TextEditor; 