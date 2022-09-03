import React ,{useEffect,useState}from "react";
import arrowImage from "../../assets/arrow-left-purple.png"
import PayModel from "../../reUsableComponent/payModel";
import Skeleton from '../../reUsableComponent/skeleton';
import Button from "@material-ui/core/Button"
import * as actions from "../../store/actions"
import { connect } from "react-redux";
import { useParams} from "react-router-dom"
import formatDate from "../../utils/formatDate";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clientPhoto from '../../assets/avatar.png'
import {BiPlus,BiDetail} from "react-icons/bi"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DeleteModel from "../../reUsableComponent/deleteModel"
import SendIcon from '@material-ui/icons/Send';
import {AiFillDelete, AiFillEdit, AiFillFilter} from "react-icons/ai"
import MarkModal from "../../reUsableComponent/markModal";
import AsSub from "../../reUsableComponent/asSub";
import IconButton from '@material-ui/core/IconButton';
import {api} from "../../config/config..json"
import getCycleDura from "../../utils/getCyleDura";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getInstallmentType from "../../utils/getInstallmentType";

  
const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	},
	heading: {
	  fontSize: theme.typography.pxToRem(15),
	  flexBasis: '100%',
	  flexShrink: 0,
	},
	secondaryHeading: {
	  fontSize: theme.typography.pxToRem(15),
	  color: theme.palette.text.secondary,
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	  }
  }));


function ProjectDetail({history,getProjectDetail,projectDetail,deleteAsSubs,sendComment,userId,completeMark,role}){
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const [delModal,setDelModal]=useState(false)
	const [delModal2,setDelModal2]=useState(false)
	const [payModal,setPayModal]=useState(false)
	const [markModal,setMarkModal]=useState(false)
	const [submit,setSubmit]=useState(false)
	const [text,setText]=useState("")
	const [asId,setAsId]=useState("")
	const [data,setData]=useState({})
	const handleChange = (panel) => (event, isExpanded) => {
	  setExpanded(isExpanded ? panel : false);
	};
	const {id}=useParams()
	const [loading,setLoading]=useState(true)
	useEffect(()=>{
		
		getProjectDetail(id).then(()=>[
			setLoading(false)
		])
	},[])

	function onDeleteProject() {
		deleteAsSubs(asId).then(() => {
		getProjectDetail(id)
		toast.success('successfully deleted')
		})
	  }
	  function onSendComment(){
		  setSubmit(true)
		  if(text.length>0){
			sendComment(text,userId,id).then(()=>{
				setSubmit(false)
				setText("")
				getProjectDetail(id)
			})
		  }
	  }
	function renderAsSub(){
		if(projectDetail.asSub.length>0){
			return projectDetail.asSub.map((item,i)=>{
				return(
					<Accordion expanded={expanded === `panel${i.toString()}`} onChange={handleChange(`panel${i.toString()}`)}>
					<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel4bh-content"
					id="panel4bh-header"
					>
					<div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
						<p style={{color:'black',margin:0,fontSize:14,marginRight:30}}>{item.name.length>25?item.name.slice(0,25)+"...":item.name}</p>
						<p style={{color:'grey',margin:0,fontSize:14,marginRight:30}}>{formatDate(new Date(item.created_at))}</p>
					</div>
					</AccordionSummary>
					<AccordionDetails>
						<div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
								<p style={{color:'grey',margin:0,fontSize:14}}>{getCycleDura(item.cycle)}</p>
								<p style={{color:'green'}}>${item.price}</p>
						</div>
					</AccordionDetails>
					<AccordionDetails>
					<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					className={classes.root}
					>
						{item.services.map((item)=>{
							return(
								<ListItem key={item._id}>
									<ListItemIcon>
									<SendIcon />
									</ListItemIcon>
									<ListItemText primary={item.name} />
								</ListItem>
							)
						})}
					</List>
					</AccordionDetails>
					<AccordionActions>
					{role!=2?(
						<>
						<Button 
					onClick={()=>{
						setAsId(item._id)
						setData(item)
						setDelModal(true)
					}}
					style={{borderColor:'green'}}
					variant="outlined" 
					color="primary" 
					href="#outlined-buttons">
						<AiFillEdit
						color="green"
						/>
					</Button>
					<Button 
					style={{borderColor:'red'}}
					onClick={()=>{
						setAsId(item._id)
						setDelModal2(true)
					}}
					variant="outlined" 
					color="primary" 
					href="#outlined-buttons">
						<AiFillDelete
						color="red"
						/>
					</Button>
						</>
					):null}
					<Button 
					onClick={()=>{
						history.push(`/asSubDetail/${item._id}`)
					}}
					style={{borderColor:'grey'}}
					variant="outlined" 
					color="secondary" 
					href="#outlined-buttons">
						<BiDetail
						color="grey"
						/>
					</Button>
					</AccordionActions>
				</Accordion>
				)
			})
		}else{
			return(
				<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:200}}>
					<h4>Not found</h4>
				</div>
			)
		}
	}
	function renderComments(){
		if(projectDetail.notes.length>0){
			return projectDetail.notes.map((item,i)=>{
				return(
					<div 
					key={item._id}
					className="comments-project-details-all" style={{padding:5}}
					style={{justifyContent:'flex-start',alignItems:'flex-start'}}
					>
					<img 
					style={{
						width:40,
						height:40,
						borderRadius:20
					}}
					src={api+item._user?.image}
					/>
					<div className="second" style={{width:'100%'}}>
						<h6 style={{margin:0,marginLeft:3}}>{item._user?.first_name+" "+item._user?.last_name}</h6>
						<p
						style={{marginTop:3,backgroundColor:'white',width:'auto',padding:5,borderRadius:4,fontSize:14,color:'grey'}}
						>{item.text}</p>
						<p style={{textAlign:'right',color:'grey',margin:5}}>{formatDate(new Date(item.created_at))}</p>
					</div>
				</div>
				)
			})
		}else{
			return(
				<div style={{marginLeft:50}}>
					<h5 style={{color:'grey'}}>Not Found</h5>
				</div>
			)
		}
	}
	function onMarkComplete(){
		completeMark(projectDetail._id).then(()=>{
			getProjectDetail(id)
			toast.info("Mark as complete")
		})
	}

	if(loading){
        return <Skeleton/>
    }else{

		const {
			_id,
			name,
			domain,
			description,
			price,
			category,
			subCategory,
			updated_at,
			created_at,
			status,
			notes,
			_user
		}=projectDetail

        return (
        <>
		
        <header className="centering for-inner">
			<div className="go-back">
					<p
					style={{cursor:'pointer'}}
					onClick={()=>history.goBack()}>
						<span><img src={arrowImage}/></span> 
						Back
					</p>
			</div>
		</header>

		<main>
				<PayModel
                visible={payModal}
				data={{
					projectId:projectDetail._id,
					remainingPrice:projectDetail.remainingPrice,
					price:projectDetail.price,
					remainingPrice:(projectDetail.price-projectDetail.paidPrice),
					customerProfileId:projectDetail._user?.customerProfileId,
					customerPaymentProfileId:projectDetail._user?.customerPaymentProfileId,
					bankId:projectDetail._user?.bankId,
					_user:projectDetail._user?._id,
					noOfInstallments:projectDetail.noOfInstallments
				}}
                closeModal={()=>setPayModal(false)}
				reload={()=>getProjectDetail(id)}
                />
				<AsSub
				userId={projectDetail._user?._id}
                visible={delModal}
				projectId={_id}
				asId={asId}
				data={data}
                closeModal={()=>{
					setAsId("")
					setData({})
					setDelModal(false)}
				}
				reload={()=>getProjectDetail(id)}
                />
				<DeleteModel
				visible={delModal2}
				closeModal={() => {
					setAsId("")
					setDelModal2(false)
				}}
				action={onDeleteProject}
				title="Are you want to delete this project?"
				/>
				<MarkModal
				visible={markModal}
				closeModal={()=>setMarkModal(false)}
				action={onMarkComplete}
				title="Are you want to mark as complete this project?"
				/>
			<div className="details-projects">
				<h3>Project Details</h3>
			</div>
				<div className="row">
					<div className="col-lg-8">
						<div 
						className="detail-box"
						style={{
							boxShadow:'0px 0px 2px grey',
							padding:20,
							borderRadius:3,
							height:550,
						}}>
							<div className="d-flex" style={{justifyContent:'space-between',alignItems:'flex-start'}}>
								<div>
								<p className="h3" style={{color:'#5055be',textTransform:'capitalize',margin:0}}>{name}</p>
								<p className="h5" style={{margin:0,marginBottom:5,color:'green'}}>${price}</p>
								</div>
								<div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
								<p style={{margin:0}}>{formatDate(new Date(created_at))}</p>
								{domain?<p style={{margin:0}}>{domain}</p>:null}
								</div>
							</div>
							<div>
								<p style={{textAlign:'justify',color:'grey',height:280,overflow:'scroll',paddingRight:10}}>
								{description}
								</p>
							</div>
							<div>
								<div className="row gx-5" style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
									<div 
									className="col-lg-4" style={{padding:5}}>
										<div style={{
										backgroundColor:'#f0f0f0',
										display:'flex',
										flexDirection:'column',
										justifyContent:'center',
										alignItems:'center',
										borderRadius:4
									}}>
										<p 
										style={{
											backgroundColor:'#8a8ee3',
											width:'100%',
											color:'white',
											textAlign:'center',
											borderTopLeftRadius:4,
											borderTopRightRadius:4,
											margin:0,
											paddingTop:5,
											paddingBottom:5
											}}>Asigned To</p>
											{_user?.first_name?(
												<div style={{
													padding:5,
													display:'flex',
													flexDirection:'column',
													justifyContent:'center',
													alignItems:'center',
													height:100
												}}>
														<img 
													style={{
														width:40,
														height:40,
														borderRadius:20
													}}
													src={api+_user?.image}
													/>
													<p style={{margin:0,fontSize:12,marginTop:2}}>{_user.first_name+" "+ _user.last_name}</p>
													<p style={{margin:0,fontSize:12,marginTop:2}}>{_user.number}</p>
												</div>
											):(
												<p style={{color:'red'}}>delete user</p>
											)}
										</div>
									</div>
									<div 
									className="col-lg-3" style={{padding:5}}>
										<div 									
										style={{
										backgroundColor:'#f0f0f0',
										display:'flex',
										flexDirection:'column',
										justifyContent:'center',
										alignItems:'center',
										borderRadius:4
									}}>
										<p style={{
											backgroundColor:'#8a8ee3',
											width:'100%',
											color:'white',
											textAlign:'center',
											borderTopLeftRadius:4,
											borderTopRightRadius:4,
											margin:0,
											paddingTop:5,
											paddingBottom:5
											}}>Status</p>
										<div style={{
											padding:5,
											display:'flex',
											flexDirection:'column',
											justifyContent:'center',
											alignItems:'center',
											height:100
										}}>
											<p style={{margin:0,fontSize:20,color:status=="1"?"#F5AF3C":"green"}}>{status==1?"In Process":"Complete"}</p>
										</div>
									</div>
										</div>
									<div 
									className="col-lg-5"
									style={{padding:5}}
									>
										<div 									
										style={{
										backgroundColor:'#f0f0f0',
										display:'flex',
										flexDirection:'column',
										justifyContent:'center',
										alignItems:'center',
										borderRadius:4
									}}>
										<p 
										style={{
											backgroundColor:'#8a8ee3',
											width:'100%',
											color:'white',
											textAlign:'center',
											borderTopLeftRadius:4,
											borderTopRightRadius:4,
											margin:0,
											paddingTop:5,
											paddingBottom:5
											}}>Payment Details</p>
										<div style={{
											padding:5,
											display:'flex',
											flexDirection:'column',
											justifyContent:'center',
											height:100
										}}>
											<p style={{margin:0,fontSize:14}}>Remaining Payments: ${projectDetail.price-(projectDetail.paidPrice?projectDetail.paidPrice:0)}</p>
											<p style={{margin:0,fontSize:14}}>Installment Type: {getInstallmentType(projectDetail.installmentType)}</p> 
											<p style={{margin:0,fontSize:14}}>No. of Installment: {projectDetail.noOfInstallments}</p> 
										</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4 scrollchange mt-mine-small" style={{
						boxShadow:'0px 0px 2px grey',
						padding:20,
						borderRadius:3,
						height:550,
						overflow:'scroll'
					}}>
						<div style={{
							backgroundColor:'#5055be',
							height:40,
							display:'flex',
							justifyContent:'space-around',
							alignItems:'center'
							}}>
						<p style={{
							color:'white',
							margin:0
							}} className="h5">Associate Subscriptions</p>
						<IconButton
						color="primary" aria-label="upload picture" component="span"
						onClick={()=>setDelModal(true)}
						>
						<BiPlus
						size={30}
						color="white"
						/>
						</IconButton>
						</div>
					<div className={classes.root}>
						{renderAsSub()}
						</div>
					</div>
				</div>
				<div
				className="res-z"
				style={{marginTop:10,width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}
				>
					<div 
					style={{width:'45%',padding:20}}>
						{projectDetail.price-projectDetail.paidPrice==0?(
							<button 
							disabled
							type="button" class="btn btn-secondary" style={{width:'99%'}}>Paid</button>
						):(
							<button 
							onClick={()=>{
								if(projectDetail._user?.customerPaymentProfileId || projectDetail._user?.bankId){
									setPayModal(true)
								}else{
									toast.error('user not add bank acount or card')
								}
							}}
						type="button" class="btn btn-success" style={{width:'99%'}}>Pay Now</button>
						)}
					</div>
					<div 
					style={{width:'45%',padding:"padding: 1rem 2rem"}}>
						{projectDetail.status && role!=2?(
							<button 
							onClick={()=>setMarkModal(true)}
							type="button" class="btn btn-primary" style={{width:'99%'}}>Mark as Complete</button>
						):null}
					</div>
				</div>
			<div className="comments-project-details" style={{paddingBottom:100}}>
			<h3>Notes</h3>
				<div 
				style={{
					width:'100%',
					paddingLeft:15,
					position:'fixed',
					bottom:0,
					left:0,
					display:'flex',
					justifyContent:'center',
					alignItems:'center',
					marginLeft:'10%'
				}}
				class="form-group">
					<form
					onSubmit={(e)=>{
						e.preventDefault()
						onSendComment()
					}}
					style={{width:'66%'}}
					>
					<input 
					value={text}
					onChange={e=>setText(e.target.value)}
					style={{height:55,width:'100%',borderTopRightRadius:0,borderBottomRightRadius:0,borderColor:submit && !text?"red":""}}
					class="form-control" 
					aria-describedby="emailHelp" 
					placeholder="Enter note"/>
					</form>
                        <button 
						onClick={onSendComment}
                        type="button" class="btn btn-primary" 
						style={{height:55,borderTopLeftRadius:0,borderBottomLeftRadius:0,width:'10%',backgroundColor:"#5055be",borderColor:"#5055be"}}>
                            <i class="fas fa-send"></i>
                        </button>
				</div>
				{renderComments()}
			</div>
		<ToastContainer/>
		</main>
        </>
    )}
}

function mapStateToProps({projectDetail,user}){
	return {projectDetail,userId:user._id,role:user.role_id}
}
export default connect(mapStateToProps,actions)(ProjectDetail);