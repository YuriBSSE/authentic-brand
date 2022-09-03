// import axios from "axios";
// import {api} from "../../config/config..json";
// import { GET_INVOICE, GET_INVOICE_DETAIL } from "./types"

// export const getInvoice=(page,id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.post(`${api}/api/transactions`,null,{
//         params,
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_INVOICE,
//         payload:res.data.data
//     })
// }

// export const getInvoiceDetail=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/transaction`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_INVOICE_DETAIL,
//         payload:res.data.data
//     })
// }
// export const getInvoiceBySearch=(text,page,id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.post(`${api}/api/searchTransaction`,{text},{
//         params,
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_INVOICE,
//         payload:res.data.data
//     })
// }

// export const getInvoiceByDate=(date,page,id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.post(`${api}/api/searchTransactionByDate`,{date},{
//         params,
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_INVOICE,
//         payload:res.data.data
//     })
// }