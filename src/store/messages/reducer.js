import * as ActionTypes from './ActionTypes'

const init = {};

const reducer = (state = init, action) => {
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

export default reducer;