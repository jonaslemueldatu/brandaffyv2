import React from "react";
import { useNavigate } from "react-router-dom";

function GeneralAction(props) {
  const navigate = useNavigate();

  const handleBoxAdd = async (e) => {
    e.stopPropagation();
    props.SetPopup({
      action: "addBox",
      id: props.CustomData.id,
    });
  };
  return (
    <div>
      {props.CustomData.action === "influencerBox" && (
        <div className="flex">
          <button
            onClick={() => props.SetPopup(true)}
            className="ctm-btn ctm-btn-1"
          >
            Create Box{" "}
          </button>
        </div>
      )}
      {props.CustomData.action === "brandAffiliateProfile" && (
        <div className="flex">
          <button
            onClick={(e) => handleBoxAdd(e)}
            className="ctm-btn mx-2 ctm-btn-4"
          >
            Add to Box
          </button>
          <button className="ctm-btn ctm-btn-1">Invite</button>
        </div>
      )}
      {props.CustomData.action === "brandCampaigns" && (
        <div className="flex">
          <button onClick={() => navigate("create")} className="ctm-btn ctm-btn-1">Create Campaign</button>
        </div>
      )}
    </div>
  );
}

export default GeneralAction;
