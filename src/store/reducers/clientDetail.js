import {GET_CLIENT_DETAIL} from "../actions/types"

const initialState={}

export default function clientDetail(state=initialState,action){
    switch(action.type){
        case GET_CLIENT_DETAIL:
            return action.payload;
        default:
            return state
    }
}