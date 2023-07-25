import React from "react";
import { LoginSocialTiktok } from "reactjs-social-login";
import { useState } from "react";

function Affiliatetiktokcard(props) {
  const REDIRECT_URI = `${process.env.REACT_APP_CLIENT_ROUTE}/dashboard/profile/`;

  const [tokenData, setTokendata] = useState({});

  return (
    <LoginSocialTiktok
      client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY}
      redirect_uri={REDIRECT_URI}
      onResolve={({ provider, data }) => {
        setTokendata(data);
        console.log(provider);
        console.log(data);
        console.log(tokenData)
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <div className="flex justify-center py-4 bg-black text-white my-4 rounded-lg cursor-pointer">
        Connect Tiktok Account
      </div>
    </LoginSocialTiktok>
  );
}

export default Affiliatetiktokcard;
