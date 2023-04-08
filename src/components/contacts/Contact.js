import React, { useState, useEffect } from "react";
import GMap from "./GMap";
import gowtham from "../../assets/gowtham.jpeg";
import depali from "../../assets/depali.jpeg";
import rakesh from "../../assets/rakesh.jpeg";
import { fetchUserId } from "../../utils/loginUtils";
import ToastComponent from "../common/ToastComponent";
import axios from "axios";

const Contact = () => {
  const [query, setQuery] = useState({ myName: "", msg: "" });
  const [userId, setUserId] = useState("");
  const [toast, setToast] = useState({
    showToasty: false,
    msg: "",
    color: "red",
  });

  useEffect(() => {
    const userId = fetchUserId();
    setUserId(userId);
  }, []);

  const onChange = (e) => {
    const type = e.target.name;
    setQuery((query) => ({ ...query, [type]: e.target.value.trim() }));
  };

  const onClickSend = async (e) => {
    e.preventDefault();
    const req = { ...query, userId: userId };
    try {
      const data = await axios.post(
        "https://e-voting-server-sfbu.herokuapp.com/queryUs",
        req
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
    <div className="mb-5">
      <GMap />
      <div className="organizer my-4">
        <h2>Meet our Team members</h2>
        <div className="card-group mx-3">
          <div className="card">
            <img
              src={gowtham}
              className="card-img-top"
              alt={gowtham}
              height={450}
              style={{ padding: "20px", borderRadius: "50%" }}
            />
            <div className="card-body">
              <h5 className="card-title">Gowtham Ambati</h5>
              <p className="card-text">Project Manager</p>
              <p className="card-text">
                <small className="text-muted">
                  Responsible for managing the entire project.
                </small>
              </p>
            </div>
          </div>
          <div className="card">
            <img
              src={depali}
              className="card-img-top"
              alt={depali}
              height={450}
              style={{ padding: "20px", borderRadius: "50%" }}
            />
            <div className="card-body">
              <h5 className="card-title">Depali Gajera</h5>
              <p className="card-text">Developer</p>
              <p className="card-text">
                <small className="text-muted">
                  Passionate on development of the website.
                </small>
              </p>
            </div>
          </div>
          <div className="card">
            <img
              src={rakesh}
              className="card-img-top"
              alt={rakesh}
              height={450}
              style={{ padding: "20px", borderRadius: "50%" }}
            />
            <div className="card-body">
              <h5 className="card-title">Rakesh Kasha</h5>
              <p className="card-text">Lead Tester</p>
              <p className="card-text">
                <small className="text-muted">
                  Responsible for quality testing of the project.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="query my-5">
        <div className="row text-start">
          <div className="col-3 offset-3">
            <h4 className="mb-2">Find us in office</h4>
            <p>
              <i className="fa fa-briefcase me-2" aria-hidden="true"></i>161
              Mission Falls Lane, Fremont
            </p>
            <h4 className="mt-5 mb-2">Give us a ring</h4>
            <div>
              <i className="fa fa-user me-2" aria-hidden="true"></i>Gowtham
              Ambati
            </div>
            <div>
              <i className="fa fa-phone me-2" aria-hidden="true"></i>+40 712 345
              678{" "}
            </div>
            <div>
              <i className="fa fa-clock-o me-2" aria-hidden="true"></i>Mon -
              Fri, 8:00am - 6:00pm
            </div>
          </div>

          <div className="col-5 offset-1">
            <h4 className="">Send us message</h4>
            <form style={{ width: "70%" }} onSubmit={(e) => onClickSend(e)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  id="myName"
                  name="myName"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter your query"
                  onChange={(e) => onChange(e)}
                  id="msg"
                  name="msg"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success mb-3">
                Send
              </button>
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
    </div>
  );
};

export default Contact;
