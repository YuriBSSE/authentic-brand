import React, { useEffect, useState } from 'react';
import Skeleton from '../../reUsableComponent/skeleton';
import arrowImage from "../../assets/arrow-left-purple.png"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import { useHistory, useParams } from "react-router-dom"
import * as actions from "../../store/actions"
import { connect } from 'react-redux';
import { Button} from "@material-ui/core"
import DeleteModel from "../../reUsableComponent/deleteModel"
import {Link} from "react-router-dom"
import {api} from "../../config/config..json"
import Table from "./table"
import SubTable from "./subTable"

function ClientDetail({getClientDetail,clientDetail,deleteClient,getUserSubs,getClientProjects,clientProjects,userSubs}){
	const {id}=useParams();
	const history=useHistory();
	const [loading,setLoading]=useState(true)
    const [delModal,setDelModal]=useState(false)

	useEffect(()=>{
		
		Promise.all([getClientDetail(id),getClientProjects(id,1)],getUserSubs(id,1)).then(()=>{
			setLoading(false)
		})
	},[])
    function onDeleteClient(clientId){
        deleteClient(clientId).then(()=>{
			history.goBack()
		})
    }

	if(loading){
        return <Skeleton/>
    }
    else{
		const {
			_id,
			address,
			email,
			first_name,
			image,
			last_name,
			number,
			role_id,
			updated_at,
			projects,
			subs
		}=clientDetail
		return(
			<>
			<DeleteModel
			visible={delModal}
			closeModal={()=>setDelModal(false)}
			action={()=>onDeleteClient(_id)}
			title="Are you want to delete this client?"
			/>
			<header className="centering for-inner">
				<div className="go-back">
					<Link to="/head/manageClients">
						<p><span><img src={arrowImage}/></span> Back</p>
					</Link>
				</div>
			</header>
			<main>
	
				<div className="profile-view-client-head">
					<div  className="row">
						<div className="col-lg-3 col-md-4">
							<div className="clients-image">
								<img src={api+image}/>
							</div>
						</div>
						<div className="col-lg-9 col-md-8 my-auto">
							<div className="clients-info card" style={{padding:10}}>
								<h4 style={{textTransform:'capitalize'}}>{first_name+" " + last_name}</h4>
								<p>Total Active Projects :<span> {projects} </span></p>
								<p>Total Active Subscribtions : <span> {subs} </span></p>
								<p>Email : <span> {email} </span></p>
								<p>Address : <span> {address} </span></p>
								<div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
								<Button
								style={{color:'red',borderColor:'red',marginLeft:5,width:'48%'}}
								onClick={()=>setDelModal(true)}
								variant="outlined"
								>
								<AiFillDelete
								style={{cursor:"pointer"}}
								color="#e72d18"
								size={30}
								/>
								</Button>
								<Button
								style={{color:'rgb(58, 222, 89)',borderColor:'rgb(58, 222, 89)',marginLeft:5,width:'48%'}}
								onClick={()=>history.push(`/updateClient/${id}`)}
								variant="outlined"
								>
								<AiFillEdit
								style={{cursor:"pointer",marginLeft:20}}
								color="rgb(58, 222, 89)"
								size={30}
								/>
								</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<h3>Projects</h3>
				<hr/>
				{clientProjects.docs?.length > 0 ? (
					<Table
						header={
							{
								c1: {
									key: "name",
									title: "Name"
								},
								c2: {
									key: "price",
									title: "Price"
								},
								c3: {
									key: "status",
									title: "Status"
								}
							}
						}
						cId={id}
						data={clientProjects}
						reload={getClientProjects}
					/>
				) : (
					<div style={{ margin: 40 }}>
						<h2 style={{color:'grey'}}>Not Found</h2>
					</div>
                )}
				<h3>Packages</h3>
				<hr/>
				{userSubs.docs?.length > 0 ? (
					<SubTable
						header={
							{
								c1: {
									key: "name",
									title: "Name"
								},
								c2: {
									key: "price",
									title: "Price"
								},
								c3: {
									key: "subscribe",
									title: "Subscribe"
								},
								c4: {
									key: "cycle",
									title: "Cycle"
								}
							}
						}
						data={userSubs}
						cId={id}
						reload={getUserSubs}
					/>
				) : (
					<div style={{ margin: 40 }}>
						<h2 style={{color:'grey'}}>Not Found</h2>
					</div>
                )}
			</main>
			</>
		)
	}
}
function mapStateToProps({clientDetail,clientProjects,userSubs}){
	return {clientDetail,clientProjects,userSubs}
}
export default connect(mapStateToProps,actions)(ClientDetail)