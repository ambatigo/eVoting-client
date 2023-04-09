import React from "react";
import { useNavigate } from "react-router-dom";
import sfbu from "../../assets/sfbu.png";

const Nav = () => {
  const navigate = useNavigate();
  const onClickLogOut = () => {
    localStorage.clear("token");
    localStorage.clear("userId");
    navigate("/");
  };

  const onClickContactUs = () => {
    navigate("/contact");
  };

  const onClickVote = () => {
    navigate("/vote");
  };

  const onClickCompanyLogo = () => {
    window.location.replace("https://www.sfbu.edu/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ padding: "10px" }}
    >
      <div className="container-fluid">
        <div className="navbar-brand">
          <img
            src={sfbu}
            alt="sfbu"
            width={45}
            style={{ borderRadius: "10px", padding: "5px", cursor: "pointer" }}
            onClick={() => onClickCompanyLogo()}
          />
        </div>

        <div
          className="collapse navbar-collapse d-flex"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li
              className="nav-item"
              style={{ padding: "0 15px", color: "white", cursor: "pointer" }}
            >
              <span onClick={() => onClickVote()}>Vote</span>
            </li>
            <li
              className="nav-item"
              style={{ padding: "0 15px", color: "white", cursor: "pointer" }}
            >
              <span onClick={() => onClickContactUs()}>Contact Us</span>
            </li>
            <li
              className="nav-item"
              style={{ padding: "0 15px", color: "white", cursor: "pointer" }}
            >
              <span onClick={() => onClickLogOut()}>Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
