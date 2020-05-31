import * as ActionTypes from './ActionTypes'

const addMessage = (side, to, message) => {
    return {type: ActionTypes.ADD, payload: {message, to, side}} 
}

export default addMessage;