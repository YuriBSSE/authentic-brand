import React, { useEffect, useMemo, useState,useCallback } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
	usePlaidLink,
	PlaidLinkOptions,
	PlaidLinkOnSuccess,
  } from "react-plaid-link";
import Skeleton from '../../reUsableComponent/skeleton';
import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import {api} from "../../config/config..json"
import SuccessModal from "../../reUsableComponent/successModel";
import ClipLoader from "react-spinners/ClipLoader";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Profile({getProfile,profile,id,updateProfile,addBankAccount}){
	const [loading,setLoading]=useState(true)
	const [btnLoading,setBtnLoading]=useState(false)
	const [cardLoader,setCardLoader]=useState(false)
	const [submit,setSubmit]=useState(false)
	const [modal,setModal]=useState(false)
	const [client,setClient]=useState(false)
	const [token, setToken] = useState(null);
	const [fields,setFields]=useState({
		_id: "",
		address: "",
		created_at: "",
		email: "",
		first_name: "",
		image: "",
		last_name: "",
		number: "",
		role_id: "",
		updated_at: "",
		organization:"",
		token:""
	})
	const getValue=(k,v)=>setFields({...fields,[k]:v})
	const profilSetMemo=useMemo(()=>{
		if(profile._id){
			setFields(profile)
			createLinkToken(profile._id,profile.first_name+" "+profile.last_name)
		}
	},[profile])
	async function createLinkToken(id,name) {
		const res=await axios.post(`${api}/api/getLinkToken`,{
			userId:id,
			name:name
		})
		console.log(res.data.data.linkToken)
		setToken(res.data.data.linkToken);
	  }

	useEffect(()=>{
		const role=localStorage.getItem('role')
		if(role==2){
			setClient(true)
			setLoading(false)
		}else{
			setLoading(false)
		}
	},[])

	function onUpdateProfile(){
		setSubmit(true)
		if(fields.first_name && fields.organization && fields.number && fields.address && fields.first_name){
			setBtnLoading(true)
			updateProfile({...fields,editOnly:true}).then((res)=>{
				if(res.status){
					getProfile(id)
					setModal(true)
					setBtnLoading(false)
					setSubmit(false)
				}else{
					setBtnLoading(false)
					toast.error(res.msg)
				}
			})
		}
	}
	const stripePromise = loadStripe('pk_live_51HdnA0CzoXTs4pdT6R2KUvDdSpvxfujbDohvhpwUsHLI7pAXSHLL2peNdRAAlPrzqUmXFmUoikoAq5mTWL2WRApP00O2Ok9l1Q');
	
	const CheckoutForm = () => {
			const stripe = useStripe();
			const elements = useElements();
		  
			const handleSubmit = async () => {
			  // Block native form submission.
		  
			  if (!stripe || !elements) {
				// Stripe.js has not loaded yet. Make sure to disable
				// form submission until Stripe.js has loaded.
				return;
			  }
		  
			  // Get a reference to a mounted CardElement. Elements knows how
			  // to find your CardElement because there can only ever be one of
			  // each type of element.
			  const cardElement = elements.getElement(CardElement);
		  
			  // Use your card Element with other Stripe.js APIs

			  const result = await stripe.createToken(cardElement);
			  setSubmit(true)
			  if (result.error) {
				console.log('[error]', result.error);
			  } else {
				console.log('[PaymentMethod]', result.token.id);
				
				if(fields.first_name && fields.organization && fields.number && fields.address && fields.first_name){
					setCardLoader(true)
					updateProfile({...fields,token:result.token.id}).then((res)=>{
						if(res.status){
							getProfile(id)
							setSubmit(false)
							setCardLoader(false)
							toast.success('Add card  and update profile successfully')
						}else{
							setCardLoader(false)
							toast.error(res.msg)
						}
					})
				}
			  }
			};

		return (
		  <>
		  <h4>Card</h4>
			<div style={{marginTop:20,marginBottom:20}}>
			<CardElement hidePostalCode={true}/>
			</div>
			<button 
			disabled={!stripe}
			onClick={handleSubmit} 
			className="regular-btn w-25">
			{cardLoader?(
			<ClipLoader size={25} color="white"/>
			):(profile.customerPaymentProfileId?"Update card":"Add a card")}
			</button>
		  </>
		);
	  };

	  const PlaidLink = ({ token }) => {
		const onSuccess = useCallback(
		  (public_token, metadata) => {
			addBankAccount({
				id:profile._id,
				customerProfileId:profile.customerProfileId,
				token:public_token,
				bankId:profile.bankId?profile.bankId:false
			}).then((res)=>{
				if(res.status){
					toast.success(res.msg)
					getProfile(id)
				}else{
					toast.error(res.msg)
				}
			})
		  },
		  []
		);
	  
		const config= {
		  token,
		  onSuccess,
		  // onExit
		  // onEvent
		};
	  
		const { open, ready, error } = usePlaidLink(config);
	  
		return (
		  <button 
		  className="regular-btn w-25" 
		  onClick={() => {
			  open()
		  }} disabled={!ready}>
			{profile.bankId?"Update bank acount":"Connect a bank account"}
		  </button>
		);
	  };
	function renderClientDetails(){
		
		return(
			<>
				<div className="col-lg-12" style={{marginTop:20}}>
						<h3>Payment Information</h3>
					<div>
					<Elements stripe={stripePromise}>
						<div>
						<CheckoutForm
						/>
						<p style={{width:'25%',textAlign:'center'}}>Or</p>
						{token === null ? (
							<div className="loader"></div>
						) : (
							<PlaidLink token={token} />
						)}
						</div>
					</Elements>
					</div>
				</div>
			</>
		)
	}

	if(loading){
		return <Skeleton/>
	}else{
		return(
			<main>
				<SuccessModal
				title="Update successfully"
				visible={modal}
				closeModal={()=>setModal(false)}
				/>
				<section>
					<div className="settings-head">
						
						<div>
							<div className="row">
								<div className="col-lg-12">
									<h3>Finish setting up your account</h3>
								</div>
								<div className="col-lg-8 col-md-7">
									<div className="setting-details-inputs">
										<input 
										maxLength={50}
										value={fields.organization}
										onChange={e=>getValue("organization",e.target.value)}
										className={submit && !fields.organization?"inputError":""}
										type="" 
										name="" 
										placeholder="Orginaztion Name"/>
										<input 
										maxLength={70}
										value={fields.address}
										onChange={e=>getValue("address",e.target.value)}
										className={submit && !fields.address?"inputError":""}
										type="" 
										name="" 
										placeholder="address"/>
										<input 
										value={fields.email}
										disabled
										className={submit && !fields.email?"inputError":""}
										type="" 
										name="" 
										placeholder="Email"/>
										<input 
										value={fields.first_name}
										maxLength={30}
										onChange={e=>getValue("first_name",e.target.value)}
										className={submit && !fields.first_name?"inputError":""}
										type="" 
										name="" 
										placeholder="First Name"/>
										<input 
										value={fields.last_name}
										maxLength={30}
										onChange={e=>getValue("last_name",e.target.value)}
										className={submit && !fields.last_name?"inputError":""}
										type="" 
										name="" 
										placeholder="Last Name"/>
										<div
										className={submit && !fields.number?"inputError":""}
										>
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
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-5">
									<div className="settings-profile-details-right">
										<div className="settings-profile-details-right-inner">
											<img src={fields.image.name?URL.createObjectURL(fields.image):api+fields.image}/>
											<h2>{fields.first_name+" "+fields.last_name}</h2>
											<div style={{
												border:"1px solid grey",
												borderStyle:'dashed',
												width:'80%',
												borderRadius:7,
												padding:10,
												marginLeft:'auto',
												marginRight:'auto'
												}}>
												<input
												onChange={(e)=>getValue("image",e.target.files[0])}
												type="file"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
	
				<section>
					<div className="payment-info">
						
						<div className="row">
						  <div className="col-lg-12">
							  <a href="#">
								  <button 
								  onClick={onUpdateProfile} 
								  className="regular-btn w-25">
								  {btnLoading?(
									<ClipLoader size={25} color="white"/>
									):"Update Info"}
									</button>
							  </a>
						  </div>
						  {client?renderClientDetails():null}
						</div>
					</div>
					<ToastContainer/>
				</section>
	
			</main>
		)
	}
}

function mapStateToProps({profile,user}){
	return {profile,id:user._id}
}

export default connect(mapStateToProps,actions)(Profile);