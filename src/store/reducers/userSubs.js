import {GET_USER_SUB} from "../actions/types"

const initialState=[]

export default function userSubs(state=initialState,action){
    switch(action.type){
        case GET_USER_SUB:
            return action.payload;
        default:
            return state
    }
}