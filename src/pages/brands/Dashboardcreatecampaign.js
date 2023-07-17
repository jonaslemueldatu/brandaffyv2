import React from "react";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from 'axios'

import Dashboardnav from "../../pages/sections/Dashboardnav";
import Dashboardheader from "../../pages/sections/Dashboardheader";
import Createcampaignform from "../sections/Createcampaignform";

function Dashboardcreatecampaign() {
  const auth = useAuthUser();

  const [isbusy, setIsbusy] = useState(true)
  const [userid] = useState(auth().id);
  const [box, setBoxes] = useState([])

  useEffect(() => {
    setIsbusy(true);
    const getBoxList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/brand/box/getlist`,
          {
            params: {
              brand_owner_id: userid,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setBoxes(res.data.brandbox_list);
          setIsbusy(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBoxList();
  }, [userid]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav Type={auth().user_type} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Campaign - New Campaign" />
        {!isbusy && (<Createcampaignform Box={box} OwnerId={userid} />)}
      </div>
    </div>
  );
}

export default Dashboardcreatecampaign;
