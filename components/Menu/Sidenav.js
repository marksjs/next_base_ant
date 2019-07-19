import React, { Component } from 'react';
import { Layout, Menu, Icon, Button, Divider } from 'antd';

const { SubMenu } = Menu;
const { Header, Content,  Footer, Sider } = Layout;

export class Sidenav extends Component {
  state = {
    theme: 'dark',
    current: '1',
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  changeTheme = value => {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {

      let bulbTheme = '';
    let buttonTheme = {
      left: '20px',
      bottom: '12px',
      position: 'fixed'
    };

    if(this.state.theme === 'dark'){
      buttonTheme.backgroundColor = 'transparent';
      buttonTheme.color = 'rgb(255, 255, 255)';
      buttonTheme.borderColor = '#d9d9d9';
      buttonTheme.borderStyle = 'dashed';

      bulbTheme = '';
    } else {
      buttonTheme = {
        left: '20px',
        bottom: '12px',
        position: 'fixed'
      }

      bulbTheme = 'filled';
    }

    let siderTheme = {
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
    };

    let menuToolsContainer = {
      padding: '24px 0px 12px',
      position: 'absolute',
      height: '10%'
    };

    let userInfoContainer = {
      minHeight: '100px',
      textAlign: 'center',
      width: '100%',
      padding: '12px'
    };

    let userPic = {
      display: 'inline-block',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundImage: "url('http://placehold.it/50x50')"
    }

    return (
      <Sider theme={this.state.theme} collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={siderTheme}>
        <div style={userInfoContainer}>
          <div style={userPic}></div>
          <h3 style={{color: (this.state.theme === 'dark' ? '#fafafa' : 'rgba(0, 0, 0, 0.65)')}}>Admin Panel</h3>
        </div>
        <Menu theme={this.state.theme} defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
            }>
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
        <div style={menuToolsContainer}>
          <Button onClick={this.changeTheme} style={buttonTheme} shape="circle" type="solid">
            <Icon type="bulb" theme="filled"/>
          </Button>
        </div>
      </Sider>
    );
  }
}