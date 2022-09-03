import {LOGIN, LOGOUT, SET_USER} from "../actions/types"

const initialState={_id:null}

export default function user(state=initialState,action){
    switch(action.type){
        case LOGIN:
            return action.payload;
        case SET_USER:
            return action.payload;
        case LOGOUT:
            return action.payload;
        default:
            return state
    }
}