import React from 'react';
import { Modal } from 'antd';
import { Realpreview } from '@lzshow/preview';

const Preview = ({ visible, onClose, template }) => {
  return (
    <Modal
      title="预览"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{ top: 0 }}
      bodyStyle={{ height: '100vh', padding: 0 }}
    >
      <div className="preview-container">
        <Realpreview data={template} />
      </div>

      <style jsx>{`
        .preview-container {
          height: 100vh;
          overflow: hidden;
          background: #000;
        }
        
        :global(.ant-modal) {
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
        
        :global(.ant-modal-content) {
          height: 100vh;
          border-radius: 0;
        }
      `}</style>
    </Modal>
  );
};

export default Preview; 