import {GET_BILLS} from "../actions/types"

const initialState={}

export default function bill(state=initialState,action){
    switch(action.type){
        case GET_BILLS:
            return action.payload;
        default:
            return state
    }
}