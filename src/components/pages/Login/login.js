import React from 'react';
import { Form, Input, Button, Checkbox } from "antd";
import './login.css';

function Login() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  return (
    <div classname='login-page'>
      <div className='login-box'>
        <div className='illustration-wrapper'>
          <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000" alt="Login" />
        </div>
          <Form className='login-form' initialValue={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <p className="form-title">Welcome back</p>
            <p>Login to the Dashboard</p>
            <Form.Item label="User Name" name="username">
              <Input placeholder="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
              </Input>
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input placeholder="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
              </Input>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit " className="login-form-button">Log in</Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  );
}

export default Login;