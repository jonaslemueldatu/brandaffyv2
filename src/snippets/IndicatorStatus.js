//Props
// 1. CampaignStatus = Status of the campaign - Varies per user

import React from "react";

function IndicatorStatus(props) {
  return (
    <div>
      {props.CampaignStatus === "Ready to Start" && (
        <div className="ctm-bg-color-5 rounded-md font-semibold">Ready</div>
      )}
      {props.CampaignStatus === "Active" && (
        <div className="ctm-bg-color-6  rounded-md font-semibold">Active</div>
      )}
      {props.CampaignStatus === "Cancelled" && (
        <div className="ctm-bg-color-10  rounded-md font-semibold">Cancelled</div>
      )}
            {props.CampaignStatus === "Ended" && (
        <div className="ctm-bg-color-1  rounded-md font-semibold">ended</div>
      )}
    </div>
  );
}

export default IndicatorStatus;
