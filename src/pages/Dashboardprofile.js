import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

import Dashboardnav from "./sections/Dashboardnav";
import Dashboardheader from "./sections/Dashboardheader";
import Affiliateinfocard from "./sections/Affiliateinfocard";

function Dashboardprofile() {
  const auth = useAuthUser();
  const { id } = useParams();

  console.log(auth());

  const [myprofile] = useState(id ? false : true);
  const [link] = useState(id ? "" : "My Profile");
  const [userid] = useState(id ? id : auth().id);
  const [usertype] = useState(auth().user_type);

  return (
    <div className="h-screen flex">
      <Dashboardnav link={link} Type={usertype} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Influencer Profile" />
        {usertype === 'Affiliate' && <Affiliateinfocard Myprofile={myprofile} Id={userid} />}
      </div>
    </div>
  );
}

export default Dashboardprofile;
