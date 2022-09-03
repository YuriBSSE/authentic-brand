import {GET_SUBSCRIBTION} from "../actions/types"

const initialState={}

export default function subscribetion(state=initialState,action){
    switch(action.type){
        case GET_SUBSCRIBTION:
            return action.payload;
        default:
            return state
    }
}