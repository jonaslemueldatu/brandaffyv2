// Props
// 1. SetPopup1 = Contains the toggle for the assigned SetPopup

import React from "react";
import { useNavigate } from "react-router-dom";

function GeneralAction(props) {
  const navigate = useNavigate();

  return (
    <div>
      {/* Brand affiliate profile page action button */}
      {props.CustomData.action === "Influencer Profile - Brand" && (
        <div className="flex">
          <button
            onClick={() => props.SetPopup1(true)}
            className="ctm-btn mx-2 ctm-btn-4"
          >
            Add to Box
          </button>
          <button className="ctm-btn ctm-btn-1">Invite</button>
        </div>
      )}
      {/* Brand inluencer box action button */}
      {props.CustomData.action === "Influencer Box - Brand" && (
        <div className="flex">
          <button
            onClick={() => props.SetPopup1(true)}
            className="ctm-btn ctm-btn-1"
          >
            Create Box{" "}
          </button>
        </div>
      )}
      {props.CustomData.action === "brandCampaigns" && (
        <div className="flex">
          <button
            onClick={() => navigate("create")}
            className="ctm-btn ctm-btn-1"
          >
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );
}

export default GeneralAction;
