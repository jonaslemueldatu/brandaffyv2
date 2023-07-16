import React from "react";
import { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

import Dashboardnav from "../../pages/sections/Dashboardnav";
import Dashboardheader from "../../pages/sections/Dashboardheader";
import InfluencerBoxList from "../sections/Influencerboxlist";
import Influencerboxlistaction from "../sections/Influencerboxlistaction";
import Createboxpopup from "../snippets/Createboxpopup";

function DashboardInfluencerBox() {
  const auth = useAuthUser();

  const [link] = useState("Influencer Box");
  const [userid] = useState(auth().id);
  const [usertype] = useState(auth().user_type);
  const [boxes, setBoxes] = useState({});
  const [isbusy, setIsbusy] = useState(true);

  const [popup, setPopup] = useState(false);
  const [triggereffect, setTriggereffect] = useState(false);

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
    setTriggereffect(false)
  }, [userid, triggereffect]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav link={link} Type={usertype} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Influencer Box" />
        {!isbusy && (<Influencerboxlistaction SetPopup={setPopup} />)}
        {!isbusy && (<InfluencerBoxList Boxes={boxes} />)}
      </div>
      {popup && !isbusy && (<Createboxpopup SetPopup={setPopup} SetEffect={setTriggereffect} Id={userid} />)}
    </div>
  );
}

export default DashboardInfluencerBox;
