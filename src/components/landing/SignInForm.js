import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastComponent from "../common/ToastComponent";
import sfbu from "../../assets/sfbu.jpeg";
import { fetchToken } from "../../utils/loginUtils";

const SignInForm = () => {
  const [user, setUser] = useState({
    userId: "",
    password: "",
  });

  const [toast, setToast] = useState({
    showToasty: false,
    msg: "",
    color: "red",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = fetchToken();
    if (token != null) {
      navigate("/vote");
    }
  }, []);

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
        "https://e-voting-server-sfbu.herokuapp.com/signIn",
        user
      );
      if (data.status === 200) {
        localStorage.setItem("token", data.data);
        localStorage.setItem("userId", user.userId);
        setToast({
          showToasty: true,
          msg: data.data,
          color: "green",
        });
        navigate("/vote");
      }
    } catch (error) {
      console.log(error.response.data);
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
                User Id
              </label>
              <input
                type="text"
                id="userId"
                className="formFieldInput"
                placeholder="Enter your user Id"
                name="userId"
                value={user.userId}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="formField">
              <button className="formFieldButton me-3">Sign In</button>
              <Link to={"/sign-up"}>Create an account</Link>
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

export default SignInForm;
