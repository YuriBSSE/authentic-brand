import React, { useState } from "react";
import arrowImage from "../../assets/arrow-left-purple.png"
import {useHistory} from "react-router-dom"
import validateEmail from '../../utils/emailCheck';
import SuccessModal from "../../reUsableComponent/successModel";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer,toast } from "react-toastify";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import checkSpecial from "../../utils/checkSpecialCharacter";

function CreateClient ({createClient}){
    const history=useHistory()
    const [fields,setField]=useState({
        first_name:"",
        last_name:"",
        number:"",
        email:"",
        password:"",
        address:""
    })
    const [submit,setSubmit]=useState(false)
    const [modal,setModal]=useState(false)
    const [loading,setLoading]=useState(false)

    const getValue=(k,v)=>setField({...fields,[k]:v})

    function formatExpireDate(date){
        const dateObj=new Date(date)
        const month=(dateObj.getMonth()+1)
        return ((month>=10?month.toString():"0"+month.toString())+dateObj.getFullYear().toString().slice(2)).toString()
    }

    function onSubmitData(){
        setSubmit(true)
        if(fields.first_name && !checkSpecial(fields.last_name) && !checkSpecial(fields.first_name) && validateEmail(fields.email) && fields.last_name && fields.password){
            setLoading(true)
            createClient({
                ...fields,
            //     card:{
            //     cardNum:fields.cardNum,
            //     expire:formatExpireDate(fields.expire)
            // }
        }).then((res)=>{
                if(res.status){
                setModal(true)
                setLoading(false)
                setSubmit(false)
                setField({
                    first_name:"",
                    last_name:"",
                    number:"",
                    email:"",
                    password:"",
                    address:"",
                    organization:"",
                    // cardNum:"",
                    // expire:""
                })
                }else{
                    toast.error(res.msg)
                    setLoading(false)
                }
            }).catch(err=>{
                setLoading(false)
                console.log(err)
            })
        }
    }
    return(
        <>
        <SuccessModal
        title="create successfully"
        visible={modal}
        closeModal={()=>{
            setModal(false)
            history.goBack()
        }}
        />
        <header className="centering for-inner">
        <div className="go-back" onClick={()=>history.goBack()}>
                <p><span><img src={arrowImage}/></span> Back</p>
        </div>
        </header>
        <main>

            <div className="projects-headings">
                <h3>Create A Client</h3>
            </div>

            <div className="projects-input ">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <input 
                        maxLength={40}
                        value={fields.first_name}
                        className={(submit && !fields.first_name) || checkSpecial(fields.first_name)?"inputError":""}
                        onChange={e=>getValue("first_name",e.target.value)} 
                        placeholder="First Name"/>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <input 
                        maxLength={40}
                        value={fields.last_name}
                        className={(submit && !fields.last_name) || checkSpecial(fields.last_name)?"inputError":""}
                        onChange={e=>getValue("last_name",e.target.value)} 
                        placeholder="Last Name"/>
                    </div>
                    {/* <div className="col-lg-6 col-md-6">
                        <PhoneInput
                        inputStyle={{
                            width:'100%',
                            height:50,
                            borderColor:submit && !fields.number?"red":""
                        }}
                        limitMaxLength={true}
                        placeholder="Enter phone number"
                        value={fields.number}
                        onChange={e=>getValue("number",e)}/>
                    </div> */}
                    <div className="col-lg-6 col-md-6">
                        <input 
                        maxLength={50}
                        value={fields.email}
                        className={submit && !fields.email?"inputError":(submit && !validateEmail(fields.email)?"inputError":"")}
                        onChange={e=>getValue("email",e.target.value)}
                        placeholder="Email"/>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <input 
                        value={fields.password}
                        type="password"
                        className={submit && !fields.password?"inputError":""}
                        onChange={e=>getValue("password",e.target.value)}
                        placeholder="Password"/>
                    </div>
                    {/* <div className="col-lg-6 col-md-6">
                        <input 
                        maxLength={40}
                        value={fields.organization}
                        className={submit && !fields.organization?"inputError":""}
                        onChange={e=>getValue("organization",e.target.value)}
                        placeholder="Organization"/>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <input 
                        maxLength={100}
                        value={fields.address}
                        className={submit && !fields.address?"inputError":""}
                        onChange={e=>getValue("address",e.target.value)}
                        placeholder="Address"/>
                    </div> */}
                    {/* <div className="col-lg-12 col-md-12">
                    <h3>Card Information</h3>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <input 
                        type="tel"
                        value={fields.cardNum}
                        maxLength={16}
                        className={submit && fields.cardNum?.length!=16?"inputError":""}
                        onChange={e=>getValue("cardNum",e.target.value)}
                        placeholder="Card Number"/>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <input 
                        type="date"
                        value={fields.expire}
                        className={submit && !fields.expire?"inputError":""}
                        onChange={e=>getValue("expire",e.target.value)}
                        placeholder="Expire date"/>
                    </div> */}
                    <div className="col-lg-12 text-left">
                            <button 
                            onClick={onSubmitData}
                            style={{display:'flex',justifyContent:'center',alignItems:'center'}}
                            className="btn-all btn-done">
                                {loading?(
							<ClipLoader size={25} color="white"/>
						    ):"Done"}
                            </button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </main>
        </>
    )
}


export default connect(null,actions)(CreateClient);