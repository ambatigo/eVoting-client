import React from "react";
import navya from "../../assets/navya.jpeg";
import himavanth from "../../assets/himavanth.jpeg";
import rahul from "../../assets/rahul.jpeg";
import adminBuilding from "../../assets/admin.jpg";
import matterJson from "../../matter.json";

const Summary = ({ summaryDetails }) => {
  const { totalVotes, votes } = summaryDetails;

  function fetchVoteCount(id) {
    if (votes) {
      for (const vote of votes)
        if (vote.voterId === id) return vote.votingCount;
      return 0;
    }
  }

  function fetchMatterImage(name) {
    let myimg = undefined;
    switch (name) {
      case "navya":
        myimg = navya;
        break;
      case "himavanth":
        myimg = himavanth;
        break;
      case "rahul":
        myimg = rahul;
        break;
      default:
        myimg = navya;
    }
    return myimg;
  }

  return (
    <div style={{ backgroundImage: `url(${adminBuilding})` }}>
      <h1 className="pt-3 mb-4" style={{ color: "#ffffff", fontWeight: 600 }}>
        Summary
      </h1>
      <div className="row">
        {matterJson.map((matter) => (
          <div className="col-6 offset-3" key={matter.id}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={fetchMatterImage(matter.name)}
                    className="img-fluid rounded-start"
                    alt={matter.name}
                  />
                </div>
                <div className="col-md-8 text-start">
                  <div className="card-body">
                    <h3 className="card-title mb-3">{matter.fullName}</h3>
                    <i
                      className="card-text mb-5"
                      style={{ color: "lightslategrey" }}
                    >
                      {matter.summary}
                    </i>
                    <h3 className="card-text mt-5">
                      Vote Count :{" "}
                      <span style={{ color: "green" }}>
                        {fetchVoteCount(matter.id)}
                      </span>{" "}
                      /<span style={{ color: "grey" }}>{totalVotes}</span>{" "}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
