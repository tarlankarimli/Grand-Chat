import React, {createContext, useReducer, useEffect} from 'react';
import * as ActionTypes from './actionTypes'

const messageContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case ActionTypes.ADD: 
        const {to, side, message} = action.payload
        let friend = state[to]
        if(!friend) {
            friend = []
        }
        friend.push({
            side,
            message
        })
        
        let output = {...state}
        output[to]=friend
        return output;

        default: return state;
    }
        
}

const MessageContextProvider  = ({children}) => {
    const [message, dispatch] = useReducer(reducer, {}, ()=>{
        let temp = JSON.parse(window.localStorage.getItem("messages"));
        return temp ? temp : {};
    });
    useEffect(()=>{
        window.localStorage.setItem("messages", JSON.stringify(message));
    },[message])
    return (<messageContext.Provider value = {{message, messageDispatch: dispatch}}>
            {children}
        </messageContext.Provider>
    );
}

export default messageContext;
export {MessageContextProvider, ActionTypes};