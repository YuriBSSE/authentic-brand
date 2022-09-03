import React from "react";
import Header from "./header";
import Dashboard from "./dashboard/dashboard";
import { Redirect, Route, Routes } from "react-router-dom";
import './../css/sb-admin-2.css'
// import Projects from "./projects/projects";
// import Clients from "./manageClients/clients";
// import Invoices from "./invoices/invoices";
// import Hosting from "./hosting/hosting";
// import Billing from "./billing/billing";
// import CreateClient from "./manageClients/createClient";
// import ClientDetail from "./manageClients/clientDetails";
// import ProjectDetail from "./projects/projectDetail";
// import Profile from "./profile/profile";
// import CreateProject from "./projects/createProjects";
// import UpdateProject from "./projects/updateProject";
// import UpdateClient from "./manageClients/updateClient";
// import createPackages from "./hosting/createPackages";
// import SubsDetail from "./hosting/subDetail";
// import EditSub from "./hosting/editSub";
// import InvoiceDetail from "./invoices/invoiceDetail";
// import AsSubDetail from "./projects/asSubDetail";

function Main() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      {/* <Header /> */}
       <Routes>
        <Route path="/" element={<Header />} />
        {/* <Route exact path="/" element={<Dashboard />} /> */}
        {/* <Route path="/head/projects" element={<Dashboard />} />
        <Route path="/head/manageClients" element={<Dashboard />} />
        <Route path="/head/invoices" element={<Dashboard />} />
        <Route path="/head/profile" element={<Dashboard />} />
        <Route path="/head/hosting" element={<Dashboard />} />
        <Route path="/head/billing" element={<Dashboard />} />
        <Route path="/createClient" element={<Dashboard />} />
        <Route path="/clientDetails/:id" element={<Dashboard />} />
        <Route path="/projectDetail/:id" element={<Dashboard />} />
        <Route path="/asSubDetail/:id" element={<Dashboard />} />
        <Route path="/creatProject" element={<Dashboard />} />
        <Route path="/updateProject/:id" element={<Dashboard />} />
        <Route path="/updateClient/:id" element={<Dashboard />} />
        <Route path="/createPackage" element={<Dashboard />} />
        <Route path="/subsDetail/:id" element={<Dashboard />} />
        <Route path="/invoiceDetail/:id" element={<Dashboard />} />
        <Route path="/editSubs/:id" element={<Dashboard />} /> */}
      </Routes> 
    </div>
  );
}

export default Main;
