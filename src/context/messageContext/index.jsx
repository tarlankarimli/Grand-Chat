import React, {createContext, useReducer} from 'react';
import * as ActionTypes from './actionTypes'

const messageContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case ActionTypes.ADD: 
        const {to, message, side} = action.payload
        let friend = state[to]
        if(!friend) {
            friend = []
        }
        friend.push({
            message,
            side
        })
        
        let output = {...state}
        output[to]=friend
        return output;

        default: return state;
    }
        
}

const MessageContextProvider  = ({children}) => {
    const [message, dispatch] = useReducer(reducer, {});
    return (<messageContext.Provider value = {{message, messageDispatch: dispatch}}>
            {children}
        </messageContext.Provider>
    );
}

export default messageContext;
export {MessageContextProvider, ActionTypes};