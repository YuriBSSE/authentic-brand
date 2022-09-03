import {GET_CLIENT_LIST} from "../actions/types"

const initialState=[]

export default function clientList(state=initialState,action){
    switch(action.type){
        case GET_CLIENT_LIST:
            return action.payload;
        default:
            return state
    }
}