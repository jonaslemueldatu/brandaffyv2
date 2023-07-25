//Props

import React, { useEffect } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Affiliatetiktokcard(props) {
  const useAuth = useAuthUser();
  const navigate = useNavigate();

  const id = useAuth().id;

  //Needed for Tiktok access authentication
  const REDIRECT_URI = `${process.env.REACT_APP_CLIENT_ROUTE}/dashboard/profile/`;
  const csrfState = Math.random().toString(36).substring(2);

  const codes = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (codes.get("code")) {
      const getTiktokToken = async () => {
        const res = await axios.post(
          `${process.env.REACT_APP_ROUTE}/api/tiktokaccesstoken`,
          {
            code: codes.get("code"),
            user_id: id,
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          navigate("/dashboard/profile");
          window.location.reload(false);
        }
      };

      getTiktokToken();
    }
  }, []);

  // URL for Tiktok Log-in Kit
  let url = "https://www.tiktok.com/v2/auth/authorize/";
  url += `?client_key=${process.env.REACT_APP_TIKTOK_CLIENT_KEY}`;
  url += "&scope=user.info.basic";
  url += "&response_type=code";
  url += `&redirect_uri=${REDIRECT_URI}`;
  url += "&state=" + csrfState;

  return (
    <a href={url}>
      <div className="flex justify-center py-4 bg-black text-white my-4 rounded-lg cursor-pointer">
        Connect Tiktok Account
      </div>
    </a>
  );
}

export default Affiliatetiktokcard;
