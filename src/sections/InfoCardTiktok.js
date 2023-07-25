//props
//1. ViewedProfileid = The Id of the Viewed Profile

import React, { useEffect, useState } from "react";
import axios from "axios";

function InfoCardTiktok(props) {
  const [tiktokProfile, setTiktokProfile] = useState({});

  //Wait for useEffect
  const [getTiktokProfileTrigger, setGetTiktokProfileTrigger] = useState(false);

  useEffect(() => {
    setGetTiktokProfileTrigger(true);
    const getTiktokProfile = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/tiktok/profile`,
        {
          viewed_profile_id: props.ViewedProfileId,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setGetTiktokProfileTrigger(false);
      } else {
        setTiktokProfile(res.data.tiktok_profile);
        setGetTiktokProfileTrigger(false);
      }
    };

    getTiktokProfile();
  }, [props.ViewedProfileId]);
  return (
    <a target="_blank" href={tiktokProfile.profile_deep_link} rel="noreferrer">
      <div className="mb-4 flex-col md:flex-row cursor-pointer justify-center flex rounded-lg bg-black drop-shadow-sm border ctm-border-color-2 p-4">
        {!getTiktokProfileTrigger && (
          <div className="flex flex-col items-center text-white">
            <img
              alt="Tiktok profile"
              src={tiktokProfile.avatar_url_100}
              className="rounded-full"
            ></img>
            <div className="m-4 font-bold text-lg">
              {tiktokProfile.display_name}
            </div>
            <div className="flex">
              <div className="m-b-4 mx-4  ctm-min-width-0">
                <div className="flex flex-col justify-center items-center font-bold text-lg">
                  {tiktokProfile.following_count}
                </div>
                <p className="text-xs text-center">Following</p>
              </div>
              <div className="m-b-4 mx-4  ctm-min-width-0">
                {" "}
                <div className="flex flex-col justify-center items-center font-bold text-lg">
                  {tiktokProfile.follower_count}
                </div>
                <p className="text-xs text-center">Followers</p>
              </div>
              <div className="m-b-4 mx-4  ctm-min-width-0">
                {" "}
                <div className="flex flex-col justify-center items-center font-bold text-lg">
                  {tiktokProfile.likes_count}
                </div>
                <p className="text-xs text-center">Likes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </a>
  );
}

export default InfoCardTiktok;
