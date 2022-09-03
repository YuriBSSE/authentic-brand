import React, { Component, useState } from "react";
import dashboardSrc from "../assets/icon/dashboard.png";
import projectSrc from "../assets/icon/projects.png";
import clientsSrc from "../assets/icon/clients.png";
import invoicesSrc from "../assets/icon/invoices.png";
import billingSrc from "../assets/icon/billing.png";
import transactionSrc from "../assets/icon/transaction.png";
import hostingSrc from "../assets/icon/hosting.png";
import { NavLink, Link } from "react-router-dom";
import "../css/sb-admin-2.css";
import Logo from "../assets/img/logo.png";
import Dashboard from "../assets/img/dashboard.png";
import Campaigns from "../assets/img/campaigns.png";

import BuyMoreContent from "../assets/img/buy-more-content.png";
import CampaignsResult from "../assets/img/campaigns.png";
import Metrics from "../assets/img/metrics.png";
import CreatorSurvey from "../assets/img/creator-survey.png";
import Influencers from "../assets/img/influencers.png";
import Chats from "../assets/img/chats.png";
import Stats from "../assets/img/stats.png";

export default function SlideBar() {
  const role = localStorage.getItem("role");
  const [selected, setSelected] = useState("dashbaord");
  return (
    <div>
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a class="sidebar-brand d-flex align-items-center justify-content-center">
          <div class="sidebar-brand-text mx-3 side-logo">
            <img src={Logo} width="80%" />
          </div>
        </a>

        <li
          className={selected == "dashbaord" ? "nav-item active" : "nav-item"}
        >
          <Link
            class="nav-link"
            to="/"
            onClick={() => setSelected("dashbaord")}
            // isActive={(res) => (res ? setSelected("dashbaord") : null)}
          >
            <img src={Dashboard} />
            <span className="ml-2">Dashboard</span>
          </Link>
        </li>

        <li
          className={selected == "campaigns" ? "nav-item active" : "nav-item"}
        >
          <Link
            class="nav-link"
            to="/"
            onClick={() => setSelected("campaigns")}
          >
            <img src={Campaigns} />
            <span className="ml-2">Campaigns</span>
          </Link>
        </li>
        <li
          className={selected == "buyContent" ? "nav-item active" : "nav-item"}
        >
          <Link
            class="nav-link"
            to="/"
            onClick={() => setSelected("buyContent")}
          >
            <img src={BuyMoreContent} />
            <span className="ml-2">Buy More Content</span>
          </Link>
        </li>
        <li
          className={
            selected == "campaignResult" ? "nav-item active" : "nav-item"
          }
        >
          <Link
            class="nav-link"
            to="/"
            onClick={() => setSelected("campaignResult")}
          >
            <img src={CampaignsResult} />
            <span className="ml-2">Campaigns Result</span>
          </Link>
        </li>
        <li className={selected == "metrics" ? "nav-item active" : "nav-item"}>
          <Link class="nav-link" to="/" onClick={() => setSelected("metrics")}>
            <img src={Metrics} />
            <span className="ml-2">Metrics</span>
          </Link>
        </li>
        <li
          className={
            selected == "creatorSurvey" ? "nav-item active" : "nav-item"
          }
        >
          <Link class="nav-link" to="/" onClick={() => setSelected("creatorSurvey")}>
            <img src={CreatorSurvey} />
            <span className="ml-2">Creator's Survey</span>
          </Link>
        </li>
        <li
          className={selected == "influencers" ? "nav-item active" : "nav-item"}
        >
          <Link class="nav-link" to="/" onClick={() => setSelected("influencers")}>
            <img src={Influencers} />
            <span className="ml-2">Influencers</span>
          </Link>
        </li>
		<li
          className={selected == "chats" ? "nav-item active" : "nav-item"}
        >
           <Link class="nav-link" to="/" onClick={() => setSelected("chats")}>
            <img src={Chats} />
            <span className="ml-2">Chats</span>
			</Link>
        </li>
        <li  className={selected == "stats" ? "nav-item active" : "nav-item"}>
		<Link class="nav-link" to="/" onClick={() => setSelected("stats")}>
            <img src={Stats} />
            <span className="ml-2">Stats</span>
			</Link>
        </li>

        <div class="text-center d-none d-md-inline toggle-tab">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
    </div>
  );
}
