import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ClipLoader from "react-spinners/ClipLoader";
import { WithContext as ReactTags } from 'react-tag-input';
import { useHistory } from "react-router-dom"
import validateEmail from '../utils/emailCheck';
import { connect } from 'react-redux';
import * as actions from "../store/actions"

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
}

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '60%',
        transform: 'translate(-35%, -50%)',
        borderRadius: 10,
        borderColor: '#5055be',
        padding: 0
    },
};

Modal.setAppElement(document.getElementById('root'));

function AsSub({ visible, closeModal, projectId,createAsSubs,reload ,asId,editAsSubs,data,userId}) {
    const history = useHistory()
    const [fields, setField] = useState({
        name: "",
        price: "",
        services: [],
        cycleType:"",
        client:"",
        interval:""
    })
    const [tags, setTags] = useState([])
    const [submit, setSubmit] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const getValue = (k, v) => setField({ ...fields, [k]: v })
    useEffect(()=>{
        if(data._id){
        setField({...data,cycleType:data.cycle})
        const dTags=data.services.map(item=>({id:item._id,text:item.name}))
        setTags(dTags)
        }
    },[data])

    function onSubmitData() {
        setSubmit(true)
        if (fields.name && fields.price && tags.length>0 && fields.cycleType) {
            setLoading(true)
            createAsSubs({...fields,services:tags,_project:projectId,_user:userId}).then(() => {
                setModal(true)
                setLoading(false)
                setSubmit(false)
                setField({
                    name:"",
                    price:"",
                    services:[],
                    cycleType:"",
                    client:"",

                })
                reload()
                closeModal()
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
        console.log(tag)
        setTags([...tags, tag])
    }
    function onEdit(){
        setLoading(true)
        if (fields.name && fields.price>0 && tags.length>0 && fields.cycleType) {
            editAsSubs({...fields,services:tags,id:asId}).then(()=>{
                setLoading(false)
                reload()
                closeModal()
            })
        }
    }
    return (
        <div>
            <Modal
                isOpen={visible}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                onAfterClose={()=>{
                    setSubmit(false)
                    setField({})
                    setTags([])
                }}
            >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ backgroundColor: '#5055be', width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p className="h5" style={{ backgroundColor: '#5055be', margin: 0, color: 'white' }}>{asId?"Edit Associate Subscribtion":"Create Associate Subscribtion"}</p>
                        </div>
                        <div className="projects-input w-100" style={{ margin: 20 }}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <input
                                        value={fields.name}
                                        maxLength={50}
                                        className={submit && !fields.name ? "inputError" : ""}
                                        onChange={e => getValue("name", e.target.value)}
                                        placeholder="Package Name" />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <input
                                        value={fields.price}
                                        type="number"
                                        max={1000000}
                                        className={submit && !fields.price ? "inputError" : ""}
                                        onChange={e => {
                                            if(e.target.value<=1000000){
                                                getValue("price",e.target.value)
                                            }
                                        }}
                                        placeholder="Price" />
                                </div>
                                <div className="col-lg-12 col-md-12">
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
                            </div>
                        </div>
                        <div style={{ width: '100%', margin: '20px 0px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <button
                                onClick={() => closeModal()}
                                type="button" className="btn btn-light" style={{ width: '40%' }}>
                                Cancel
                            </button>
                            <button
                                onClick={()=>{
                                    asId?onEdit():onSubmitData()
                                }}
                                type="button" className="btn btn-success" style={{ width: '40%' }}>
                                {loading ? (
                                    <ClipLoader size={25} color="white" />
                                ) : (
                                    asId?"Update":"Create"
                                )}
                            </button>
                        </div>
                    </div>
            </Modal>
        </div>
    );
}
export default connect(null,actions)(AsSub)