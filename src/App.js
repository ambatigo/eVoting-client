import "./App.css";
import sfbu from "./assets/sfbu.png";
import SignInForm from "./components/landing/SignInForm";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import SignUpForm from "./components/landing/SignUpForm";
import Contact from "./components/contacts/Contact";
import Vote from "./components/vote/Vote";

function App() {
  return (
    <Router>
      <div className="App">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          style={{ padding: "10px" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand">
              <img
                src={sfbu}
                alt="sfbu"
                width={45}
                style={{ borderRadius: "10px", padding: "5px" }}
              />
            </a>

            <div
              className="collapse navbar-collapse d-flex"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item" style={{ padding: "0 15px" }}>
                  <a className="nav-link active" aria-current="page" href="#">
                    Vote
                  </a>
                </li>
                <li className="nav-item" style={{ padding: "0 15px" }}>
                  <a className="nav-link" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <SignInForm /> */}
        <SignUpForm />
        {/* <Contact /> */}
        {/* {<Vote />} */}
      </div>
    </Router>
  );
}

export default App;
