// import {
//     GET_AS_SUB,
//     GET_SUBSCRIBTION,
//     GET_SUBSCRIBTIONS
// } from "./types";
// import axios from "axios";
// import {api} from "../../config/config..json";

// export const createAsSubs=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const updatedData={
//         name:data.name,
//         services:data.services.map(item=>({name:item.text})),
//         price:Number(data.price),
//         cycle:Number(data.cycleType),
//         _project:data._project,
//         _user:data._user
//     }
//     console.log(updatedData)
//     const res=await axios.post(`${api}/api/createAsSubscribtion`,updatedData,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res
// }

// export const deleteAsSubs=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const res=await axios.post(`${api}/api/deleteAsSubscribtion`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
// }

// export const editAsSubs=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const updatedData={
//         name:data.name,
//         services:data.services.map(item=>({name:item.text})),
//         price:Number(data.price),
//         cycle:Number(data.cycleType),
//         id:data.id
//     }
//     const res=await axios.post(`${api}/api/editAsSubscribtion`,updatedData,{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res
// }

// export const getAsSubscribtion=(id)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/singleAsSubscribtion`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_AS_SUB,
//         payload:res.data.data
//     })
// }