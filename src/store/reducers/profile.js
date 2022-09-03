import {GET_PROFILE} from "../actions/types"

const initialState={}

export default function profile(state=initialState,action){
    switch(action.type){
        case GET_PROFILE:
            return action.payload;
        default:
            return state
    }
}