import React, { useState,useEffect, useMemo } from "react";
import { Link,useParams,useHistory } from "react-router-dom";
import arrowImage from "../../assets/arrow-left-purple.png"
import SuccessModal from "../../reUsableComponent/successModel";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Skeleton from '../../reUsableComponent/skeleton';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProject({updateProject,projectDetail,getProjectDetail,getCategory,categories}){
    const {id}=useParams();
    const history=useHistory();
    const [fields,setFields]=useState({
        name:"",
        category:"",
        price:"",
        domain:"",
        description:"",
        subCategory:""
        
    })
    const [submit,setSubmit]=useState(false)
    const [modal,setModal]=useState(false)
    const [loading,setLoading]=useState(false)
    const [skeletonLoading,setSkeletonLoading]=useState(true)
    useEffect(()=>{
        getCategory()
        getProjectDetail(id).then(()=>[
			setSkeletonLoading(false)
		])
    },[])
    const fieldsFillMemo=useMemo(()=>{
        if(projectDetail._id){
            setFields(projectDetail)
        }
    },[projectDetail])
    console.log(projectDetail)
    const getValue=(k,v)=>setFields({...fields,[k]:v})

    const onCreateProject=()=>{
        setSubmit(true)
        if(fields.name && fields.category && (fields.subCategory || fields.category=="custom") && fields.price && fields.description && (/^\d+$/.test(fields.price)) && fields.price>0 && fields.installmentType.toString()){
            setLoading(true)
            updateProject({...fields,id:fields._id}).then((res)=>{
                if(res.status){
                    setModal(true)
                    setSubmit(false)
                    setLoading(false)
                }else{
                    toast.error(res.message)
                }
            })
        }
    }

    function renderSubCat(){
        const seletedCategory=categories.filter((item)=>item._id==fields.category)
        if(seletedCategory.length>0){
            const [data]=seletedCategory
            return data.sub.map((item)=><option key={item._id} value={item._id}>{item.name}</option>)
        }
        return null
    }

    function renderProjectCategory(){
        return categories.map((item)=>{
            return(
                    <option key={item._id} value={item._id}>{item.name}</option>
            )
        })
    }

    if(skeletonLoading){
        return <Skeleton/>
    }else{
        return(
            <>
            <SuccessModal
            title="Update successfully"
            visible={modal}
            closeModal={()=>{
                setModal(false)
                history.goBack()
            }}
            />
            <header className="centering for-inner">
            <div className="go-back">
                <Link to="/head/projects">
                    <p><span><img src={arrowImage}/></span> Back</p>
                </Link>
            </div>
            </header>
            <main>
                <div className="projects-headings">
                    <h3>Update Project</h3>
                </div>
    
                <div className="projects-input">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <input 
                            maxLength={50}
                            value={fields.name}
                            className={submit && !fields.name?"inputError":""}
                            onChange={e=>getValue("name",e.target.value)}
                            placeholder="Project Name"/>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <input 
                            value={fields.price}
                            style={{marginBottom:0}}
                            max={10000000}
                            type="number"
                            className={submit && fields.price<=0 && !(/^\d+$/.test(fields.price))?"inputError":""}
                            onChange={e=>{
                                if(e.target.value<=10000000){
                                    getValue("price",e.target.value)
                                }
                            }}
                            placeholder="Project Price"/>
                            {/* { && !submit?"":<p style={{margin:'0px !important',padding:0,color:'red'}}>price should be greater than 0</p>} */}
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="select-options">
                                <select 
                                value={fields.category}
                                className={submit && !fields.category?"inputError":""}
                                onChange={e=>getValue("category",e.target.value)}>
                                    <option value="">Project Category</option>
                                    {renderProjectCategory()}
                                    <option value={"custom"}>Custom Service</option>
                                </select>
                                <i className="fas fa-sort-down"></i>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="select-options">
                                <select 
                                value={fields.subCategory}
                                disabled={!fields.category || fields.category=="custom"?true:false}
                                className={submit && !fields.subCategory?(fields.category=="custom"?"":"inputError"):""}
                                onChange={e=>getValue("subCategory",e.target.value)}>
                                    <option value="">Sub Category</option>
                                    {renderSubCat()}
                                </select>
                                <i className="fas fa-sort-down"></i>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <input
                            maxLength={60}
                            value={fields.domain}
                            onChange={e=>getValue("domain",e.target.value)}
                            placeholder="Project Domain"/>
                        </div>
                        <div className="col-lg-6 col-md-6">
						<div className="select-options">
							<select 
                            value={fields.installmentType}
                            className={submit && !fields.installmentType?"inputError":""}
                            onChange={e=>{
                                getValue("installmentType",e.target.value)
                            }}>
								<option value="">Installment Type</option>
                                <option value={0}>Monthly</option>
                                <option value={1}>Year</option>
							</select>
							<i className="fas fa-sort-down"></i>
						</div>
				</div>
                    <div className="col-lg-6 col-md-6">
                        <input
                        max={100}
                        type="number"
                        placeholder="No. of installments"
                        value={fields.noOfInstallments}
                        className={submit && !fields.noOfInstallments.toString()?"inputError":""}
                        onChange={e=>{
                            if(e.target.value<=100){
                                getValue("noOfInstallments",e.target.value)
                            }
                        }}/>
                            {/* <div className="select-options">
                                <select 
                                value={fields.noOfInstallments}
                                className={submit && !fields.noOfInstallments?"inputError":""}
                                onChange={e=>{
                                    getValue("noOfInstallments",e.target.value)
                                }}>
                                    <option value="">No of Installments</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                </select>
                                <i className="fas fa-sort-down"></i>
                            </div> */}
                    </div>
                        <div className="col-lg-12">
                            <textarea 
                            maxLength={1000}
                            value={fields.description}
                            className={submit && !fields.description?"inputError":""}
                            onChange={e=>getValue("description",e.target.value)}
                            placeholder="Projects Description"></textarea>
                        </div>
                        <div className="col-lg-12 text-right">
                                <button 
                                onClick={onCreateProject}
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
    }

    const mapStateToProps=({projectDetail,categories})=>{
        return {projectDetail,categories}
    }
    export default connect(mapStateToProps,actions)(UpdateProject);