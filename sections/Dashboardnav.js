import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

function Dashboardnav(props) {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [type] = useState(props.Type.toLowerCase());
  const [link] = useState(props.link);
  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/logout`,
        {
          id: auth().id,
          type: type,
        }
      );
      if (res.status === 200) {
        navigate(`/${type}/login`);
        setTimeout(() => {
          signOut();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLink = (link) => {
    navigate(link);
    navigate(0);
  };

  return (
    <div className="hidden lg:flex bg-white w-52 h-full flex-col px-4 border-r ctm-border-color-1">
      <div className="w-full">
        <img alt="Brandaffy logo colored" src={brandlogo}></img>
      </div>
      <div className="flex flex-col justify-around flex-1">
        {type === "affiliate" && (
          <div className="flex flex-col">
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                link === "My Profile"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/profile")}
            >
              My Profile
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                link === "Campaigns"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/campaigns")}
            >
              Campaigns
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                link === "Influencer Hub"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/influencerhub")}
            >
              Influencer Hub
            </Link>
          </div>
        )}

        {type === "brand" && (
          <div className="flex flex-col">
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                link === "My Profile"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/profile")}
            >
              My Profile
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                link === "Campaigns"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/campaigns")}
            >
              Campaigns
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                link === "Influencer Hub"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/influencerhub")}
            >
              Influencer Hub
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                link === "Creator box"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/influencerbox")}
            >
              Creator Box
            </Link>
          </div>
        )}

        <hr className="my-4 border-t w-full ctm-border-color-2" />

        <div className="flex flex-col">
          <Link
            className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
              link === "Account Settings"
                ? "rounded-lg text-black ctm-bg-color-1"
                : "ctm-font-color-1"
            }`}
            onClick={() => handleLink("/dashboard/settings/subscription")}
          >
            Account Settings
          </Link>
          <Link
            className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
              link === "Help Center"
                ? "rounded-lg text-black ctm-bg-color-1"
                : "ctm-font-color-1"
            }`}
            onClick={() => handleLink("/")}
          >
            Help Center
          </Link>
          <div
            className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ctm-font-color-1`}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboardnav;
