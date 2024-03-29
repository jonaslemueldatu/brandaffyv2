//Props
//1. CampaignDetails = The campaign object passed from the parent component

import React, { useState } from "react";

//Snippet Imports
import IndicatorStatus from "../snippets/IndicatorStatus";

function InfoCardCampaign(props) {
  const [campaignDetails] = useState(props.CampaignDetails);

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
          <div className="p-4 ctm-min-width-1">
            {campaignDetails.campaign_objectives}
          </div>
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
          <div className="p-4 ctm-min-width-1">
            {campaignDetails.campaign_terms}
          </div>
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Create Date</label>
            <div className="p-4 ctm-min-width-1 ctm-font-color-1">
              {new Date(campaignDetails.create_date).toLocaleDateString(
                "en-CA"
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Start Date</label>
            <div className="p-4 ctm-min-width-1 ctm-font-color-1">
              {campaignDetails.start_date ? (
                new Date(campaignDetails.start_date).toLocaleDateString("en-CA")
              ) : (
                <span>--</span>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">End Date</label>
            <div className="p-4 ctm-min-width-1 ctm-font-color-1">
              {campaignDetails.end_date ? (
                new Date(campaignDetails.end_date).toLocaleDateString("en-CA")
              ) : (
                <span>--</span>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Cancel Date</label>
            <div className="p-4 ctm-min-width-1 ctm-font-color-1">
              {campaignDetails.cancelled_date ? (
                new Date(campaignDetails.cancelled_date).toLocaleDateString(
                  "en-CA"
                )
              ) : (
                <span>--</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCardCampaign;
