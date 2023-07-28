//Props
//1. SetInviteCampaignPopup
//2. ViewedProfileId

import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

function PopupInviteCampaign(props) {
  const auth = useAuthUser();

  const [loggedInUserId] = useState(auth().id);
  const [campaignReadyToStartList, setCampaignReadyToStartList] = useState([]);
  const [campaignChoice, setCampaignChoice] = useState("");
  const [error, setError] = useState("");

  //UseEffect triggers
  const [getCampaignReadyToStartTrigger, setGetCampaignReadyToStartTrigger] =
    useState(true);

  //useEffect to get READY TO START Campaign list
  useEffect(() => {
    setGetCampaignReadyToStartTrigger(true);
    const getCampaignReadyToStart = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
          {
            params: {
              brand_owner_id: loggedInUserId,
              status: "Ready to Start",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setError("");
          setGetCampaignReadyToStartTrigger(false);
        } else {
          setCampaignReadyToStartList(res.data.campaign_list);
          setCampaignChoice(res.data.campaign_list[0]._id.toString());
          setGetCampaignReadyToStartTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCampaignReadyToStart();
  }, [loggedInUserId]);

  //Handle invite action
  const handleInviteButton = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/update`,
        {
          campaign_id: campaignChoice,
          change_to_status: "Invited",
          invited_creator: props.ViewedProfileId,
          brand_owner_id: loggedInUserId,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setError(res.data.err);
      } else {
        props.SetInviteCampaignPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => props.SetInviteCampaignPopup(false)}
      className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 sm:w-1/2 max-w-xl rounded-md bg-white drop-shadow-sm  ctm-border-color-2 p-4 absolute"
      >
        <div className="font-bold">Invite Creator to Campaign:</div>
        {!getCampaignReadyToStartTrigger &&
          (campaignReadyToStartList.length === 0 ? (
            <div className="text-center my-8 ctm-font-color-1">
              No campaigns are ready to start yet
            </div>
          ) : (
            <div>
              {" "}
              <select
                required
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border w-full my-4"
                onChange={(e) => setCampaignChoice(e.target.value)}
                defaultValue={campaignChoice}
              >
                {campaignReadyToStartList.map((campaign) => {
                  return (
                    <option
                      key={campaign._id.toString()}
                      value={campaign._id.toString()}
                    >
                      {campaign.campaign_name}
                    </option>
                  );
                })}
              </select>
              <div className="mb-4 text-red-500">{error}</div>
            </div>
          ))}
        <div className="flex justify-end">
          <button
            onClick={() => props.SetInviteCampaignPopup(false)}
            className="ctm-btn ctm-btn-2 mx-4"
          >
            Cancel
          </button>
          {!getCampaignReadyToStartTrigger &&
            campaignReadyToStartList.length > 0 && (
              <button
                onClick={(e) => handleInviteButton(e)}
                className="ctm-btn ctm-btn-3"
              >
                Invite
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default PopupInviteCampaign;
