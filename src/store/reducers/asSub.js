import {GET_AS_SUB} from "../actions/types"

const initialState={}

export default function asSub(state=initialState,action){
    switch(action.type){
        case GET_AS_SUB:
            return action.payload;
        default:
            return state
    }
}