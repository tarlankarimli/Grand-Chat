import React from 'react'
import './CreateContact.scss'
import { Button, Modal, Form, Input, message} from "antd";
import * as AuthApi from 'api/AuthApi';


const CreateContact =({visible, setVisible, refresh}) => {

  const [form] = Form.useForm(); 
  const onFinish = (values) => {
    console.log(values);
        AuthApi.register(values.username, values.name, values.password).then( _=> {
          setVisible(false);
          refresh();
        }).catch(error => {
          switch (error.response.status) {
            case 401: 
              message.error("This username is already existed");
              break;
              case 500: 
              message.error("Server connection failed");
              break;          
            default: 
            message.error("Error");
          }
        })
  }

    return (
           
        <Modal
          title="New contact"
          visible={visible}
          footer = {false}
          onCancel = {()=> {setVisible(false)}}
          className = "contact__modal"
        >        
          <Form
          form = {form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="name" />              
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="username" />              
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input                
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
                <Input.Password placeholder ="confirm password"/>
              </Form.Item>
              <Form.Item
                name="email"        
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input placeholder ="Email" />
              </Form.Item>
              <Form.Item>
              <Button type="primary" style = {{width: "100%"}} htmlType="submit">Create</Button>
              </Form.Item>
          </Form>
        </Modal>
    )
}

export default CreateContact;