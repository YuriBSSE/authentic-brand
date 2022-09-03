// import axios from "axios";
// import {api} from "../../config/config..json";
// import { GET_BILLS } from "./types"

// export const getBills=(page)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.get(`${api}/api/unPaidProjects`,{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_BILLS,
//         payload:res.data.data
//     })
// }

// export const getBillsBySearch=(text,page)=>async dispatch=>{
//     const token=localStorage.getItem('token')

//     const res=await axios.post(`${api}/api/unPaidProjectsBySearch`,{text},{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_BILLS,
//         payload:res.data.data
//     })
// }

// export const getBillsByDate=(date,page)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const res=await axios.post(`${api}/api/unPaidProjectsByDate`,{date},{
//         params:{
//             page
//         },
//         headers:{
//             Authorization:token
//         }
//     })
//     dispatch({
//         type:GET_BILLS,
//         payload:res.data.data
//     })
// }

// export const sendMail=(data)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const res=await axios.post(`${api}/api/sendBill`,{...data,remainingPrice:data.price-(data.paidPrice?data.paidPrice:0)},{
//         headers:{
//             Authorization:token
//         }
//     })
//     return res.data
// }
