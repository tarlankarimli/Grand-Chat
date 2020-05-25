import React, {createContext, useReducer} from 'react';
import * as ActionTypes from './actionTypes'

const contactsContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case ActionTypes.LOADING: return {...state, loading: true}
        case ActionTypes.SET: return {value: action.payload, loading: false}
        case ActionTypes.ERROR: return {}
        
        default: return state;
    }
        
}

const ContactsContextProvider  = ({children}) => {
    const [contacts, dispatch] = useReducer(reducer, {
        value: [],
        error: undefined,
        loading: true
    });
    return (<contactsContext.Provider value = {{contacts, dispatch}}>
            {children}
        </contactsContext.Provider>
    );
}

export default contactsContext;
export {ContactsContextProvider, ActionTypes};