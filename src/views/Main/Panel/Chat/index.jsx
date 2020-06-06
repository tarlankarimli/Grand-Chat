import React, { useEffect, useContext, useState } from 'react'
import {getContacts} from 'api/ContactApi'
import { Layout, Input, Button } from "antd"
import ChatItem from 'component/ChatItem/index'
import "./Chat.scss";
import {
    SendOutlined, UserOutlined
  } from '@ant-design/icons';
  import { Avatar } from 'antd';
  import * as ActionTypes from 'store/contacts/ActionTypes';
  import userContext from 'context/userContext'
  import socketContext from 'context/socketContext'
  import {useSelector} from 'react-redux'
  import {useDispatch} from 'react-redux'
  import addMessage from 'store/messages/actions'

    const { Content } = Layout;
    const Chat = () => {
    //const {contacts, dispatch} = useContext(contactsContext);
    const {user} = useContext(userContext);
    const {socket} = useContext(socketContext)
    const [typedMessages, setTypedMessages] = useState('');
    const [selectedContactId, setSelectedContactId] = useState(undefined);
    const message = useSelector(store => store.message);
    const dispatchMessage = useDispatch();
    const contacts = useSelector(store => store.contacts);
    const dispatchContacts = useDispatch();
    const socketEmit = () => {
        socket.emit('send', {from_user: user.id, to_user: selectedContactId, message: typedMessages});
    dispatchMessage(addMessage("from", selectedContactId, typedMessages))
    setTypedMessages('');
    }

    useEffect(() => {  
        dispatchContacts({type: ActionTypes.LOADING})  
        getContacts().then(res => {
            dispatchContacts({type: ActionTypes.SET, payload: res.data})
        }).catch(error => {
            dispatchContacts({type: ActionTypes.ERROR, payload: error.message})
        })
        // eslint-disable-next-line
      }, [])
    return (
        <Content
            className="site-layout-background Chat-Panel"
        >
            <aside className = "Chat-Panel__chat-aside">
                <ChatItem contacts = {contacts.value} contactSelected={contactId=>{setSelectedContactId(contactId)}} />
            </aside>

            <section className = "Chat-Panel__chat-area">
                <header>
                    <h3>Tarlan Karimli</h3>
                </header>
                <section>
                    {
                        user && message[selectedContactId]
                        ?
                        message[selectedContactId].map((data, index)=> {
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
                    onKeyDown = {(key)=>{
                        if(key.keyCode===13){
                            socketEmit();
                        }
                    }}
                    />

                    <Button className = "Chat__button"
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        size="large"
                        onClick={()=> {
                            socketEmit();
                        }}>                        
                    </Button>
                </footer>
            </section>
            
        </Content>
    )
}

export default Chat;