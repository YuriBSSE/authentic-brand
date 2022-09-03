import React, { useEffect, useState } from 'react';
import Skeleton from '../../reUsableComponent/skeleton';
import {Link} from "react-router-dom"
import createClient from "../../assets/create-client.png"
import Table from "./subsTable"
import {connect} from "react-redux"
import DateFnsUtils from '@date-io/date-fns';
import formatDate from '../../utils/formatDate';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import * as actions from "../../store/actions"

function Hosting({subscribetions,getSubscribtions,searchSub,searchSubByDate,id,role}) {
	const [loading,setLoading]=useState(true)
    const [text, setText] = useState("")
    const [search,setSearch]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [date,setDate]=useState(null)

	useEffect(()=>{
		getSubscribtions(1,id,role).then(()=>setLoading(false))
	},[])

    function onSearchProject(){
        setSubmit(true)
        if(text.length>0){
            setLoading(true)
            searchSub(text,1,id,role).then(()=>{
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
        searchSubByDate(formatDate(event),1,id,role).then(()=>{
            setSearch(1)
            setLoading(false)
        })
        }
      };
      function onClear(){
        getSubscribtions(1,id,role)
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
                {role!=2?(
                    <Link to="/createPackage">
                        <div className="create-project">
                            <div className="icon-create-project">
                                <img src={createClient}/>
                            </div>
                            <div className="text-create-project">
                                <p>Create Package</p>
                            </div>
                        </div>
                    </Link>
                ):null}
                <form onSubmit={onSearchProject}>
                <div className="row" style={{paddingTop:20}}>
                    <div className="col-lg-8 col-md-6" style={{padding:0}}>
                        <div class="input-group">
                            <div class="form-outline" style={{width:'85%'}}>
                                <input 
                                value={text}
                                placeholder="Enter subscription or user name"
                                onChange={(e)=>{
                                    if(e.target.value==""){
                                        getSubscribtions(1,id,role)
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
                    <div  className="col-lg-3 col-md-6 reactDate" style={{padding:0,paddingLeft:30}}>
                        <button type="button" class="btn btn-primary" style={{width:'100%',backgroundColor:'lightgrey',borderColor:'lightgrey'}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                    value={date}
                                    margin="dense"
                                    emptyLabel="Select"
                                    disableFuture={true}
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
                            {subscribetions.docs.length > 0 ? (
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
                                                key: "subscribe",
                                                title: "Subscribe"
                                            },
											c4: {
                                                key: "cycle",
                                                title: "Cycle"
                                            }
                                        }
                                    }
                                    role={role}
                                    data={subscribetions}
                                    reload={search?(search==1?(page)=>searchSubByDate(formatDate(date),page,id,role):(page)=>searchSub(text,page,id,role)):((page)=>getSubscribtions(page,id,role))}
                                />
                            ) : (
                                <div style={{ margin: 40 }}>
                                    <h2>Not Found</h2>
                                </div>
                            )}
                </div>

				
			</main>
		);
	}
}

function mapStateToProps({subscribetions,user}){
	return {subscribetions,id:user._id,role:user.role_id}
}

export default connect(mapStateToProps,actions)(Hosting);