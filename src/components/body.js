import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
// import { Route,Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Main from "./main";
import SlideBar from "./SideBar";
// import * as actions from "../store/actions"

function Body(
  {
    // user,setUser
  }
) {
  // useEffect(()=>{
  //     const existUser=localStorage.getItem('id')
  //     if(existUser){
  //         const role=localStorage.getItem('role')
  //         setUser(existUser,role)
  //     }
  // },[])

  if (true) {
    return (
      <div id="wrapper">
        <SlideBar />
        <Main />
      </div>
    );
  } else {
    return (
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(null, null)(Body);
