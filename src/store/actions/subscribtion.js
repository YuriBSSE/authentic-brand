// import {
//     GET_SUBSCRIBTION,
//     GET_SUBSCRIBTIONS,
//     GET_USER_SUB,
//     GET_SUB_TRANS,
//     CLEAR_TRANSACTION
// } from "./types";
// import axios from "axios";
// import {api} from "../../config/config..json";

// export const createSubs=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const updatedData={
//         name:data.name,
//         services:data.services.map(item=>({name:item.text})),
//         price:Number(data.price),
//         cycle:Number(data.cycleType),
//         _user:data.client
//     }
//     const res=await axios.post(`${api}/api/createSubscribtion`,updatedData,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res
// }

// export const getSubscribtions=(page,id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.get(`${api}/api/subscribetion`,{
//         params,
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_SUBSCRIBTIONS,
//         payload:res.data.data
//     })
// }
// export const deleteSubs=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/deleteSubscribtion`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     console.log(res.data)
// }

// export const getSubscribtion=(id,cb)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/singleSubscrition`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     if(res.data.data.subscribe){
//         cb(res.data.data.subscribe.subscriptionId)
//     }
//     else{
//         dispatch({
//             type:GET_SUB_TRANS,
//             payload:[]
//         })
//     }
//     dispatch({
//         type:GET_SUBSCRIBTION,
//         payload:res.data.data
//     })
// }

// export const editSubs=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const updatedData={
//         name:data.name,
//         services:data.services.map(item=>({name:item.text})),
//         price:Number(data.price),
//         cycle:Number(data.cycleType),
//         _user:data.client,
//         id:data.id,
//         // interval:data.interval
//     }
//     const res=await axios.post(`${api}/api/editSubscribtion`,updatedData,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res
// }

// export const getUserSubs=(id,page)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/userSubscribetions`,{id,limit:5},{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_USER_SUB,
//         payload:res.data.data
//     })
// }

// export const searchSub=(text,page,id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.post(`${api}/api/searchSubs`,{text},{
//         params,
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_SUBSCRIBTIONS,
//         payload:res.data.data
//     })
// }

// export const searchSubByDate=(date,page,id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.post(`${api}/api/searchSubsByDate`,{date},{
//         params,
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_SUBSCRIBTIONS,
//         payload:res.data.data
//     })
// }

// export const subscribePackage=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     console.log(data)
//     const res=await axios.post(`${api}/api/subscribePackage`,data,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res.data
// }
// export const cancelSubsPak=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/unSubscribe`,data,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res.data
// }
// export const getSubTransaction=(subscriptionId)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     console.log(token)
//     const res=await axios.post(`${api}/api/userSubsTrans`,{subscriptionId},{
//         headers:{
//             Authorization:token
//         }
//     })
//     console.log(res.data.data, "AHSAN")
//     if(res ==! 'undefined'){
//         dispatch({
//             type:GET_SUB_TRANS,
//             payload:res.data.data
//         })
//     }
// }


// export const clearTransactions=()=>async dispatch=>{
//     dispatch({
//         type:CLEAR_TRANSACTION,
//         payload:[]
//     })
// }