// Props
//  ActiveLink = Link that will be set to active
//  LoggedInUserType = User Type of Viewer (Brand/Affilaite)

import React, { useState } from "react";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

function NavigationDashboard(props) {
  // Assets
  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );

  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [loggedInUserType] = useState(props.LoggedInUserType.toLowerCase());
  const [activeLink] = useState(props.ActiveLink);
  const [loggedInUser] = useState(auth().id);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/logout`,
        {
          _id: loggedInUser,
          viewer_user_type: loggedInUserType,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        navigate(`/${loggedInUserType}/login`);
        setTimeout(() => {
          signOut();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLink = (navLink) => {
    navigate(navLink);
    navigate(0);
  };

  return (
    <div className="hidden lg:flex bg-white w-52 h-full flex-col px-4 border-r ctm-border-color-1">
      <div className="w-full">
        <img alt="Brandaffy logo colored" src={brandlogo}></img>
      </div>
      <div className="flex flex-col justify-around flex-1">
        {loggedInUserType === "creator" && (
          <div className="flex flex-col">
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                activeLink === "My Profile"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/profile")}
            >
              My Profile
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                activeLink === "Campaigns"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() =>
                handleLink(`/dashboard/campaigns/${loggedInUserType}`)
              }
            >
              Campaigns
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                activeLink === "Creator Hub"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/creatorhub")}
            >
              Creator Hub
            </Link>
          </div>
        )}

        {loggedInUserType === "brand" && (
          <div className="flex flex-col">
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                activeLink === "My Profile"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/profile")}
            >
              My Profile
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                activeLink === "Campaigns"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() =>
                handleLink(`/dashboard/campaigns/${loggedInUserType}`)
              }
            >
              Campaigns
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                activeLink === "Creator Hub"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/creatorhub")}
            >
              Creator Hub
            </Link>
            <Link
              className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
                activeLink === "Creator Box"
                  ? "rounded-lg text-black ctm-bg-color-1"
                  : "ctm-font-color-1"
              }`}
              onClick={() => handleLink("/dashboard/creatorbox")}
            >
              Creator Box
            </Link>
          </div>
        )}

        <hr className="my-4 border-t w-full ctm-border-color-2" />

        <div className="flex flex-col">
          <Link
            className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
              activeLink === "Account Settings"
                ? "rounded-lg text-black ctm-bg-color-1"
                : "ctm-font-color-1"
            }`}
            onClick={() =>
              handleLink("/dashboard/settings?subsettings=Subscription")
            }
          >
            Account Settings
          </Link>
          <Link
            className={`p-3 m-1 font-bold leading-5 cursor-pointer no-underline hover:text-black hover:rounded-lg ctm-hvr-bg-color-1 ${
              activeLink === "Help Center"
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

export default NavigationDashboard;
