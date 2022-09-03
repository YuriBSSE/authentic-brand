import {CLEAR_TRANSACTION, GET_SUB_TRANS} from "../actions/types"

const initialState=[]

export default function subTran(state=initialState,action){
    switch(action.type){
        case GET_SUB_TRANS:
            return action.payload;
        case CLEAR_TRANSACTION:
            return action.payload;
        default:
            return state
    }
}