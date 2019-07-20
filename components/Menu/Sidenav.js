import React, { Component, useEffect, useState } from 'react';
import { Layout, Menu, Icon, Button, Divider } from 'antd';
const { SubMenu } = Menu;
const { Header, Content,  Footer, Sider } = Layout;

export class Sidenav extends Component {
  state = {
    theme: 'dark',
    current: '1',
    collapsed: false
  };

  updateDimensions = async () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  };

  componentWillMount() {
    this.updateDimensions();
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
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
    return (
      <Sider className="sider" theme={this.state.theme} collapsed={this.state.width <= 1012 ? true : false} onCollapse={this.onCollapse}>
        <div className="userInfoContainer">
          <div className="userpic"></div>
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
        <div className="menuToolsContainer">
          <Button onClick={this.changeTheme}
                  className={this.state.theme === 'dark' ? 'btn-theme dark' : 'btn-theme light'}
                  shape="circle"
                  type="solid">
            <Icon type="bulb" theme="filled"/>
          </Button>
        </div>
      </Sider>
    );
  }
}