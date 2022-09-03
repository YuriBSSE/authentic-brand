import {GET_INVOICE} from "../actions/types"

const initialState={}

export default function invoices(state=initialState,action){
    switch(action.type){
        case GET_INVOICE:
            return action.payload;
        default:
            return state
    }
}