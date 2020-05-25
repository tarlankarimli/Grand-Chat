import API from './index';

const getContacts = () => {
    return API.get("/contacts");
}

const remove = (id) => {
    return API.delete(`/contacts/${id}`)
}

const update = (id, contact) => {
    return API.put(`/contacts/${id}`, contact)
}

const getOne = (id) => {
    return API.get(`/contacts/${id}`)
}

export {getContacts, remove, update, getOne};