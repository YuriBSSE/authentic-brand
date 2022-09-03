import {GET_INVOICE_DETAIL} from "../actions/types"

const initialState={}

export default function invoiceDetail(state=initialState,action){
    switch(action.type){
        case GET_INVOICE_DETAIL:
            return action.payload;
        default:
            return state
    }
}