import React from "react";
import { LoginSocialTiktok } from "reactjs-social-login";
import { useState } from "react";

function Affiliatetiktokcard(props) {
  const REDIRECT_URI = `${process.env.REACT_APP_CLIENT_ROUTE}/dashboard/profile/`;

  const [tokenData, setTokendata] = useState({});

  const csrfState = Math.random().toString(36).substring(2);

  let url = 'https://www.tiktok.com/v2/auth/authorize/';

  // the following params need to be in `application/x-www-form-urlencoded` format.
  url += `?client_key=${process.env.REACT_APP_TIKTOK_CLIENT_KEY}`;
  url += '&scope=user.info.basic';
  url += '&response_type=code';
  url += `&redirect_uri=${REDIRECT_URI}`;
  url += '&state=' + csrfState;

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
      <div className="flex justify-center py-4 bg-black text-white my-4 rounded-lg cursor-pointer">
        Connect Tiktok Account
      </div>
    // </LoginSocialTiktok>
  );
}

export default Affiliatetiktokcard;
