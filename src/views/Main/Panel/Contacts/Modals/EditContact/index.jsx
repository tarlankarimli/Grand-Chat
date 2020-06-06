import React, {useState, useEffect} from 'react'
import './CreateContact.scss'
import { Button, Modal, Form, Input, message} from "antd";
import * as ContactApi from 'api/ContactApi'


const EditContact =({visible, setVisible, refresh, id}) => {
const [initialData, setinitialData] = useState(undefined);

  const [form] = Form.useForm(); 
  useEffect(() => {
    ContactApi.getOne(id).then(res=>{
      setinitialData(res.data)
    })
  }, [id])

  const onFinish = (values) => {
    ContactApi.update(id, values).then(_=> {
      setVisible(false);
      refresh();
    }).catch(error=> {
      message.error("Updated error ")
    })
  }

    return (
           
       <Modal
          title="Edit contact"
          visible={visible}
          footer = {false}
          onCancel = {()=> {setVisible(false)}}
          className = "contact__modal"
        >        
         {initialData && <Form
          form = {form}
            name="normal_login"
            className="login-form"
            initialValues={initialData}
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
              <Form.Item>
              <Button type="primary" style = {{width: "100%"}} htmlType="submit">Done</Button>
              </Form.Item>
          </Form>}
        </Modal>
    )
}

export default EditContact;