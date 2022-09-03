// import {
//     GET_PROJECTS,
//     GET_PROJECT_DETAIL
// } from "./types";
// import axios from "axios";
// import {api} from "../../config/config..json";

// export const createProject=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const client=JSON.parse(data.client)

//     const res=await axios.post(`${api}/api/createProject`,{
//         ...data,
//         price:parseInt(data.projectPrice),
//         category:data.projectCategory,
//         subCategory:data.subCat,
//         _user:client._id,
//         customerProfileId:client.customerProfileId,
//         customerPaymentProfileId:client.customerPaymentProfileId,
//         installmentType:Number(data.installmentType),
//         noOfInstallments:Number(data.noOfInstallments)
//     },{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res.data
// }

// export const getProjects=(page,id,role)=>async dispatch=>{
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.get(`${api}/api/projects`,{
//         params
//     })

//     dispatch({
//         type:GET_PROJECTS,
//         payload:res.data.data
//     })
// }
// export const getProjectDetail=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/project`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_PROJECT_DETAIL,
//         payload:res.data.data
//     })
// }

// export const deleteProject=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/deleteProject`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
// }

// export const updateProject=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/editProject`,{
//         ...data,
//         price:parseInt(data.price)
//     },{
//         Authorization:token
//     })
//     return res.data
// }

// export const searchProject=(text,page,id,role)=>async dispatch=>{
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.post(`${api}/api/searchProjects`,{text},{
//         params
//     })
//     dispatch({
//         type:GET_PROJECTS,
//         payload:res.data.data
//     })
// }

// export const searchProjectByDate=(date,page,id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const params={
//         page:page
//     }
//     if(id && role==2){
//         params.client=id
//     }
//     const res=await axios.post(`${api}/api/searchProjectsByDate`,{date},{
//         params,
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_PROJECTS,
//         payload:res.data.data
//     })
// }

// export const sendComment=(text,userId,projectId)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/addComment`,{
//         id:projectId,
//         _user:userId,
//         text
//     },{
//         headers:{
//             Authorization:token
//         }
//     })
// }

// export const pay=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     console.log(data)
//     const res=await axios.post(`${api}/api/payOnProject`,data,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res
// }

// export const completeMark=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/markComplete`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res
// }