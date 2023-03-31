import React, { useState, useEffect } from "react";
import CastVote from "./CastVote";
import SuccessVote from "./SuccessVote";
import axios from "axios";

const Vote = () => {
  const userId = localStorage.getItem("userId");
  const [isCastVote, setCastVoteStatus] = useState(false);
  const [selectedVoterId, setSelectedVoterId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    initialiseVote();
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

  const castVote = () => {
    initialiseVote();
  };

  if (isLoading) return <div>Loading</div>;

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
