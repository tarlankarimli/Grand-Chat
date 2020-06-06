import React, { useState, useContext, useEffect } from 'react'
import { Layout, Menu, Dropdown, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ContactsOutlined,
  SettingOutlined,
  WechatOutlined,
  DownOutlined
} from '@ant-design/icons';
import './Main.scss'
import Chat from './Panel/Chat/index';
import Contacts from './Panel/Contacts/index'
import {Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import appConfig from 'config/appConfig';
import apiConfig from 'config/apiConfig';
import userContext from 'context/userContext';
import {ContactsContextProvider} from 'context/contactsContext';
import io from 'socket.io-client';
import socketContext from 'context/socketContext';
import {useDispatch} from 'react-redux'
import addMessage from 'store/messages/actions'

const { Header, Sider} = Layout;

const Main = () => {  
    const [collapsed, setCollapsed] = useState(false);
    const [menu, setMenu] = useState('Chat')
    const history = useHistory();

    const { user } = useContext(userContext);
    const { socket, setSocket } = useContext(socketContext)
    const dispatchMessage = useDispatch();

    useEffect(()=> {
      if(user && !socket) {
        let temp = io.connect(apiConfig.url, {query: {auth_token: user.token}});
        temp.on('connect', _=>{console.log("connected")});
        temp.on('disconnect', _=>{console.log("disconnected")});
        temp.on('receive', (data)=>{
          dispatchMessage(addMessage("to", data.from_user, data.message))
        })
        setSocket(temp)
      }
    },[user, socket, setSocket,  dispatchMessage])

  const toggle = () => {
    setCollapsed(!collapsed);
  };

    return (
      <Layout className = "Main">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
              <h3 onClick = {() => {setMenu('Chat')}}>Grand</h3>
          </div>
          <Menu
          theme={"dark"}
          onClick={({key}) => {setMenu(key)}}
          selectedKeys={[menu]}
          mode="inline"
        >
            <Menu.Item key="Chat">
              <Link to = "/Chat">
                <WechatOutlined/>
                <span>Chat</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Contacts">
              <Link to = "/Contacts">
                <ContactsOutlined />
                <span>Contacts</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Settings">
            <Link to = "/Settings">
              <SettingOutlined />
              <span>Settings</span>
              </Link>
            </Menu.Item>
          </Menu>
          
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <Dropdown className = "Dropdown" overlay={
                <Menu>
                  <Menu.Item key="0" onClick = {() => {
                    window.localStorage.removeItem(appConfig.Localtoken);
                    history.replace("Login")
                  }}>
                    Log out
                  </Menu.Item>
              </Menu>
              } trigger={['click']}>
                <Button type="link">
                    {user && user.name}<DownOutlined />
                </Button>      
            </Dropdown>
          </Header>
          <ContactsContextProvider>
            <Switch>
              <Route exact path = "/Chat">
                <Chat/>
              </Route>         
              <Route exact path = "/Contacts">
                <Contacts/>
              </Route>
              <Route exact path = "/Settings">
                <h1>Settings</h1>
              </Route>
              <Redirect to = "/Chat"/>
            </Switch>
          </ContactsContextProvider>
        </Layout>
      </Layout>
    );
  }

  export default Main;

                    