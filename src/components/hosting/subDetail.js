import React, { useEffect, useState, useMemo } from "react";
import arrowImage from "../../assets/arrow-left-purple.png"
import { useParams, Link } from "react-router-dom"
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Skeleton from '../../reUsableComponent/skeleton';
import { CgArrowRightO } from "react-icons/cg"
import formatDate from "../../utils/formatDate";
import { api } from "../../config/config..json"
import getCycleDura from "../../utils/getCyleDura";
import SubscribeModal from "../../reUsableComponent/subscribeModel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubsDetail({ getSubscribtion, subscribetion, subscribePackage, cancelSubsPak, subTran, getSubTransaction,clearTransactions }) {
    
    const [loading, setLoading] = useState(true)
    const [subModal, setSubModal] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        clearTransactions()
        getSubscribtion(id,(subId)=>getSubTransaction(subId)).then(() => {
            setLoading(false)
        })
    }, [])
    
    function renderList() {
        return subscribetion.services.map((item) => {
            return <li key={item._id} class="list-group-item"> <CgArrowRightO style={{ marginRight: 10 }} size={17} color='#5055be' />{item.name}</li>
        })
    }
    function onSubscribe() {
        const data = {
            customerProfileId: subscribetion.userInfo.customerProfileId,
            customerPaymentProfileId: subscribetion.userInfo.customerPaymentProfileId,
            amount: subscribetion.price,
            interval: subscribetion.interval,
            date: formatDate(new Date()),
            cycle: subscribetion.cycle,
            name: subscribetion.name,
            id: subscribetion._id,
            priceId:subscribetion.priceId
        }
        subscribePackage(data).then((res) => {
            if (res.status) {
                getSubscribtion(id,getSubTransaction)
                toast.success("Successfully subscribe")
            } else {
                toast.error(res.msg)
            }
        })
    }
    function renderStatus() {

        if (subscribetion.subscribe==false) {
            return null
        }
        else if (subscribetion.subscribe?.subscriptionId) {
            return (
                <button
                    onClick={() => {
                        cancelSubsPak({
                            subscriptionId: subscribetion.subscribe.subscriptionId,
                            id: subscribetion._id
                        }).then((res) => {
                            if (res.status) {
                                getSubscribtion(id)
                                toast.success("Successfully unsubscribe")
                            } else {
                                toast.error(res.msg)
                            }
                        })
                    }}
                    style={{ width: '70%' }}
                    type="button" class="btn btn-danger"
                >
                    Click here to unsubscribe
                </button>
            )
        } else {
            return (
                <button
                    onClick={() => {
                        if (subscribetion.userInfo.customerProfileId) {
                            setSubModal(true)
                        } else {
                            toast.error('User not added card')
                        }
                    }}
                    style={{ width: '70%' }}
                    type="button" class="btn btn-success"
                >
                    click here to subscribe
                </button>
            )
        }
    }
    if (loading) {
        return <Skeleton />
    } else {
        const {
            name,
            price,
            cycle,
            subscribe,
            created_at,
            userInfo
        } = subscribetion
        return (
            <>
                <header className="centering for-inner">
                    <div className="go-back">
                        <Link to="/head/hosting">
                            <p><span><img src={arrowImage} /></span> Back</p>
                        </Link>
                    </div>
                </header>
                <main>
                    <h1 style={{ marginTop: 0, marginBottom: 20 }}>Subscription Detail</h1>
                    <SubscribeModal
                        visible={subModal}
                        closeModal={() => setSubModal(false)}
                        action={onSubscribe}
                        title="Are you want to subscribe this package?"
                    />
                    <div class="card" style={{ width: "100%" }}>
                        <div class="card-body" style={{ backgroundColor: '#5055be' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 class="card-title" style={{ color: 'white' }}>{name}</h3>
                                <p style={{ color: 'white' }}>{formatDate(new Date(created_at))}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ color: 'white' }}>Cycle: {getCycleDura(cycle)}</p>
                                <p style={{ color: 'white', fontSize: 20 }}>Price: <b>${price}</b></p>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            {renderList()}
                        </ul>
                        <div
                            style={{ padding: 10 }}
                        >
                            <h5 style={{ margin: 5 }}>Assign To:</h5>
                            {userInfo?.first_name?(
                                <>
                                <div
                                style={{
                                    marginTop: 10,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    border: "1px solid lightgrey",
                                    borderRadius: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5
                                }}
                            >
                                <img
                                    style={{ width: 60, height: 60, borderRadius: 10 }}
                                    src={api + userInfo.image}
                                />
                                <p style={{ margin: 0 }}>Name: {userInfo.first_name + " " + userInfo.last_name}</p>
                                <p style={{ margin: 0 }}>Email: {userInfo.email}</p>
                                <p style={{ margin: 0 }}>Address: {userInfo.address}</p>
                                    <div
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}
                                >
                                </div>
                            </div>
                            </>
                            ):<p>user deleted</p>}
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',paddingRight:10,paddingLeft:10,paddingTop:10,paddingBottom:10}}>
                        <div style={{ display: 'flex', width: '30%' }}>
                                        <p style={{ margin: 0 }}>Subscribe:</p>
                                        <p style={{ margin: 0, color: subscribe ? 'green' : 'red', marginLeft: 10 }}>{subscribe ? 'Yes' : 'No'}</p>
                                    </div>
                        {renderStatus()}
                        </div>
                        </div>
                    {
                        subTran.length > 0 ? (
                            <div>
                                <h3 style={{ marginTop: 30, marginBottom: 30 }}>Transactions On This Subscription</h3>
                                <table class="table-responsive transaction-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Transaction Id</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subTran.map((item, i) => {
                                            return (
                                                <tr key={item.transId}>
                                                    <td scope="row">{item.number}</td>
                                                    <td>{item.customer_email}</td>
                                                    <td>{new Date(item.created*1000).toLocaleString()}</td>
                                                    <td>{item.amount_due}</td>
                                                    <td>
                                                    <a href={item.invoice_pdf} download target="_blank">
                                                        <button
                                                        type="button" class="btn btn-danger"
                                                        >
                                                        PDF
                                                        </button>
                                                    </a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : null
                    }
                    <ToastContainer />
                </main>
            </>
        );
    }
}

function mapStateToProps({ subscribetion, subTran }) {
    return { subscribetion, subTran }
}

export default connect(mapStateToProps, actions)(SubsDetail);