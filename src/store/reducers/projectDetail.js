import {GET_PROJECT_DETAIL} from "../actions/types"

const initialState={}

export default function projectDetail(state=initialState,action){
    switch(action.type){
        case GET_PROJECT_DETAIL:
            return action.payload;
        default:
            return state
    }
}