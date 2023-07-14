import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

import Dashboardnav from "./sections/Dashboardnav";

function Dashboardprofile() {
  const auth = useAuthUser();
  const { id } = useParams();

  console.log(auth())

  const [myprofile] = useState(id ? false : true);
  const [link] = useState(id ? "" : "My Profile");
  const [getid] = useState(id ? id : auth().id);

  return (
    <div className="h-screen">
      <Dashboardnav link={link} Type={auth().user_type} />
    </div>
  );
}

export default Dashboardprofile;
