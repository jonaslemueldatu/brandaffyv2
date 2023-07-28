// Props
// 1. SetPopup1 = Contains the toggle for the assigned SetPopup
// 2. CustomData = CustomData passed on from the parent component

import React from "react";
import { useNavigate } from "react-router-dom";

function ActionGeneral(props) {
  const navigate = useNavigate();

  return (
    <div>
      {/* Brand creator profile page action button */}
      {props.CustomData.action === "Creator Profile - Brand" && (
        <div className="flex">
          <button
            onClick={() => props.SetPopup1(true)}
            className="ctm-btn mx-2 ctm-btn-4"
          >
            Add to Box
          </button>
          <button
            className="ctm-btn ctm-btn-1"
            onClick={() => props.SetPopup2(true)}
          >
            Invite
          </button>
        </div>
      )}
      {/* Brand inluencer box action button */}
      {props.CustomData.action === "Creator Box - Brand" && (
        <div className="flex">
          <button
            onClick={() => props.SetPopup1(true)}
            className="ctm-btn ctm-btn-1"
          >
            Create Box{" "}
          </button>
        </div>
      )}
      {/* Brand Campaigns action button */}
      {props.CustomData.action === "Campaigns - Brand" && (
        <div className="flex">
          <button
            onClick={() => navigate("create")}
            className="ctm-btn ctm-btn-1"
          >
            Create Campaign
          </button>
        </div>
      )}

      {/* Campaign Details - Link Post */}
      {props.CustomData.action === "Campaign Details - Link Post" && (
        <div className="flex">
          <button
            className="ctm-btn ctm-btn-1"
            onClick={() => props.SetPopup1(true)}
          >
            Link Tiktok Video
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionGeneral;
