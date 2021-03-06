import React from 'react';
import './ChatItem.scss';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ChatItem = ({contacts, contactSelected =()=>{} }) => {               
    return (contacts.map(contacts => (
            <div className = "Chat-Item" key = {contacts.id} onClick={()=> {contactSelected(contacts.id)}}>
                <Avatar className = "Chat-Item__avatar" size="medium" icon={<UserOutlined />} />
                <div className = "Chat-Item__items">
                    <span className="Chat-Item__items__username">{contacts.username}</span>
                    <span className="Chat-Item__items__message">{"Hello"}</span>
                    <span className="Chat-Item__items__date">{"20:00"}</span>
                </div>
            </div>
        ))
    )
}

export default ChatItem;