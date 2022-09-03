import {GET_SUBSCRIBTIONS} from "../actions/types"

const initialState=[]

export default function subscribetions(state=initialState,action){
    switch(action.type){
        case GET_SUBSCRIBTIONS:
            return action.payload;
        default:
            return state
    }
}