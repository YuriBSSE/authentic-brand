// import {
//     GET_CATEGORY,
//     GET_CLIENTS, 
//     GET_CLIENT_DETAIL, 
//     GET_CLIENT_LIST, 
//     GET_CLIENT_PROJECTS
// } from "./types";
// import axios from "axios";
// import {api} from "../../config/config..json";

// export const createClient=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/registerClient`,data,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res.data
// }

// export const getClients=(page)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.get(`${api}/api/clients`,{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_CLIENTS,
//         payload:res.data.data
//     })
// }
// export const getClientDetail=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/getClientTotal`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_CLIENT_DETAIL,
//         payload:res.data.data
//     })
// }

// export const deleteClient=(id,customerProfileId)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/deleteClient`,{id,customerProfileId},{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res.data
// }

// export const updateClient=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')
    
//     // const body=new FormData();
//     // body.append("first_name",data.first_name)
//     // body.append("last_name",data.last_name)
//     // body.append("number",data.number)
//     // body.append("address",data.address)
//     // body.append("organization",data.organization)
//     // body.append("id",data._id)
//     const res=await axios.post(`${api}/api/editClientByAdmin`,data,{
//         headers:{
//             Authorization:token
//         }
//     })
//     console.log(res.data)
// }

// export const getCLientList=()=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.get(`${api}/api/clientList`,{
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_CLIENT_LIST,
//         payload:res.data.data
//     })
// }
// export const getCategory=()=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.get(`${api}/api/categories`,{
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_CATEGORY,
//         payload:res.data.data
//     })
// }

// export const getClientProjects=(id,page)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/userProjects`,{id,limit:5},{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_CLIENT_PROJECTS,
//         payload:res.data.data
//     })
// }


// export const searchClients=(text,page)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const res=await axios.post(`${api}/api/searchClients`,{text},{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_CLIENTS,
//         payload:res.data.data
//     })
// }

// export const searchClientsByDate=(date,page)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const res=await axios.post(`${api}/api/searchClientsByDate`,{date},{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_CLIENTS,
//         payload:res.data.data
//     })
// }

// export const addBankAccount=(data)=>async dispatch=>{

//     const res=await axios.post(`${api}/api/addBankAccount`,data)
//     return res.data
// }