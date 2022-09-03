
import {GET_CLIENT_PROJECTS} from "../actions/types"

const initialState=[]

export default function clientProjects(state=initialState,action){
    switch(action.type){
        case GET_CLIENT_PROJECTS:
            return action.payload;
        default:
            return state
    }
}