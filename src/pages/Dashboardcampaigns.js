import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import Dashboardnav from "../pages/sections/Dashboardnav";
import Dashboardheader from "../pages/sections/Dashboardheader";
import Generalactioncontainer from "../pages/sections/Generalactioncontainer"

function Dashboardcampaigns() {
  const auth = useAuthUser();

  const [userid] = useState(auth().id);

  const [isbusy, setIsbusy] = useState(true);
  const [, setPopup] = useState({});
  const [customData] = useState({
    action: "brandCampaigns",
    id: userid,
  });

  useEffect(() => {
    setIsbusy(true);
    setIsbusy(false);
  }, []);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav Link="Campaigns" Type={auth().user_type} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Campaigns" />
        {!isbusy && auth().user_type === "Brand" && (
          <Generalactioncontainer SetPopup={setPopup} CustomData={customData} />
        )}
      </div>
    </div>
  );
}

export default Dashboardcampaigns;
