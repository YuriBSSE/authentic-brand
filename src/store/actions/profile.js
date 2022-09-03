// import {
//     GET_DASHBOARD,
//     GET_PROFILE
// } from "./types";
// import axios from "axios";
// import {api} from "../../config/config..json";



// export const getProfile=(id,cb)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     const res=await axios.post(`${api}/api/profile`,{id},{
//         headers:{
//             Authorization:token
//         }
//     })
//     if(res.data.msg=="required valid token"){
//         cb()
//         return {error:true}
//     }else{
//         dispatch({
//             type:GET_PROFILE,
//             payload:res.data.data
//         })
//     }
// }

// export const getDashboard=(id,role)=>async dispatch=>{
//     const token=localStorage.getItem('token')
//     console.log("TOKEN", token)
//     const params={};
//     if(role==2){
//         params.client=id
//     }
//     const res=await axios.get(`${api}/api/dashboard`,{
//         headers:{
//             Authorization:token
//         },
//         params
//     })
//     dispatch({
//         type:GET_DASHBOARD,
//         payload:res.data.data
//     })
// }

// export const updateProfile=(data)=>async dispatch=>{
//     const body=new FormData();
//     if(typeof data.image!=="string"){
//         console.log(data.image)
//         body.append("image",data.image)
//     }
//     if(data.editOnly){
//         body.append("editOnly",true)
//     }
//     body.append("first_name",data.first_name)
//     body.append("last_name",data.last_name)
//     body.append("number",data.number)
//     if(data.token){
//         body.append('token',data.token)
//     }
//     if(data.customerPaymentProfileId){
//         body.append('customerPaymentProfileId',data.customerPaymentProfileId)
//     }
//     body.append("organization",data.organization)
//     body.append("address",data.address)
//     body.append("id",data._id)
//     body.append("customerProfileId",data.customerProfileId)
//     const res=await axios.post(`${api}/api/editClient`,body)
//     return res.data
// }