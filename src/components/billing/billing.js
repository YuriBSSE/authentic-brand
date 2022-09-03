import React, { useEffect, useState } from 'react';
import Skeleton from '../../reUsableComponent/skeleton';
import DateFnsUtils from '@date-io/date-fns';
import formatDate from '../../utils/formatDate';
import Table from "./table"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { connect } from "react-redux"
import * as actions from "../../store/actions"

function Billing({ getBills, bills, getBillsBySearch, getBillsByDate,sendMail }) {
    const [loading, setLoading] = useState(true)
    const [search,setSearch]=useState(false)
	const [text, setText] = useState("")
    const [submit,setSubmit]=useState(false)
    const [date,setDate]=useState(null)

    useEffect(() => {
        getBills(1).then(() => setLoading(false))
    }, [])
	function onSearchBills(){
        setSubmit(true)
        if(text.length>0){
            setLoading(true)
            getBillsBySearch(text,1).then(()=>{
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
            getBillsByDate(formatDate(event),1).then(()=>{
                setSearch(1)
                setLoading(false)
            })
        }
      };
      function onClear(){
        getBills(1)
        setDate(null)
        setText("")
        setSubmit(false)
        setSearch(false)
    }
    if (loading) {
        return <Skeleton />
    } else {
        return (
            <main>
                <form onSubmit={onSearchBills}>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-8 col-md-6" style={{padding:0}}>
                        <div class="input-group">
                            <div class="form-outline" style={{ width: '85%' }}>
                                <input
                                    value={text}
                                    placeholder="Enter bill or user name"
                                    onChange={(e) => {
                                        if(e.target.value==""){
                                            getBills(1)
                                        }
                                        setText(e.target.value)
                                    }}
                                    type="search" id="form1" class="form-control"
                                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, height: 55}} />
                            </div>
                            <button
                                type="submit" class="btn btn-primary" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: '15%', backgroundColor: "#5055be", borderColor: "#5055be" }}>
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 reactDate" style={{padding:0,paddingLeft:30}}>
                        <button type="button" class="btn btn-primary" style={{ width: '100%', backgroundColor: 'lightgrey', borderColor: 'lightgrey' }}>
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
                <div style={{ marginTop: 20, display: 'flex', justifyContent: "space-between" }}>
                    {bills.docs?.length > 0 ? (
                        <Table
                            header={
                                {
                                    c1: {
                                        key: "userName",
                                        title: "User Name"
                                    },
                                    c2: {
                                        key: "price",
                                        title: "Amount"
                                    },
                                    c3: {
                                        key: "remainingPrice",
                                        title: "Remaining Amount"
                                    },
                                    c4: {
                                        key: "name",
                                        title: "Name"
                                    }
                                }
                            }
                            reload={search ? (search == 1 ? (page) => getBillsByDate(formatDate(date), page) : (page) => getBillsBySearch(text, page)) : getBills}
                            data={bills}
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
function mapStateToProps({ bills }) {
    return { bills }
}
export default connect(mapStateToProps, actions)(Billing);