import React, { useEffect } from "react";
import { LoginSocialTiktok } from "reactjs-social-login";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Affiliatetiktokcard(props) {
  const REDIRECT_URI = `${process.env.REACT_APP_CLIENT_ROUTE}/dashboard/profile/`;

  const [tokenData, setTokendata] = useState({});

  const csrfState = Math.random().toString(36).substring(2);

  const codes = new URLSearchParams(window.location.search);
  console.log(codes.get("code"));

  useEffect(() => {
    if (codes.get("code")) {
      const getTiktokToken = async () => {
        const data = await axios.post(
          "https://open.tiktokapis.com/v2/oauth/token/",
          {
            client_key: "aw1wx231u89y4wq3",
            client_secret: "220b6aa55075674137b7a4ab24d9932b",
            code: codes.get("code"),
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(data);
      };

      getTiktokToken();
    }
  });

  let url = "https://www.tiktok.com/v2/auth/authorize/";

  // the following params need to be in `application/x-www-form-urlencoded` format.
  url += `?client_key=${process.env.REACT_APP_TIKTOK_CLIENT_KEY}`;
  url += "&scope=user.info.basic";
  url += "&response_type=code";
  url += `&redirect_uri=${REDIRECT_URI}`;
  url += "&state=" + csrfState;

  return (
    // <LoginSocialTiktok
    //   client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY}
    //   redirect_uri={REDIRECT_URI}
    //   onResolve={({ provider, data }) => {
    //     setTokendata(data);
    //     console.log(provider);
    //     console.log(data);
    //     console.log(tokenData)
    //   }}
    //   onReject={(err) => {
    //     console.log(err);
    //   }}
    // >
    <a href={url} target="_blank">
      <div className="flex justify-center py-4 bg-black text-white my-4 rounded-lg cursor-pointer">
        Connect Tiktok Account
      </div>
    </a>
    // </LoginSocialTiktok>
  );
}

export default Affiliatetiktokcard;
