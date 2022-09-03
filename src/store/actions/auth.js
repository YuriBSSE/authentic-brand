// import {
//     LOGIN,
//     LOGOUT,
//     SET_USER
// } from "./types";
// import axios from "axios";
// import {api} from "../../config/config..json";

// export const login=(data)=>async dispatch=>{
//     const res=await axios.post(`${api}/api/adminLogin`,{email:data.email,password:data.password,role:1})
//     if(res.data.status){
//         if(data.remember)localStorage.setItem("id",res.data.data._id)
//         localStorage.setItem("role",res.data.data.role_id)
//         dispatch({
//             type:LOGIN,
//             payload:{_id:res.data.data._id,role_id:res.data.data.role_id}
//         })
//     }else{
//         dispatch({
//             type:LOGIN,
//             payload:res.data.data
//         })
//     }
// }

// export const setUser=(id,role)=>async dispatch=>{
//     dispatch({
//         type:SET_USER,
//         payload:{_id:id,role_id:role}
//     })
// }

// export const logOut=()=>async dispatch=>{
//     localStorage.removeItem('id')
//     localStorage.removeItem('role')
//     dispatch({
//         type:LOGOUT,
//         payload:{_id:null}
//     })
// }
