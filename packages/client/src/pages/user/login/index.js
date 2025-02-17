import React from 'react';
import {
  Form, Input, Icon, Button, Col, Row, message,
} from 'antd';
import JParticles from 'jparticles';

import './index.scss';
import { login } from '../../../services/user';

const bgRef = React.createRef();

function Login(props) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const handleSubmit = () => {
    form.validateFields((err, value) => {
      if (err) return;
      // console.log(value); return;
      value.clientid = '8ae3bc85-ea75-4b78-9ac3-a2cafad8e7d1';
      login(value).then((token) => {
        // const { id } = res;
        localStorage.setItem('token', token);
        window.location.href = '/client.html#/ucenter/info';
        message.success('登录成功');
      }).catch((res) => {
        message.error(res && res.errmsg);
      });
    });
  };
  React.useEffect(() => {
    const Ctor = JParticles.particle;
    const hannder = new Ctor('#bg', {
      num: 20,
    });
    console.log(hannder);
  }, []);
  return (
    <div className="page-login">
      <div className="home-logo">
        <img src="http://www.lzuntalented.cn/img/home-log.png" alt="" width="100%" />
        <img src="http://cdn.xiaodingdang1.com/2025/01/18/9246969f8e9d4814b0f34512b4644480.jpg" alt="" height="48" />
      </div>
      <Form className="login-container">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' },
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入邮箱/用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Button type="primary" className="login-form-button" onClick={handleSubmit}>
          登 录
        </Button>
        <Row type="flex" justify="space-between">
          <Col>
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Col>
          <Col>
            <a href="#/register">注册</a>
          </Col>
        </Row>
      </Form>
      <div ref={bgRef} id="bg" className="bg-container" />
    </div>
  );
}

export default Form.create()(Login);
