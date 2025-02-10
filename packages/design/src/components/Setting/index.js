import React from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable'; // The default
import { Tabs, Button, Collapse, Row, Col, Switch, InputNumber } from 'antd';

import './index.scss';
import { getComponentStyleMap } from '@lzshow/core';
import { changeBaseStyle, removeItem, changeItemBorder } from '../../store/action';
import Animate from './components/animate';
import Attribute from './components/attribute';
import SettingPosition from '../SettingPosition';
import SettingBorder from './components/border';
import MutilAttribute from './components/MutilAttribute';

const { TabPane } = Tabs;

class Setting extends React.Component {
  onAnimateChange = (e) => {
    const { activeEditKey, dispatch } = this.props;
    dispatch(changeBaseStyle({
      animate: e,
    }, activeEditKey));
  }

  onRemove = () => {
    const { dispatch } = this.props;
    dispatch(removeItem());
  }

  setBaseStyle = key => (e) => {
    const { dispatch, activeEditKey } = this.props;
    const { target } = e;
    let value = e;
    if (target) {
      value = +target.value;
    }
    dispatch(changeBaseStyle({ [key]: value }, activeEditKey));
  }

  setBorder = key => (e) => {
    const { dispatch, activeEditKey } = this.props;
    const { target } = e;
    let value = e;
    if (target) {
      value = +target.value;
    }
    dispatch(changeItemBorder(activeEditKey, { [key]: value }));
  }

  dispatchAction = action => () => {
    const { dispatch } = this.props;
    dispatch(action);
  }

  renderComponent() {
    const { componentType, activeEditKey } = this.props;
    const styleConfig = getComponentStyleMap(componentType);
    if (styleConfig) {
      return <Attribute styleConfig={styleConfig} />;
    }
    if (activeEditKey && activeEditKey.length > 1) {
      return <MutilAttribute />;
    }
    return null;
  }

  renderMobileConfig() {
    const { item } = this.props;
    if (!item) return null;
    
    return (
      <Collapse>
        <Collapse.Panel header="移动端编辑权限" key="mobile">
          <Row align="middle" type="flex" gutter={8}>
            <Col span={8}>允许编辑</Col>
            <Col span={16}>
              <Switch 
                checked={item.mobileEdit?.editable} 
                onChange={this.setMobileEditPermission('editable')}
              />
            </Col>
          </Row>
          {item.mobileEdit?.editable && (
            <>
              <Row align="middle" type="flex" gutter={8} className="m-t-8">
                <Col span={8}>文字限制</Col>
                <Col span={16}>
                  <InputNumber
                    min={0}
                    value={item.mobileEdit?.constraints?.maxLength}
                    onChange={this.setMobileEditConstraint('maxLength')}
                  />
                </Col>
              </Row>
              <Row align="middle" type="flex" gutter={8} className="m-t-8">
                <Col span={8}>图片大小(MB)</Col>
                <Col span={16}>
                  <InputNumber
                    min={0}
                    value={item.mobileEdit?.constraints?.imageSize}
                    onChange={this.setMobileEditConstraint('imageSize')}
                  />
                </Col>
              </Row>
            </>
          )}
        </Collapse.Panel>
      </Collapse>
    );
  }

  setMobileEditPermission = key => value => {
    const { dispatch, activeEditKey } = this.props;
    dispatch(changeBaseStyle({
      mobileEdit: {
        ...this.props.item?.mobileEdit,
        [key]: value,
        constraints: this.props.item?.mobileEdit?.constraints || {}
      }
    }, activeEditKey));
  }

  setMobileEditConstraint = key => value => {
    const { dispatch, activeEditKey } = this.props;
    dispatch(changeBaseStyle({
      mobileEdit: {
        ...this.props.item?.mobileEdit,
        editable: true,
        constraints: {
          ...this.props.item?.mobileEdit?.constraints,
          [key]: value,
        }
      }
    }, activeEditKey));
  }

  render() {
    const { activeEditKey, item } = this.props;
    return (
      activeEditKey && activeEditKey.length > 0
      && (
      <Draggable
        axis="both"
        handle=".component-setting-container > .header"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <section className="component-setting-container">
          <header className="header">组件设置</header>
          <Tabs className="tabs-content" defaultActiveKey="1">
            <TabPane tab="样式" key="1">
              <div className="tabs-content-overflow">
                {this.renderComponent()}
                <Collapse>
                  <Collapse.Panel header="边框" key="1">
                    {item && <SettingBorder {...item} setBorder={this.setBorder} />}
                  </Collapse.Panel>
                  <Collapse.Panel header="位置与尺寸" key="3">
                    {item && (
                      <SettingPosition
                        {...item}
                        dispatchAction={this.dispatchAction}
                        setBaseStyle={this.setBaseStyle}
                      />
                    )}
                  </Collapse.Panel>
                </Collapse>
                {this.renderMobileConfig()}
                <div className="text-center m-t-12 m-b-12">
                  <Button onClick={this.onRemove} type="danger">删除元素</Button>
                </div>
              </div>
            </TabPane>
            {activeEditKey.length === 1 && (
              <TabPane tab="动画" key="2">
                <Animate />
              </TabPane>
            )}
          </Tabs>
        </section>
      </Draggable>
      )
    );
  }
}

const mapStateToProps = (store) => {
  const state = store.toJS();
  const { editList, activeEditKey } = state;
  const result = { activeEditKey };
  if (activeEditKey && activeEditKey.length === 1) {
    const item = editList[activeEditKey[0]];
    if (item) return Object.assign(result, { componentType: item.type, item });
  }
  return result;
};

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
