import React, { useEffect, useState } from 'react';
import Skeleton from '../../reUsableComponent/skeleton';
import Table  from "./table";
import DateFnsUtils from '@date-io/date-fns';
import formatDate from '../../utils/formatDate';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import * as actions from "../../store/actions"
import {connect} from "react-redux"

function Invoices({getInvoice,invoices,getInvoiceBySearch,getInvoiceByDate,id,role}) {

	const [loading,setLoading]=useState(true)
	const [search,setSearch]=useState(false)
	const [text, setText] = useState("")
    const [submit,setSubmit]=useState(false)
    const [date,setDate]=useState(null)

	useEffect(()=>{
		getInvoice(1,id,role).then(()=>{
			setLoading(false)
		})
	},[])

	function onSearchTransaction(){
        setSubmit(true)
        if(text.length>0){
            setLoading(true)
            getInvoiceBySearch(text,1,id,role).then(()=>{
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
            getInvoiceByDate(formatDate(event),1,id,role).then(()=>{
                setSearch(1)
                setLoading(false)
            })
        }
      };
      function onClear(){
        getInvoice(1,id,role)
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
                <form onSubmit={onSearchTransaction}>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-8 col-md-6" style={{padding:0}}>
                        <div class="input-group">
                            <div class="form-outline" style={{width:'85%'}}>
                                <input 
                                value={text}
                                placeholder="Enter project or user name"
                                onChange={(e)=>{
                                    if(e.target.value==""){
                                        getInvoice(1,id,role)
                                    }
                                    setText(e.target.value)
                                }}
                                type="search" id="form1" class="form-control" 
                                style={{borderTopRightRadius:0,borderBottomRightRadius:0,height:55}} />
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
                                    value={date}
                                    emptyLabel="Select"
                                    disableFuture={true}
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
				<div style={{marginTop:20,display:'flex',justifyContent:"space-between"}}>
				{invoices.docs?.length>0?(
					<Table
					header={
						{
							c1:{
								key:"invoiceNo",
								title:"Invoice No"
							},
							c2:{
								key:"amount",
								title:"Amount"
							},
							c3:{
								key:"project",
								title:"Project Name"
							},
							c4:{
								key:"user",
								title:"User"
							},
							c5:{
								key:"date",
								title:"Date"
							}
						}
					}
					reload={search?(search==1?(page)=>getInvoiceByDate(formatDate(date),page,id,role):(page)=>getInvoiceBySearch(text,page,id,role)):((page)=>getInvoice(page,id,role))}
					data={invoices}
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

function mapStateProps({invoices,user}){
	return{invoices,id:user._id,role:user.role_id}
}

export default connect(mapStateProps,actions)(Invoices);