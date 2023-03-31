import React, { useState, useEffect } from "react";
import CastVote from "./CastVote";
import SuccessVote from "./SuccessVote";
import { fetchToken } from "../../utils/loginUtils";
import { useNavigate } from "react-router-dom";

const Vote = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = fetchToken();
  //   if (token == null) {
  //     navigate("/");
  //   }
  // }, []);

  const [isCastVote, setCastVoteStatus] = useState(true);
  return <div>{isCastVote ? <SuccessVote /> : <CastVote />}</div>;
};

export default Vote;
