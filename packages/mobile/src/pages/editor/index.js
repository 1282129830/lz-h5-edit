import React, { useState, useEffect } from 'react';
import {
  Row, Col, Button, Modal, message,
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemplate, updateTemplate } from '../../services/template';
import TextEditor from './components/TextEditor';
import ImageEditor from './components/ImageEditor';
import MusicPlayer from './components/MusicPlayer';
import Preview from './components/Preview';

const MobileEditor = () => {
  const [template, setTemplate] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadTemplate();
  }, [id]);

  const loadTemplate = async () => {
    try {
      const data = await getTemplate(id);
      setTemplate(data);
    } catch (error) {
      message.error('模板加载失败');
    }
  };

  const handleElementClick = (element) => {
    if (!element.mobileEdit?.editable) {
      message.info('该元素不可编辑');
      return;
    }
    setActiveElement(element);
  };

  const handleElementUpdate = async (value) => {
    try {
      const updatedTemplate = {
        ...template,
        elements: template.elements.map(el => 
          el.id === activeElement.id 
            ? { ...el, ...value }
            : el
        )
      };
      
      await updateTemplate(id, updatedTemplate);
      setTemplate(updatedTemplate);
      setActiveElement(null);
      message.success('更新成功');
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleShare = () => {
    // 实现分享逻辑
    Modal.success({
      title: '分享成功',
      content: '请到微信中查看分享链接',
    });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const renderEditor = () => {
    if (!activeElement) return null;

    const props = {
      element: activeElement,
      onCancel: () => setActiveElement(null),
      onConfirm: handleElementUpdate,
    };

    switch (activeElement.type) {
      case 'text':
        return <TextEditor {...props} />;
      case 'image':
        return <ImageEditor {...props} />;
      case 'music':
        return <MusicPlayer {...props} />;
      default:
        return null;
    }
  };

  if (!template) return <div>加载中...</div>;

  return (
    <div className="mobile-editor">
      <div className="editor-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Button onClick={() => navigate(-1)}>返回</Button>
          </Col>
          <Col>
            <Button onClick={handlePreview} className="m-r-8">预览</Button>
            <Button type="primary" onClick={handleShare}>分享</Button>
          </Col>
        </Row>
      </div>

      <div className="editor-content">
        {template.elements.map(element => (
          <div
            key={element.id}
            className={`element-wrapper ${element.mobileEdit?.editable ? 'editable' : ''}`}
            onClick={() => handleElementClick(element)}
            style={{
              position: 'absolute',
              left: element.rect.left,
              top: element.rect.top,
              width: element.rect.width,
              height: element.rect.height,
              transform: `rotate(${element.rect.rotate || 0}deg)`,
            }}
          >
            {element.type === 'text' && <div>{element.content}</div>}
            {element.type === 'image' && <img src={element.src} alt="" style={{ width: '100%', height: '100%' }} />}
            {element.type === 'music' && <div className="music-indicator">♫</div>}
          </div>
        ))}
      </div>

      {renderEditor()}
      
      <Preview 
        visible={showPreview}
        onClose={() => setShowPreview(false)}
        template={template}
      />

      <style jsx>{`
        .mobile-editor {
          min-height: 100vh;
          background: #f5f5f5;
        }
        
        .editor-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 100;
        }
        
        .editor-content {
          margin-top: 60px;
          min-height: calc(100vh - 60px);
          position: relative;
        }
        
        .element-wrapper {
          cursor: pointer;
          border: 1px solid transparent;
        }
        
        .element-wrapper.editable {
          border-color: #e8e8e8;
        }
        
        .element-wrapper.editable:hover {
          border-color: #1890ff;
        }
        
        .music-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 24px;
          color: #666;
          background: #f0f0f0;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default MobileEditor; 