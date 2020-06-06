import {combineReducers} from 'redux';
import messageReducer  from './messages/reducer';
import contactsReducer from './contacts/reducer'

const rootReducer = combineReducers({
    message: messageReducer,
    contacts: contactsReducer
})

export default rootReducer;