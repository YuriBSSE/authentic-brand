import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import arrowImage from "../../assets/arrow-left-purple.png"
import SuccessModal from "../../reUsableComponent/successModel";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProject({createProject,getCLientList,clientList,getCategory,categories,profile,role}){
    const history=useHistory()
    const [fields,setFields]=useState({
        name:"",
        projectCategory:"",
        projectPrice:"",
        description:"",
        client:"",
        subCat:""
        
    })
    const [submit,setSubmit]=useState(false)
    const [modal,setModal]=useState(false)
    const [loading,setLoading]=useState(false)

    const getValue=(k,v)=>setFields({...fields,[k]:v})

    useEffect(()=>{
        getCLientList()
        getCategory()
    },[])

    const onCreateProject=()=>{
        setSubmit(true)
        if(role==2){
            getValue('client',JSON.stringify(profile))
        }
        if(fields.installmentType && fields.client &&(fields.subCat || fields.projectCategory=="custom") && fields.noOfInstallments && fields.name && fields.projectCategory && fields.projectPrice && fields.description && (/^\d+$/.test(fields.projectPrice)) && fields.projectPrice>0){
            setLoading(true)
            createProject(fields).then((res)=>{
                if(res.status){
                    setModal(true)
                    setSubmit(false)
                    setLoading(false)
                    setFields({
                        name:"",
                        projectCategory:"",
                        projectPrice:"",
                        domain:"",
                        description:"",
                        noOfInstallments:"",
                        installmentType:"",
                        client:""
                    })
                }else{
                    toast.error(res.message)
                    setLoading(false)
                }
            })
        }
    }

    function renderSubCat(){
        const seletedCategory=categories.filter((item)=>item._id==fields.projectCategory)
        if(seletedCategory.length>0){
            const [data]=seletedCategory
            return data.sub.map((item)=><option key={item._id} value={item._id}>{item.name}</option>)
        }
        return null
    }

    function renderClientList(){
        return clientList.map((item)=>{
            return(
                <option key={item._id} value={JSON.stringify(item)}>{item.first_name+" "+item.last_name}</option>
            )
        })
    }
    function renderProjectCategory(){
        return categories.map((item)=>{
            return(
                    <option key={item._id} value={item._id}>{item.name}</option>
            )
        })
    }

    return(
        <>
        <SuccessModal
        title="create successfully"
        visible={modal}
        closeModal={()=>{
            history.goBack()
            setModal(false)}}
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
				<h3>Create A Project</h3>
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
                    {role!=2?(
                        <div className="col-lg-6 col-md-6">
						<div className="select-options">
							<select 
                            value={fields.client}
                            className={submit && !fields.client?"inputError":""}
                            onChange={e=>getValue("client",e.target.value)}>
								<option value="">Assign To Client</option>
                                {renderClientList()}
							</select>
							<i className="fas fa-sort-down"></i>
						</div>
					</div>
                    ):null}
					<div className="col-lg-6 col-md-6">
						<input
                        maxLength={60}
                        value={fields.domain}
                        onChange={e=>getValue("domain",e.target.value)}
                        placeholder="Project Domain (optional)"/>
					</div>
					<div className="col-lg-6 col-md-6">
						<input 
                        value={fields.projectPrice}
                        style={{marginBottom:0}}
                        type="number"
                        max={10000000}
                        className={submit && fields.projectPrice<=0 && !(/^\d+$/.test(fields.projectPrice))?"inputError":""}
                        onChange={e=>{
                            if(e.target.value<=10000000){
                                getValue("projectPrice",e.target.value)
                            }
                        }}
                        placeholder="Project Price"/>
                        {/* { && !submit?"":<p style={{margin:'0px !important',padding:0,color:'red'}}>price should be greater than 0</p>} */}
					</div>
					<div className="col-lg-6 col-md-6">
						<div className="select-options">
							<select 
                            value={fields.projectCategory}
                            className={submit && !fields.projectCategory?"inputError":""}
                            onChange={e=>{
                                getValue("projectCategory",e.target.value)
                            }}>
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
                        value={fields.subCat}
                        disabled={!fields.projectCategory || fields.projectCategory=="custom"?true:false}
                        className={submit && !fields.subCat?(fields.projectCategory=="custom"?"":"inputError"):""}
                        onChange={e=>getValue("subCat",e.target.value)}>
                            <option value="">Sub Category</option>
                            {renderSubCat()}
                        </select>
                        <i className="fas fa-sort-down"></i>
                    </div>
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
                    className={submit && !fields.noOfInstallments?"inputError":""}
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
                        value={fields.description}
                        maxLength={800}
                        className={submit && !fields.description?"inputError":""}
                        onChange={e=>getValue("description",e.target.value)}
                        placeholder="Description"></textarea>
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

    function mapStateToProps({clientList,categories,user,profile}){
        return {clientList,categories,profile,role:user.role_id}
    }

    export default connect(mapStateToProps,actions)(CreateProject);