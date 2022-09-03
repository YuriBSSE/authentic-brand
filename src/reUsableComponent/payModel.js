import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function PayModal({ visible, closeModal,pay,reload,data}) {
    const history = useHistory()
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentMethod,setPaymentMethod]=useState("")

    function onSubmitData() {
        setSubmit(true)
        if(paymentMethod){
            setLoading(true)
            const sendData={
                id:data.projectId,
                price:parseFloat(data.price/data.noOfInstallments),
                customerProfileId:data.customerProfileId,
                _user:data._user,
                remainingPrice:data.remainingPrice
            }
            paymentMethod=="card"?sendData.customerPaymentProfileId=data.customerPaymentProfileId:sendData.bankId=data.bankId;
            pay(sendData).then(() => {
                toast.success("successfully paid")
                setLoading(false)
                setSubmit(false)
                reload()
                closeModal()
            }).catch(err => {
                setLoading(false)
                toast.error(err)
            })
        }
        
    }
    return (
        <div>
            <Modal
                isOpen={visible}
                onRequestClose={closeModal}
                style={customStyles}
                onAfterClose={()=>{
                    setSubmit(false)
                }}
                contentLabel="Example Modal"
            >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ backgroundColor: '#5055be', width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p className="h5" style={{ backgroundColor: '#5055be', margin: 0, color: 'white' }}>{"Payment"}</p>
                        </div>
                        <div className="projects-input w-100" style={{ margin: 20 }}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <p>Project Price</p>
                                    <input
                                    disabled
                                        value={data.price}
                                        placeholder="Package Name" />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <p>Remaining Price</p>
                                    <input
                                        disabled
                                        value={data.remainingPrice}
                                        type="number"
                                        placeholder="Price" />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <p>Paid Price</p>
                                    <input
                                        disabled
                                        value={(data.price/data.noOfInstallments)}
                                        type="number"
                                        placeholder="Price" />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <p>Payment Type</p>
                                    <select 
                                    style={{borderColor:submit && !paymentMethod?'red':null}}
                                    onChange={(v)=>setPaymentMethod(v.target.value)}>
                                        <option value="">Please Select</option>
                                        {data.customerPaymentProfileId?<option value="card">Card</option>:null}
                                        {data.bankId?<option value="bank">Bank Account</option>:null}
                                    </select>
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
                                    onSubmitData()
                                }}
                                type="button" className="btn btn-success" style={{ width: '40%' }}>
                                {loading ? (
                                    <ClipLoader size={25} color="white" />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </div>
            </Modal>
            <div>
            <ToastContainer/>
            </div>
        </div>
    );
}
export default connect(null,actions)(PayModal)