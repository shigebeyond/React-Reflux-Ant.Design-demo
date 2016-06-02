import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import UserActions from '../../actions/user';

const FormItem = Form.Item;

import './index.less';

const propTypes = {
  user: PropTypes.string,
};

const contextTypes = {
  router: PropTypes.object.isRequired,
};

class Login extends React.Component {

  constructor (props) {
    super(props)
  }

  handleSubmit (e) {
    e.preventDefault();
    const data = this.props.form.getFieldsValue();
    // 登陆，成功后跳转到主页
    UserActions.login(data.user, data.password).then((user) => {
      //  console.log('login after:' + JSON.stringify(user));
       this.context.router.replace('/');
    })
  }

  render () {
    const { getFieldProps } = this.props.form
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <h1 style={{textAlign: 'center'}}>登陆</h1>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem
              label='用户名：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder='admin' {...getFieldProps('user')} />
            </FormItem>
            <FormItem
              label='密码：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input type='password' placeholder='123456' {...getFieldProps('password')} />
            </FormItem>
            <Row>
              <Col span='16' offset='6'>
                没有账号 <Link to="reg">注册</Link>
              </Col>
            </Row>
            <Row>
              <Col span='16' offset='6' style={{ marginTop: 18 }}>
                <Button type='primary' htmlType='submit'>确定</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

    )
  }
}

Login.contextTypes = contextTypes;

Login = Form.create()(Login);

export default Login;
