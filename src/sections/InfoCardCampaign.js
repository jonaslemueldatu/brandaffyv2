//Props
//1. CampaignDetails = The campaign object passed from the parent component

import React, { useState } from "react";

//Snippet Imports
import IndicatorStatus from "../snippets/IndicatorStatus";

function InfoCardCampaign(props) {
  const [campaignDetails, setCampaignDetails] = useState(props.CampaignDetails);

  return (
    <div className="mb-4 flex-col md:flex-row flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4">
      <div className="w-full">
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Campaign Name</label>
            <div className="p-4 ctm-min-width-1">
              {campaignDetails.campaign_name}
            </div>
          </div>
          <div className="flex flex-1 flex-col my-4 ctm-min-width-1">
            <label className="my-2 font-bold">Status</label>
            <div className="p-4 w-fit">
              <IndicatorStatus CampaignStatus={campaignDetails.status} />
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Product</label>
            <div className="p-4 ctm-min-width-1">
              {campaignDetails.campaign_product}
            </div>
          </div>
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Target Market</label>
            <div className="p-4 ctm-min-width-1">
              {campaignDetails.campaign_target_market}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col my-4">
          <label className="my-2 font-bold">Objectives</label>
          {campaignDetails.campaign_objectives}
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Payment Type</label>
            <div className="p-4 ctm-min-width-1">
              {campaignDetails.campaign_proposed_payment}
            </div>
          </div>
          <div className="flex flex-1 flex-col my-4"></div>
        </div>
        <div className="flex flex-1 flex-col my-4">
          <label className="my-2 font-bold">Terms and Conditions</label>
          {campaignDetails.campaign_terms}
        </div>
      </div>
    </div>
  );
}

export default InfoCardCampaign;
