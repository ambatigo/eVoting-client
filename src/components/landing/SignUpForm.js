import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastComponent from "../common/ToastComponent";
import sfbu from "../../assets/sfbu.jpeg";

const SignUpForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    userId: "",
  });

  const [error, setError] = useState({
    userIdError: false,
    emailError: false,
  });

  const [toast, setToast] = useState({
    showToasty: false,
    msg: "",
    color: "red",
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = fetchToken();
  //   if (token != null) {
  //     navigate("/vote");
  //   }
  // }, []);

  const handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.userId.length !== 5) {
      setError({ ...error, userIdError: true });
      return;
    } else {
      setError({ ...error, userIdError: false });
    }
    if (!user.email.includes("@student.sfbu.edu")) {
      setError({ ...error, emailError: true });
      return;
    } else {
      setError({ ...error, emailError: false });
    }
    try {
      const data = await axios.post(
        "https://e-voting-server-sfbu.herokuapp.com/signUp",
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

  const onHideToast = () => {
    setToast({
      showToasty: false,
      msg: "",
      color: "red",
    });
  };

  return (
    <div className="row landing-row">
      <div className="col-6" style={{ marginTop: "100px" }}>
        <img
          width={400}
          src={sfbu}
          alt="evoting logo"
          className="signup-logo"
        />
      </div>
      <div className="col-6">
        <div className="formCenter mt-4">
          <form onSubmit={(e) => handleSubmit(e)} className="formFields">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Enter your full name"
                name="name"
                value={user.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
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
              {error && error.userIdError && (
                <small style={{ color: "red" }}>
                  Invalid studentId. Please enter a valid userId.
                </small>
              )}
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
              {error && error.emailError && (
                <small style={{ color: "red" }}>
                  Invalid email. Please enter a valid email.
                </small>
              )}
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="formField">
              <button className="formFieldButton me-3">Sign Up</button>

              <Link to={"/login"}>I'm already member</Link>
            </div>
          </form>
        </div>
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
  );
};

export default SignUpForm;
