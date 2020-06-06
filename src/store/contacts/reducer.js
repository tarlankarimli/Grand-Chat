import * as ActionTypes from './ActionTypes'
const init = {
    value: [],
    error: undefined,
    loading: true
};

const reducer = (state = init, action) => {
    switch(action.type) {
        case ActionTypes.LOADING: return {...state, loading: true}
        case ActionTypes.SET: return {value: action.payload, loading: false}
        case ActionTypes.ERROR: return {}
        
        default: return state;
    }}

export default reducer;