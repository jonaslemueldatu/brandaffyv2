//Props

import React, { useEffect } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

function Affiliatetiktokcard(props) {
  const useAuth = useAuthUser();

  const id = useAuth().id;
  const REDIRECT_URI = `${process.env.REACT_APP_CLIENT_ROUTE}/dashboard/profile/`;
  const csrfState = Math.random().toString(36).substring(2);

  const codes = new URLSearchParams(window.location.search);
  // useEffect(() => {
  //   if (codes.get("code")) {
  //     axios.post(`${process.env.REACT_APP_ROUTE}/api/tiktokaccesstoken`, {
  //       code: codes.get("code"),
  //       user_id: id,
  //     }, []);
  //   }
  // });

  const handleLinking = (e) => {
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_ROUTE}/api/tiktokaccesstoken`,
      {
        code: codes.get("code"),
        user_id: id,
      },
      []
    );
  };

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
      <div onClick={(e) => handleLinking(e)}>Hello</div>
    </a>
  );
}

export default Affiliatetiktokcard;
