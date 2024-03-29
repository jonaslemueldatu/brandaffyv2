//Props
//1. SetAddToBoxPopup = Used to toggle the display of the Add to Box Popup
//2. SetClickedProfileId = Used to set the ID of the clicked Creator. This will be passed onto the parent
//3. ClickedProfileId = ID of the clicked affilaite in the List
//4. SetGetCreatorListTrigger = Will contain custom data for usage when configuring the Table Action
//5. SetTrigger1 = Assign a setState to trigger parent useEffect
//6. Trigger1 =
//7. ClickedCampaignId =
//   ClickedVideoId =
//8. SetTrigger2 = ID of the clicked campaign in the List
//9. Trigger2
//10. Status = The status of the campaign line item being sent to render

import React, { useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";

function ActionTable(props) {
  const auth = useAuthUser();

  const [loggedInUserId] = useState(auth().id);
  const { campaignid } = useParams();

  //Creator Box Functions
  const handleRemove = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/box/removeCreator`,
        {
          creator_to_remove: props.ClickedProfileId,
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

  //Campaigns Functions Affilaite
  const handleAccept = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: props.ClickedCampaignId,
          change_to_status: "Accepted",
          accepted_creator: loggedInUserId,
        }
      );
      if (res.data.err) {
        alert(res.data.err);
        console.log(res.data.err);
      } else {
        props.SetTrigger1(!props.Trigger1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: props.ClickedCampaignId,
          change_to_status: "Declined",
          declined_creator: loggedInUserId,
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

  // Campaigns Functions Brand
  const handleStart = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: props.ClickedCampaignId,
          change_to_status: "Active",
          brand_owner_id: loggedInUserId,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        props.SetTrigger2(res.data.err);
      } else {
        props.SetTrigger1(!props.Trigger1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (e) => {
    e.stopPropagation();
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
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: props.ClickedCampaignId,
          change_to_status: "Ended",
          brand_owner_id: loggedInUserId,
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

  const handleRemoveVideo = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/unlinkvideo`,
        {
          campaign_id: campaignid,
          video_id: props.ClickedVideoId,
          creator_id: loggedInUserId,
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
      {/* Creator Box - Details - Brand Actions */}
      {props.CustomData.action === "Creator Box - Details - Brand" && (
        <button onClick={(e) => handleRemove(e)} className="ctm-btn ctm-btn-2">
          Remove
        </button>
      )}

      {/* Creator Hub - Brand Actions */}
      {props.CustomData.action === "Creator Hub - Brand" && (
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
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
          <button onClick={(e) => handleStart(e)} className="ctm-btn ctm-btn-1">
            Start
          </button>
        </div>
      )}
      {/* Campaigns - Creator - Invited buttons */}
      {props.CustomData.action === "Campaigns - Invited - Creator" && (
        <div className="flex">
          <button
            className="ctm-btn mx-2 ctm-btn-2"
            onClick={(e) => handleDecline(e)}
          >
            Decline
          </button>
          <button
            className="ctm-btn ctm-btn-1"
            onClick={(e) => handleAccept(e)}
          >
            Accept
          </button>
        </div>
      )}
      {/* Campaigns - Creator - Accepted buttons */}
      {props.CustomData.action === "Campaigns - Accepted - Creator" &&
        props.Status === "Active" && (
          <div className="flex">
            <button className="ctm-btn ctm-btn-4">View Progress</button>
          </div>
        )}
      {props.CustomData.action === "Campaigns - Accepted - Creator" &&
        props.Status === "Ended" && (
          <div className="flex">
            <button className="ctm-btn ctm-btn-4">View Report</button>
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
      {/* Campaign Details - Creator - Ready */}
      {props.CustomData.action === "Campaign Details - Creator - Ready" && (
        <div className="flex">
          <button
            className="ctm-btn mx-2 ctm-btn-2"
            onClick={(e) => handleRemoveVideo(e)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionTable;
