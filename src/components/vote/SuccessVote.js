import React from "react";
import navya from "../../assets/navya.jpeg";
import himavanth from "../../assets/himavanth.jpeg";
import rahul from "../../assets/rahul.jpeg";
import sfbu from "../../assets/sfbu.jpeg";
import matterJson from "../../matter.json";
import adminBuilding from "../../assets/admin.jpg";

const SuccessVote = ({ selectedVoterId }) => {
  const matter = ((id) => {
    return matterJson.filter((matter) => matter.id === id)[0];
  })(selectedVoterId);

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
    <div style={{ backgroundImage: `url(${adminBuilding})`, height: "90vh" }}>
      <div className="pt-3 mb-4" id="glowing-txt">
        Thank you for casting your vote.
      </div>
      <div className="row mt-5">
        <div className="col-6 offset-3">
          <div className="card mb-3 success-vote-card">
            <div className="row g-0">
              <div className="col-md-4" style={{ position: "relative" }}>
                <i
                  className="fa fa-check fa-3x success-vote-img2"
                  aria-hidden="true"
                ></i>
                <img
                  src={fetchMatterImage(matter.name)}
                  className="img-fluid rounded-start"
                  alt={matter.name}
                  style={{ position: "relative" }}
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
                  <p className="card-text mt-2 text-end pe-4  ">
                    <img
                      className="success-vote-stamp "
                      width={100}
                      height={100}
                      src={sfbu}
                      alt={sfbu}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessVote;
