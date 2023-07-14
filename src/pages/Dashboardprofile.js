import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

import Dashboardnav from "./sections/Dashboardnav";
import Dashboardheader from "./sections/Dashboardheader";

function Dashboardprofile() {
  const auth = useAuthUser();
  const { id } = useParams();

  console.log(auth());

  const [myprofile] = useState(id ? false : true);
  const [link] = useState(id ? "" : "My Profile");
  const [getid] = useState(id ? id : auth().id);
  const [usertype] = useState(auth().user_type);

  return (
    <div className="h-screen flex">
      <Dashboardnav link={link} Type={usertype} />
      <div className="flex flex-col flex-1 p-4">
        <Dashboardheader Title="Influencer Profile" />
      </div>
    </div>
  );
}

export default Dashboardprofile;
