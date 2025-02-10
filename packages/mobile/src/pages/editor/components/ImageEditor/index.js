import React, { useState } from 'react';
import {
  Modal, Upload, message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ImageEditor = ({ element, onCancel, onConfirm }) => {
  const [imageUrl, setImageUrl] = useState(element.src);
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }

    const { constraints } = element.mobileEdit;
    if (constraints?.imageSize) {
      const isLtSize = file.size / 1024 / 1024 < constraints.imageSize;
      if (!isLtSize) {
        message.error(`图片大小不能超过 ${constraints.imageSize}MB！`);
        return false;
      }
    }

    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      setLoading(false);
      const url = info.file.response.url;
      setImageUrl(url);
    }
  };

  const handleConfirm = () => {
    if (!imageUrl) {
      message.error('请上传图片');
      return;
    }
    onConfirm({ src: imageUrl });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  return (
    <Modal
      title="编辑图片"
      open={true}
      onCancel={onCancel}
      onOk={handleConfirm}
      destroyOnClose
    >
      <Upload
        name="file"
        listType="picture-card"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="avatar" 
            style={{ width: '100%' }} 
          />
        ) : uploadButton}
      </Upload>
      <div style={{ marginTop: 8, color: '#666' }}>
        {element.mobileEdit?.constraints?.imageSize && 
          `图片大小不超过 ${element.mobileEdit.constraints.imageSize}MB`
        }
      </div>
    </Modal>
  );
};

export default ImageEditor; 