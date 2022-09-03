import React, { useEffect, useState } from 'react';
import Skeleton from '../../reUsableComponent/skeleton';
import createClient from "../../assets/create-client.png"
import {Link} from "react-router-dom"
import {api} from "../../config/config..json"
import * as actions from "../../store/actions"
import DateFnsUtils from '@date-io/date-fns';
import formatDate from '../../utils/formatDate';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { connect } from 'react-redux';
import Table from "./clientsTable"

function Clients({getClients,clients,searchClients,searchClientsByDate}) {

	const [loading,setLoading]=useState(true)
	const [search,setSearch]=useState(false)
	const [text, setText] = useState("")
    const [submit,setSubmit]=useState(false)
    const [date,setDate]=useState(null)
	useEffect(()=>{
		getClients(1).then(()=>{
			setLoading(false)
		})
	},[])

	function onSearchClient(){
        setSubmit(true)
        if(text.length>0){
            setLoading(true)
            searchClients(text,1).then(()=>{
                setSearch(2)
                setLoading(false)
            })
        }
    }

    const handleFilterChange = (event) => {
		if(event!="Invalid Date" && event!=null){
			setDate(event)
			setLoading(true)
			console.log(formatDate(event))
			searchClientsByDate(formatDate(event),1).then(()=>{
				setSearch(1)
				setLoading(false)
			})
		}
      };
	  function onClear(){
        getClients(1)
        setDate(null)
        setText("")
        setSubmit(false)
        setSearch(false)
    }
	if(loading){
		return <Skeleton/>
	}else{
		return (
			<main>
	
				<Link to="/createClient">
					<div className="create-project">
						<div className="icon-create-project">
							<img src={createClient}/>
						</div>
						<div className="text-create-project">
							<p>Create Client</p>
						</div>
					</div>
				</Link>
				<form onSubmit={onSearchClient}>
				<div className="row" style={{marginTop:20}}>
					<div className="col-lg-8 col-md-6" style={{padding:0}}>
						<div class="input-group">
							<div class="form-outline" style={{width:'85%'}}>
								<input 
								value={text}
								placeholder="Enter client name or organization"
								onChange={(e)=>{
									if(e.target.value==""){
										setSubmit(false)
										getClients(1)
									}
									setText(e.target.value)
								}}
								type="search" id="form1" class="form-control" 
								style={{borderTopRightRadius:0,borderBottomRightRadius:0,height:55,borderColor:submit && !text?"red":""}} />
							</div>
							<button 
							type="submit" class="btn btn-primary" style={{borderTopLeftRadius:0,borderBottomLeftRadius:0,width:'15%',backgroundColor:"#5055be",borderColor:"#5055be"}}>
								<i class="fas fa-search"></i>
							</button>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 reactDate" style={{padding:0,paddingLeft:30}}>
						<button type="button" class="btn btn-primary" style={{width:'100%',backgroundColor:'lightgrey',borderColor:'lightgrey'}}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
									emptyLabel="Select"
									disableFuture={true}
									value={date}
									margin="dense"
									format="MM/dd/yyyy"
									onChange={handleFilterChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
									/>
								</MuiPickersUtilsProvider>
						</button>
					</div>
					<div className="col-lg-1 col-md-6 reactDate" style={{padding:0,paddingLeft:10}}>
                        <button 
                        onClick={onClear}
                        type="button" class="btn btn-primary" style={{width:'100%',backgroundColor:'red',borderColor:'red',height:55,color:'white'}}>
                            Clear
                        </button>
                    </div>
				</div>
				</form>
                <div className="table-responsive projects-table" style={{marginTop:0}}>
				{ typeof clients.docs[0]==="object"?(
					<Table
					header={
						{
							c1:{
								key:"orgName",
								title:"Organization Name"
							},
							c2:{
								key:"name",
								title:"Name"
							},
							c3:{
								key:"noOfProjects",
								title:"Projects"
							},
							c4:{
								key:"noOfPackages",
								title:"Packages"
							},
							c5:{
								key:"status",
								title:"Status"
							}
						}
					}
					data={clients}
					reload={search?(search==1?(page)=>searchClientsByDate(formatDate(date),page):(page)=>searchClients(text,page)):getClients}
					/>
                            ):(
                                <div style={{margin:40}}>
                                    <h2>Not Found</h2>
                                </div>
                            )}
                </div>
				
			</main>
		);
	}
}

function mapStateToProps({clients}){
	return {clients}
}

export default connect(mapStateToProps,actions)(Clients);