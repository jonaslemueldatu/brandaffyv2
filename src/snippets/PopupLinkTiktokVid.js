//Props
//1. SetLinkTiktokPopup = Triggers the popup
//2. BrandOwnerId = Owner of the campaign
//3. SetTrigger1 = Triggers a parent child component
//4. Trigger1

import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

function PopupLinkTiktokvids(props) {
  const auth = useAuthUser();
  const { campaignid } = useParams();

  const [loggedInUserID] = useState(auth().id);
  const [videoList, setVideoList] = useState([]);
  const [videoChoice, setVideoChoice] = useState("");

  const [error, setError] = useState("");

  //UseEffect States
  const [isGettingVidList, setIsGettingVidList] = useState(true);

  useEffect(() => {
    setIsGettingVidList(true);
    const getVideoList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/tiktok/getvideolist`,
          {
            params: {
              user_id: loggedInUserID,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setIsGettingVidList(false);
        } else {
          setVideoList(res.data.video_list.videos);
          setVideoChoice(res.data.video_list.videos[0].id);
          setIsGettingVidList(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getVideoList();
  }, [loggedInUserID]);

  const handleAddButton = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/linkvideo`,
        {
          brand_owner_id: props.BrandOwnerId,
          campaign_id: campaignid,
          video_id: videoChoice,
          creator_id: loggedInUserID,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setError(res.data.err);
      } else {
        props.SetLinkTiktokPopup(false);
        props.SetTrigger1(!props.Trigger1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => props.SetLinkTiktokPopup(false)}
      className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 sm:w-1/2 max-w-xl rounded-md bg-white drop-shadow-sm  ctm-border-color-2 p-4 absolute"
      >
        <div className="font-bold">Choose Public Tiktok Video</div>

        {!isGettingVidList &&
          (videoList.length === 0 ? (
            <div className="text-center my-8 ctm-font-color-1">
              No available public videos to link to
            </div>
          ) : (
            <div>
              {" "}
              <select
                required
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border w-full my-4"
                onChange={(e) => {
                  setVideoChoice(e.target.value);
                  setError("");
                }}
                defaultValue={videoChoice}
              >
                {videoList.map((video) => {
                  return (
                    <option key={video.id} value={video.id}>
                      {video.title !== "" ? video.title : "No Title"}
                    </option>
                  );
                })}
              </select>
              <div className="mb-4 text-red-500">{error}</div>
            </div>
          ))}
        <div className="flex justify-end">
          <button
            onClick={() => props.SetLinkTiktokPopup(false)}
            className="ctm-btn ctm-btn-2 mx-4"
          >
            Cancel
          </button>
          {!isGettingVidList && videoList.length > 0 && (
            <button
              onClick={() => handleAddButton()}
              className="ctm-btn ctm-btn-3"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopupLinkTiktokvids;
