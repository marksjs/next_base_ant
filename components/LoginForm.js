//TODO animações, melhora no submit de formulario (dados em branco) e tradução

import React from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Swal from 'sweetalert2'
import Router from 'next/router';
import 'antd/dist/antd.css';
import {PageLoader} from '../components/PageLoader';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Spin, Typography } from 'antd';
import {apiUrl} from "../config/ApiConfig";


// set up cookies
const cookies = new Cookies();
const { Title } = Typography;
class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get('token') || null,
      user: null,
      password: null,
      loading: false,
      pageLoading: true
    };

    this.emmitToastMessage = (type, messages) => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: type,
        title: messages.join('\n *')
      })
    };
  }

  loginClick = async (e) => {
    e.preventDefault();

    let body = {};
    this.state.loading = true;
    this.props.form.validateFields((err, obj) => {
      if (!err) {
        body.email = obj.email;
        body.password = obj.password;
      }
    });

    await axios.post(apiUrl + '/auth/sign_in',  body).then((resp) => {
      cookies.set('token', resp.headers["access-token"]);
      this.setState({
        token: resp.headers["access-token"]
      });

      this.setState({loading: false});
      // this.emmitToastMessage('success', ['Usuário logado com sucesso']);
      Router.push('/admins')
    }).catch((reject) => {
      this.setState({loading: false});
      this.emmitToastMessage('error', reject.response.data.errors);
    });

  };

  componentDidMount(){
    this.setState({pageLoading: false});
  }

  render(){
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const divLogin = {
      height: '100%',
      position: 'absolute',
      width: '100%'
    };

    // const loginBackgroundImg = {
    //   background: "url('/static/images/login_background.png') no-repeat center",
    //   height: '100%',
    //   objectFit: 'cover'
    // };


    return (
      <div id="main">
        {this.state.pageLoading ? <PageLoader/> : ""}

        <Row type="flex" style={divLogin}>
          <Col xs={{ span: 24}} lg={{ span: 13}}>
            <div style={{backgroundColor: "#424242",  height: '100%'}}></div>
          </Col>

          <Col xs={{ span: 24}} lg={{ span: 11}} >
            <Row type="flex" style={{height: '100%', marginLeft: '10%'}} align="middle" justify="center">
              <Col span={15}>

                {!this.state.loading && (
                  <Title>TITLE LOREM IPSUM</Title>
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
      </div>
    );
  }
}

export default Form.create({name: 'login'})(LoginForm);