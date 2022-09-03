import {GET_DASHBOARD} from "../actions/types"

const initialState=[]

export default function dashboard(state=initialState,action){
    switch(action.type){
        case GET_DASHBOARD:
            return action.payload;
        default:
            return state
    }
}