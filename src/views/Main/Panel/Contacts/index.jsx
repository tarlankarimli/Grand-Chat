import React, {useState, useEffect} from 'react'
import * as ContactApi from 'api/ContactApi'
import { Layout, Button, Pagination, Table, Popconfirm, message} from "antd"
import "./Contacts.scss"
import CreateContact from './Modals/CreateContact';
import EditContact from './Modals/EditContact';
import * as ActionTypes from 'store/contacts/ActionTypes';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const { Content } = Layout;
const Contacts = () => {
    const [page, setPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editContactID, seteditContactID] = useState(undefined);
    const contacts = useSelector(store => store.contacts);
    const dispatchContacts = useDispatch();

    const getRefresh = (dispatchContacts) => {
      dispatchContacts({type: ActionTypes.LOADING})
      ContactApi.getContacts().then(res => {
        dispatchContacts({type: ActionTypes.SET, payload: res.data.map(data => ({key: data.id, ...data}))})
      }).catch(error => {
        dispatchContacts({type: ActionTypes.ERROR, payload: error.message})
      })
    }
    

    useEffect(() => {    
      getRefresh(dispatchContacts);
      // eslint-disable-next-line
    }, [])

    const columns = [
        {
          title: 'no',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'surname',
          dataIndex: 'surname',
          key: 'surname',
        },
        {
          title: 'username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'e-mail',
          dataIndex: 'e-mail',
          key: 'e-mail',
        },
        {
          title: 'actions',
          key: 'actions',
          render: (text, record)=> {
              return <div>
                <Button 
                onClick = {()=>{
                  seteditContactID(record.id)
                  setEditVisible(true)}
                }
                shape="round" 
                type ="primary">
                  Edit
                </Button>
                
                <Popconfirm
                    title="Are you sure delete this contact?"
                    onConfirm={()=> {
                      ContactApi.remove(record.id)
                      .then(_=>{getRefresh(dispatchContacts)})
                    .catch(error=> {
                     message.error("Not available to delete contact")
                    })}}
                    onCancel={''}
                    okText="Yes"
                    cancelText="No"
                    placement = "left"
                  >
                  <Button 
                    shape="round" 
                    danger 
                    style = {{marginLeft: 8}}
                    >Delete
                  </Button>
                </Popconfirm>
              </div>
          } 
        },
      ];


    return (
        <Content className="site-layout-background Contacts-Panel">
            <h3>Contacts</h3>
            <Button 
                type = "primary" 
                className = "Contacts-Panel__btn"
                onClick = {()=> {setVisible(true)}}
                    >Create contact
            </Button>
            <Pagination 
                className = "Contacts-Panel__pgn" 
                current={page} 
                onChange={(page) => {setPage(page)}} 
                total={100}
                pageSize ={20}
                showSizeChanger={false}
                />
              <Table columns={columns} 
              dataSource={contacts.value.map((data, index)=> ({...data, key: data.id, no: (index+1)}))} 
              pagination = {false}
              loading = {contacts.loading}/>

              <CreateContact 
              visible = {visible} 
              setVisible = {setVisible}
              refresh ={()=>{getRefresh(dispatchContacts)}}/>

              <EditContact 
              visible = {editVisible} 
              setVisible = {setEditVisible}
              id = {editContactID}
              refresh ={()=>{getRefresh(dispatchContacts)}}/>
        </Content>
    )
}

export default Contacts;