import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

import Dashboardnav from "../pages/sections/Dashboardnav";
import Dashboardheader from "../pages/sections/Dashboardheader";
import Affiliateinfocard from "../pages/sections/Affiliateinfocard";
// import Affiliatetiktokcard from "../pages/sections/Affiliatetiktokcard";
import Brandinfocard from "../pages/sections/Brandinfocard";
import Generalactioncontainer from "./sections/Generalactioncontainer";
import Addtoboxpopup from "./snippets/Addtoboxpopup";

function Dashboardprofile() {
  const auth = useAuthUser();
  const { id } = useParams();

  const [myprofile] = useState(id ? false : true);
  const [link] = useState(id ? "" : "My Profile");
  const [userid] = useState(id ? id : auth().id);
  const [usertype] = useState(id ? "Affiliate" : auth().user_type);
  const [profile, setProfile] = useState({});
  const [isbusy, setIsbusy] = useState(true);

  const [popup, setPopup] = useState({});
  const [customData] = useState({
    action: "brandAffiliateProfile",
    id: userid,
  });
  useEffect(() => {
    setIsbusy(true);

    const getProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/getprofile`,
          {
            params: {
              id: userid,
              type: usertype,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setProfile(res.data.user_profile);
          setIsbusy(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [userid, usertype]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav link={link} Type={auth().user_type} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader
          Title={
            usertype === "Affiliate" ? "Influencer Profile" : "Brand Profile"
          }
        />
        {!isbusy && auth().user_type === "Brand" && !myprofile && (
          <Generalactioncontainer SetPopup={setPopup} CustomData={customData} />
        )}

        {!isbusy && usertype === "Affiliate" && (
          <Affiliateinfocard
            Profile={profile}
            Myprofile={myprofile}
            Id={userid}
          />
        )}
        {!isbusy && usertype === "Brand" && (
          <Brandinfocard Profile={profile} Myprofile={myprofile} Id={userid} />
        )}
        {/* {!isbusy && usertype === "Affiliate" && (
          <Affiliatetiktokcard Myprofile={myprofile} Id={userid} />
        )} */}
      </div>
      {popup.action === "addBox" && !isbusy && (
        <Addtoboxpopup SetPopup={setPopup} Popup={popup} />
      )}
    </div>
  );
}

export default Dashboardprofile;
