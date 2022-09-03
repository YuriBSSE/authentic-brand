import React, { useEffect, useState } from "react";
import arrowImage from "../../assets/arrow-left-purple.png"
import { useHistory } from "react-router-dom"
import validateEmail from '../../utils/emailCheck';
import SuccessModal from "../../reUsableComponent/successModel";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
}

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

function CreatePackage({ createSubs,getCLientList,clientList }) {
    const history = useHistory()
    const [fields, setField] = useState({
        name: "",
        price: "",
        services: [],
        cycleType:"",
        client:""
    })
    const [tags, setTags] = useState([])
    const [submit, setSubmit] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const getValue = (k, v) => setField({ ...fields, [k]: v })

    useEffect(()=>{
        getCLientList()
    },[])

    function onSubmitData() {
        setSubmit(true)
        if (fields.name && fields.price>0 && tags.length>0 && fields.cycleType && fields.client) {
            setLoading(true)
            createSubs({...fields,services:tags}).then(() => {
                setModal(true)
                setLoading(false)
                setSubmit(false)
                setField({
                    name:"",
                    price:"",
                    services:[],
                    cycleType:"",
                    client:""

                })
                setTags([])
            }).catch(err => {
                console.log(err)
            })
        }
    }


    function handleDelete(i) {
        const updatedTags = tags.filter((tag, index) => index !== i)
        setTags(updatedTags)
    }

    function handleAddition(tag) {
        setTags([...tags, tag])
    }

    function renderClientList(){
        return clientList.map((item)=>{
            return(
                <option key={item._id} value={item._id}>{item.first_name+" "+item.last_name}</option>
            )
        })
    }
    return (
        <>
            <SuccessModal
                title="create successfully"
                visible={modal}
                closeModal={() => {
                    setModal(false)
                    history.goBack()
                }
                }
            />
            <header className="centering for-inner">
                <div className="go-back" onClick={() => history.goBack()}>
                    <p><span><img src={arrowImage} /></span> Back</p>
                </div>
            </header>
            <main>

                <div className="projects-headings">
                    <h3>Create A Package</h3>
                </div>

                <div className="projects-input ">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <input
                                maxLength={50}
                                value={fields.name}
                                className={submit && !fields.name ? "inputError" : ""}
                                onChange={e => getValue("name", e.target.value)}
                                placeholder="Package Name" />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <input
                                value={fields.price}
                                type="number"
                                className={submit && fields.price<=0 ? "inputError" : ""}
                                onChange={e => {
                                    if(e.target.value<=100000000){
                                        getValue("price", e.target.value)
                                    }
                                }}
                                placeholder="Price" />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="select-options">
                                <select
                                    value={fields.client}
                                    className={submit && !fields.client ? "inputError" : ""}
                                    onChange={e => getValue("client", e.target.value)}>
                                    <option value="">Assign To Client</option>
                                    {renderClientList()}
                                </select>
                                <i className="fas fa-sort-down"></i>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="select-options">
                                <select
                                    value={fields.cycleType}
                                    className={submit && !fields.cycleType ? "inputError" : ""}
                                    onChange={e => getValue("cycleType", e.target.value)}>
                                    <option value="">Rotation Type</option>
                                    <option value={1}>Monthly</option>
                                    <option value={3}>Quarterly</option>
                                    <option value={6}>6 Month</option>
                                    <option value={12}>Yearly</option>
                                </select>
                                <i className="fas fa-sort-down"></i>
                            </div>
                        </div>
                        <div
                            className="col-lg-12 col-md-12">
                            <ReactTags tags={tags}
                                classNames={{
                                    tags: "tagsClass",
                                    tag: 'tagClass',
                                    remove: 'removeClass',
                                    tagInputField: submit && !tags.length > 0 ? "inputFieldClass" : ""
                                }}
                                placeholder="Press enter or comma to add services"
                                inputFieldPosition="top"
                                inline
                                allowDragDrop={false}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                delimiters={delimiters}
                            />
                        </div>
                        <div className="col-lg-12 text-left">
                            <button
                                onClick={onSubmitData}
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                className="btn-all btn-done">
                                {loading ? (
                                    <ClipLoader size={25} color="white" />
                                ) : "Done"}
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}

function mapStateToProps({clientList}){
    return {clientList}
}

export default connect(mapStateToProps, actions)(CreatePackage);