import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastComponent from "../common/ToastComponent";
import sfbu from "../../assets/sfbu.jpeg";
import { fetchToken } from "../../utils/loginUtils";

const ForgotPassword = () => {
  const [user, setUser] = useState({
    userId: "",
    password: "",
    otp: "",
  });

  const [toast, setToast] = useState({
    showToasty: false,
    msg: "",
    color: "red",
  });

  const [generatingOTP, setGeneratingOTP] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = fetchToken();
    if (token != null) {
      navigate("/vote");
    }
  }, []);

  const onClickGenerateOTP = () => {
    sendForOTP();
  };

  const sendForOTP = async () => {
    setGeneratingOTP(true);
    try {
      const data = await axios.post(
        `https://e-voting-server-sfbu.herokuapp.com/generate-otp/${user.userId}`
      );
      if (data.status === 200) {
        setToast({
          showToasty: true,
          msg: data.data,
          color: "green",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingOTP(false);
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUser({ ...user, [name]: value });
  };

  const onHideToast = () => {
    setToast({
      showToasty: false,
      msg: "",
      color: "red",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post(
        "https://e-voting-server-sfbu.herokuapp.com/reset-otp",
        user
      );
      if (data.status === 200) {
        setToast({
          showToasty: true,
          msg: data.data,
          color: "green",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setToast({
        showToasty: true,
        msg: error.response.data,
        color: "red",
      });
    }
  };

  <img
    className="success-vote-stamp success-vote-img4"
    width={150}
    height={150}
    src={sfbu}
    alt={sfbu}
  />;

  return (
    <div className="row landing-row">
      <div className="col-6" style={{ marginTop: "100px" }}>
        <img
          width={300}
          src={sfbu}
          alt="evoting logo"
          className="signup-logo"
        />
      </div>
      <div className="col-6">
        <div className="formCenter mt-5">
          <form className="formFields" onSubmit={(e) => handleSubmit(e)}>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="userId">
                Student Id
              </label>
              <input
                type="text"
                id="userId"
                className="formFieldInput"
                placeholder="Enter your student Id"
                name="userId"
                value={user.userId}
                onChange={(e) => handleChange(e)}
                required
              />
              {!generatingOTP ? (
                <button
                  onClick={() => onClickGenerateOTP()}
                  className="btn btn-success btn-sm mb-3 mt-3"
                  disabled={user.userId === ""}
                >
                  Generate OTP
                </button>
              ) : (
                <button
                  className="btn btn-success btn-sm mb-3 mt-3"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Generating OTP...
                </button>
              )}
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="otp">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                className="formFieldInput"
                placeholder="Enter the otp"
                name="otp"
                value={user.otp}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your new password"
                name="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="formField">
              <button className="formFieldButton me-3">Reset Password</button>
              <Link to={"/"} style={{ marginLeft: "18px" }}>
                Cancel
              </Link>
            </div>
          </form>
          {toast.showToasty && (
            <ToastComponent
              color={toast.color}
              showToasty={toast.showToasty}
              msg={toast.msg}
              onHide={onHideToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
