import React, { useState, useEffect } from "react";
import CastVote from "./CastVote";
import SuccessVote from "./SuccessVote";
import axios from "axios";
import Summary from "../summary/Summary";

const Vote = () => {
  const userId = localStorage.getItem("userId");
  const [isCastVote, setCastVoteStatus] = useState(false);
  const [selectedVoterId, setSelectedVoterId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [summaryDetails, setSummaryDetails] = useState({
    totalVotes: 0,
    votes: [],
  });

  useEffect(() => {
    setIsLoading(true);
    if (userId !== "admin") {
      initialiseVote();
    } else {
      initialiseSummary();
    }
  }, []);

  async function initialiseVote() {
    try {
      const response = await axios.get(
        `https://e-voting-server-sfbu.herokuapp.com/fetchVoteStatus/${userId}`
      );
      setIsLoading(false);
      if (response.status === 200) {
        setCastVoteStatus(true);
        setSelectedVoterId(response.data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  async function initialiseSummary() {
    try {
      const response = await axios.get(
        `https://e-voting-server-sfbu.herokuapp.com/fetchTotalVotes`
      );
      setIsLoading(false);
      if (response.status === 200) {
        setSummaryDetails(response.data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const castVote = () => {
    initialiseVote();
  };

  if (isLoading)
    return (
      <>
        <h2>Feching data...</h2>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );

  if (userId === "admin" && !isLoading)
    return <Summary summaryDetails={summaryDetails} />;

  return (
    <div>
      {isCastVote ? (
        <SuccessVote selectedVoterId={selectedVoterId} />
      ) : (
        <CastVote userId={userId} castVote={castVote} />
      )}
    </div>
  );
};

export default Vote;
