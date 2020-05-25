import React, { useEffect, useContext, useState } from 'react'
import {getContacts} from '../../../../api/ContactApi'
import { Layout, Input, Button } from "antd"
import ChatItem from '../../../../component/ChatItem/index'
import "./Chat.scss";
import {
    SendOutlined, UserOutlined
  } from '@ant-design/icons';
  import { Avatar } from 'antd';
  import contactsContext, {ActionTypes} from '../../../../context/contactsContext';
  import userContext from '../../../../context/userContext'
  import socketContext from '../../../../context/socketContext'
  import messageContext, * as messageActions from '../../../../context/messageContext'

const { Content } = Layout;
const Chat = () => {
    const {contacts, dispatch} = useContext(contactsContext);
    const {user} = useContext(userContext);
    const {socket} = useContext(socketContext)
    const {message, messageDispatch} = useContext(messageContext)
    const [typedMessages, setTypedMessages] = useState('');

    useEffect(() => {  
        dispatch({type: ActionTypes.LOADING})  
        getContacts().then(res => {
            dispatch({type: ActionTypes.SET, payload: res.data})
        }).catch(error => {
            dispatch({type: ActionTypes.ERROR, payload: error.message})
        })
        // eslint-disable-next-line
      }, [])
    return (
        <Content
            className="site-layout-background Chat-Panel"
        >
            <aside className = "Chat-Panel__chat-aside">
                <ChatItem contacts = {contacts.value}/>
            </aside>

            <section className = "Chat-Panel__chat-area">
                <header>
                    <h3>Tarlan Karimli</h3>
                </header>
                <section>
                    {
                        user && message[user.id]
                        ?
                        message[user.id].map((data, index)=> {
                            if(data.side ==="from") {
                                return (
                                    <div className="right__message" key={index}>
                                        <Avatar className = "right__message__avatar" size="large" icon={<UserOutlined />} />
                                        <div className="right__message__text"><span><div className="10">{data.message}</div></span></div>
                                        <span className="right__message__date">12:50</span>
                                    </div>
                                )
                            } else if(data.side ==="to") {
                                return (
                                    <div className="left__message" key={index}>
                                        <Avatar className = "left__message__avatar" size="large" icon={<UserOutlined />} />
                                        <div className="left__message__text"><span><div className="2">{data.message}</div></span></div>
                                        <span className="left__message__date">12:50</span>
                                    </div>
                                )
                            }
                            return null
                        }) 
                        :
                        <h3>Not selected</h3>
                    }                   
                </section>
                <footer>
                    <Input 
                    placeholder = "Type a message" 
                    className = "Chat__input"
                    size = "large"
                    value = {typedMessages}
                    onChange = {(e)=> {setTypedMessages(e.target.value)}}
                    />

                    <Button className = "Chat__button"
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        size="large"
                        onClick={()=> {
                            socket.emit('send', {from_user: user.id, to_user: user.id, message: typedMessages})
                            messageDispatch({type: messageActions.ActionTypes.ADD, payload: {to: user.id, message: typedMessages, side: "from"}})
                            setTypedMessages('')
                        }}>                        
                    </Button>
                </footer>
            </section>
            
        </Content>
    )
}

export default Chat;