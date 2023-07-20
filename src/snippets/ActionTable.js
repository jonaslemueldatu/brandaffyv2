//Props
//1. SetAddToBoxPopup = Used to toggle the display of the Add to Box Popup
//2. SetClickedProfileId = Used to set the ID of the clicked Affiliate. This will be passed onto the parent
//3. ClickedProfileId = ID of the clicked affilaite in the List
//4. SetGetAffiliateListTrigger = Will contain custom data for usage when configuring the Table Action
//5. SetTrigger1 = Assign a setState to trigger parent useEffect
//6. Trigger1 =
//7. ClickedCampaignId =
//8. SetTrigger2 = ID of the clicked campaign in the List
//9. Trigger2

import React from "react";
import axios from "axios";

function ActionTable(props) {
  //Influencer Box Functions
  const handleRemove = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/box/removeAffiliate`,
        {
          affiliate_to_remove: props.ClickedProfileId,
          box_Id: props.CustomData.boxId,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        props.SetTrigger1(!props.Trigger1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Campaigns Functions
  const handleStart = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: props.ClickedCampaignId,
          change_to_status: "Active",
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        props.SetTrigger1(!props.Trigger1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: props.ClickedCampaignId,
          change_to_status: "Cancelled",
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        props.SetTrigger1(!props.Trigger1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnd = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: props.ClickedCampaignId,
          change_to_status: "Ended",
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        props.SetTrigger1(!props.Trigger1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      {/* Influencer Box - Details - Brand Actions */}
      {props.CustomData.action === "Influencer Box - Details - Brand" && (
        <button onClick={(e) => handleRemove(e)} className="ctm-btn ctm-btn-2">
          Remove
        </button>
      )}

      {/* Influencer Hub - Brand Actions */}
      {props.CustomData.action === "Influencer Hub - Brand" && (
        <div className="flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.SetClickedProfileId(props.ClickedProfileId);
              props.SetPopup1(true);
            }}
            className="ctm-btn mx-2 ctm-btn-4"
          >
            Add to Box
          </button>
          <button
            className="ctm-btn ctm-btn-1"
            onClick={(e) => {
              e.stopPropagation();
              props.SetClickedProfileId(props.ClickedProfileId);
              props.SetPopup2(true);
            }}
          >
            Invite
          </button>
        </div>
      )}
      {/* Campaigns - Brand - Ready To Start buttons */}
      {props.CustomData.action === "Campaigns - Ready To Start - Brand" && (
        <div className="flex">
          <button
            className="ctm-btn mx-2 ctm-btn-2 "
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button onClick={() => handleStart()} className="ctm-btn ctm-btn-1">
            Start
          </button>
        </div>
      )}
      {/* Campaigns - Affiliate - Invited buttons */}
      {props.CustomData.action === "Campaigns - Invited - Brand" && (
        <div className="flex">
          <button className="ctm-btn mx-2 ctm-btn-2 ">Decline</button>
          <button className="ctm-btn ctm-btn-1">Accept</button>
        </div>
      )}
      {/* Campaigns - Brand - Active buttons */}
      {props.CustomData.action === "Campaigns - Active - Brand" && (
        <div className="flex">
          <button
            className="ctm-btn mx-2 ctm-btn-4 "
            onClick={(e) => handleEnd(e)}
          >
            End
          </button>
        </div>
      )}
      {/* Campaigns - Brand - Active buttons */}
      {props.CustomData.action === "Campaigns - Ended - Brand" && (
        <div className="flex">
          <button className="ctm-btn mx-2 ctm-btn-1 ">View Report</button>
        </div>
      )}
    </div>
  );
}

export default ActionTable;
