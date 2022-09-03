import React, { useState } from "react";
import { connect } from "react-redux";
// import * as actions from "../../store/actions";
import ClipLoader from "react-spinners/ClipLoader";
import "../../css/sb-admin-2.css";
import Logo from "../../assets/img/logo.png";

function Login({}) {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [submit, setSubmit] = useState(false);
  let [loading, setLoading] = useState(false);

  const getValue = (k, v) => setFields({ ...fields, [k]: v });

  function onLogin(e) {
    e.preventDefault();
    setSubmit(true);
    if (fields.email && fields.password) {
      console.log(fields, "fields");
      setLoading(true);
      // login(fields).then(()=>setLoading(false))
    }
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <div className="text-center mb-4">
                          <img src={Logo} className="mb-4" width="80%" />
                        </div>
                        <h1 className="h4 text-gray-900 mb-4">Welcome to admin</h1>
                        <p>Enter your details to continue</p>
                      </div>
                      <form className="user mb-4">
                        <div className="form-group">
                          <input
                            type="email"
                            maxLength={50}
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            onChange={(e) => getValue("email", e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            onChange={(e) =>
                              getValue("password", e.target.value)
                            }
                            placeholder="******"
                          />
                        </div>

                        <button
                          className="btn btn-primary btn-user btn-block"
                          onSubmit={onLogin}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {loading ? (
                            <ClipLoader size={25} color="white" />
                          ) : (
                            "Login"
                          )}
                        </button>
                      </form>
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center mb-4">
                        <a className="small" href="register.html">
                          Create an Account!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(null, null)(Login);
