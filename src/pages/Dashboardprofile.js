import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

import Dashboardnav from "./sections/Dashboardnav";
import Dashboardheader from "./sections/Dashboardheader";
import Affiliateinfocard from "./sections/Affiliateinfocard";
import Affiliatetiktokcard from "./sections/Affiliatetiktokcard";

function Dashboardprofile() {
  const auth = useAuthUser();
  const { id } = useParams();

  const [myprofile] = useState(id ? false : true);
  const [link] = useState(id ? "" : "My Profile");
  const [userid] = useState(id ? id : auth().id);
  const [usertype] = useState(auth().user_type);
  const [profile, setProfile] = useState({});
  const [isbusy, setIsbusy] = useState(true);

  useEffect(() => {
    setIsbusy(true);

    const getProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/getprofile`,
          {
            params: {
              id: userid,
            },
          }
        );
        if (res.data.err) {
          alert(res.data.err);
        } else {
          setProfile(res.data.user_profile);
          setIsbusy(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [userid]);

  return (
    <div className="h-screen flex">
      <Dashboardnav link={link} Type={usertype} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Influencer Profile" />
        {!isbusy && (
          <Affiliateinfocard
            Profile={profile}
            Myprofile={myprofile}
            Id={userid}
          />
        )}
        {!isbusy && <Affiliatetiktokcard Myprofile={myprofile} Id={userid} />}
      </div>
    </div>
  );
}

export default Dashboardprofile;
