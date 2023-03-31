import "./App.css";
import SignInForm from "./components/landing/SignInForm";
import SignUpForm from "./components/landing/SignUpForm";
import Contact from "./components/contacts/Contact";
import Vote from "./components/vote/Vote";
import Nav from "./components/common/Nav";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/common/PageNotFound";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken } from "./utils/loginUtils";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const token = fetchToken();
    if (token !== null) {
      setloggedIn(true);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      {loggedIn && <Nav />}
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="login" element={<SignInForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="vote" element={<Vote />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
