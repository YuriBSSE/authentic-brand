import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Skeleton from '../../reUsableComponent/skeleton';
import createProjectSrc from "../../assets/create-project.png"
import * as actions from "../../store/actions"
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import formatDate from '../../utils/formatDate';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Table from "./projectTable";

function Projects({ getProjects, projects, searchProjectByDate,searchProject,id ,role}) {

    const [loading, setLoading] = useState(true)
    const [delModal, setDelModal] = useState(false)
    const [text, setText] = useState("")
    const [search,setSearch]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [date,setDate]=useState(null)

    useEffect(() => {
        getProjects(1,id,role).then(() => {
            setLoading(false)
        })
    }, [])


    function onSearchProject(){
        setSubmit(true)
        if(text.length>0){
            setLoading(true)
            searchProject(text,1,id,role).then(()=>{
                setSearch(2)
                setLoading(false)
            })
        }
    }

    const handleFilterChange = (event) => {
        if(event!="Invalid Date" && event!=null){
            setDate(event)
            setLoading(true)
            searchProjectByDate(formatDate(event),1,id,role).then(()=>{
                setSearch(1)
                setLoading(false)
            })
        }
      };

    function onClear(){
        getProjects(1,id,role)
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
                <Link to="/creatProject">
                    <div className="create-project">
                        <div className="icon-create-project">
                            <img src={createProjectSrc} />
                        </div>
                        <div className="text-create-project">
                            <p>Create Project</p>
                        </div>
                    </div>
                </Link>
                <form onSubmit={onSearchProject}>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-lg-8 col-md-6" style={{padding:0}}>
                        <div class="input-group">
                            <div class="form-outline" style={{width:'85%'}}>
                                <input 
                                value={text}
                                placeholder="Enter project name"
                                onChange={(e)=>{
                                    if(e.target.value==""){
                                        getProjects(1,id,role)
                                        setSubmit(false)
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
                    <div className="col-lg-3 col-md-6 reactDate" style={{padding:0,paddingLeft:10}}>
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
                            {projects.docs?.length > 0 ? (
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
                                    role={role}
                                    data={projects}
                                    reload={search?(search==1?(page)=>searchProjectByDate(formatDate(date),page,id,role):(page)=>searchProject(text,page,id,role)):((page)=>getProjects(page,id,role))}
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

function mapStateToProps({ projects ,user}) {
    return { projects ,id:user._id,role:user.role_id}
}

export default connect(mapStateToProps, actions)(Projects);