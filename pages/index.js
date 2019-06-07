import React from 'react';
import Link from 'next/link.js';
import axios from 'axios';
import { Cookies } from 'react-cookie';

import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Spin, Typography } from 'antd';

const serverUrl = 'http://cipa.velow.com.br';



// set up cookies
const cookies = new Cookies();
const { Title } = Typography;
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get('token') || null,
      user: null,
      password: null,
      loading: false
    }


  }


  loginClick = async (e) => {

    e.preventDefault();

    let body = {}
    this.state.loading = true;
    this.props.form.validateFields((err, obj) => {
      if (!err) {
        console.log(obj)
        body.email = obj.email;
        body.password = obj.password;
      }
    });
    debugger;

    const response = await axios.post(serverUrl + '/auth/sign_in',  body );
    cookies.set('token', response.headers["access-token"]);
    this.setState({
      token: response.headers["access-token"]
    })
  };

  render(){
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const divLogin = {
      height: '100%',
      position: 'absolute',
      width: '100%'
    };

    const loginBackground = {
      background: "url('/static/images/login_background.png') no-repeat center",
      height: '100%',
      objectFit: 'cover'
    };

    return (

      <Row type="flex" style={divLogin}>
        <Col style={loginBackground} span={12}>
        </Col>
        <Col span={12}>
          <Row type="flex" style={{height: '100%', marginRight: '20%'}} align="middle" justify="end">
            <Col span={15}>

              {!this.state.loading && (
                <Title>CIPA</Title>
              )}

              {this.state.loading && (
                <Row type="flex" align="middle" justify="center">
                  <Spin size="large" className="login-form"
                        tip="Carregando..."></Spin>
                </Row>
              )}

              {!this.state.loading && (

                <Form onSubmit={this.loginClick} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Insira o seu usuário ou e-mail!' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="E-mail"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Insira a sua senha!' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Senha"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Entrar
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Col>
          </Row>

        </Col>
      </Row>

    );
  }
}
export default Form.create()(Index);