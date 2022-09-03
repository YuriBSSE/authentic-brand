import React, { useEffect, useMemo, useState } from "react";
import arrowImage from "../../assets/arrow-left-purple.png"
import {Link, useHistory, useParams} from "react-router-dom"
import validateEmail from '../../utils/emailCheck';
import SuccessModal from "../../reUsableComponent/successModel";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Skeleton from "../../reUsableComponent/skeleton";
import PhoneInput from 'react-phone-input-2'
import checkSpecial from "../../utils/checkSpecialCharacter";
import 'react-phone-input-2/lib/style.css'

function UpdateClient ({updateClient,clientDetail,getClientDetail}){
    const {id}=useParams();
    const history=useHistory();
    const [fields,setField]=useState({
        first_name:"",
        last_name:"",
        number:"",
        email:"",
        password:"",
        address:"",
        organization:""
    })
    const [submit,setSubmit]=useState(false)
    const [modal,setModal]=useState(false)
    const [pageLoading,setPageLoading]=useState(true)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        getClientDetail(id).then(()=>{
            setPageLoading(false)
        });
    },[])

    const fillFieldsMemo=useMemo(()=>{
        if(clientDetail._id){
            setField(clientDetail)
        }
    },[clientDetail])

    const getValue=(k,v)=>setField({...fields,[k]:v})

    function onSubmitData(){
        setSubmit(true)
        if(fields.first_name && !checkSpecial(fields.last_name) && !checkSpecial(fields.first_name) && validateEmail(fields.email) && fields.last_name){
            setLoading(true)
            updateClient({...fields,id:fields._id}).then(()=>{
                setModal(true)
                setLoading(false)
                setSubmit(false)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    if(pageLoading){
        return <Skeleton/>
    }else{
        return(
            <>
            <SuccessModal
            title="Update successfully"
            visible={modal}
            closeModal={()=>{
                setModal(false)
                history.goBack();
            }}
            />
            <header className="centering for-inner">
            <div className="go-back">
                <Link to="/head/manageClients">
                    <p><span><img src={arrowImage}/></span> Back</p>
                </Link>
            </div>
            </header>
            <main>
    
                <div className="projects-headings">
                    <h3>Update Client Information</h3>
                </div>
    
                <div className="projects-input ">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <input 
                            maxLength={30}
                            value={fields.first_name}
                            className={(submit && !fields.first_name) || checkSpecial(fields.first_name)?"inputError":""}
                            onChange={e=>getValue("first_name",e.target.value)} 
                            placeholder="First Name"/>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <input 
                            maxLength={30}
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
                            maxLength={60}
                            value={fields.email}
                            className={submit && !fields.email?"inputError":(submit && !validateEmail(fields.email)?"inputError":"")}
                            onChange={e=>getValue("email",e.target.value)}
                            placeholder="Email"/>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <input 
                            maxLength={60}
                            value={fields.password}
                            // className={submit && !fields.password?"inputError":(submit && !validateEmail(fields.password)?"inputError":"")}
                            onChange={e=>getValue("password",e.target.value)}
                            placeholder="password (optional)"/>
                        </div>
                        {/* <div className="col-lg-6 col-md-6">
                            <input 
                            maxLength={30}
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
                        <div className="col-lg-12 text-left">
                                <button 
                                onClick={onSubmitData}
                                style={{display:'flex',justifyContent:'center',alignItems:'center'}}
                                className="btn-all btn-done">
                                    {loading?(
                                <ClipLoader size={25} color="white"/>
                                ):"Updated"}
                                </button>
                        </div>
                    </div>
                </div>
    
            </main>
            </>
        )
    }
}

function mapStateToProps({clientDetail}){
    return {clientDetail}
}

export default connect(mapStateToProps,actions)(UpdateClient);