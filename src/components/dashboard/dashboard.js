import React, { useEffect, useState } from "react";
import Skeleton from "../../reUsableComponent/skeleton";
import { connect } from "react-redux";
// import * as actions from "../../store/actions"
import formatDate from "../../utils/formatDate";

function Dashboard({}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // getDashboard(id,role).then(()=>{
    // 	setLoading(false)
    // })
  }, []);
  if (loading) {
    return <Skeleton />;
  } else {
    // const {
    // 	users,
    // 	projects,
    // 	subs,
    // 	assSub
    // }=dashboard
    return (
      <main>
        <section className="sec1">
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="welcome-back">
                <h3 style={{ textTransform: "capitalize" }}>
                  <span>Welcome Back !</span>
                  <br /> {"Ahsan" + " " + "Muneer"}
                </h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 mt-auto">
              <div className="date">
                <p>
                  <i className="fa fa-calendar fa-fw"></i>
                  {formatDate(new Date())}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec2">
          <div className="row">
            <div className="col-lg-4 col-md-5 mx-auto my-3">
              <div className="cards card1">
                <div className="card-text-area">
                  {/* <h1>{role==2?assSub:users}</h1>
									<p>{role==2?'Total Associate Subscription':'Total Users'}</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 mx-auto my-3">
              <div className="cards card2">
                <div className="card-text-area">
                  {/* <h1>{projects}</h1> */}
                  <p>Total Projects</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 mx-auto my-3">
              <div className="cards card3">
                <div className="card-text-area">
                  {/* <h1>{subs}</h1> */}
                  <p>Total Subscriptions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

function mapStateToProps({ dashboard, profile, user }) {
  return { dashboard, profile, id: user._id, role: user.role_id };
}

export default connect(null, null)(Dashboard);
