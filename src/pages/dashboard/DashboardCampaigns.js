import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

import Dashboardnav from "../../sections/Dashboardnav";
import Dashboardheader from "../../sections/Dashboardheader";
import Generalactioncontainer from "../../sections/Generalactioncontainer";
import Campaignlist from "../../sections/Campaignlist";

function Dashboardcampaigns() {
  const auth = useAuthUser();

  const [userid] = useState(auth().id);

  const [, setPopup] = useState({});
  const [userId] = useState(auth().id);

  const [campaignRTS, setCampaignRTS] = useState([]);
  const [RTSbusy, setRTSbusy] = useState(true);
  const [campaignActive, setCampaignActive] = useState([]);
  const [Abusy, setAbusy] = useState([]);

  const [customHeaderActionData] = useState({
    action: "brandCampaigns",
    id: userid,
  });
  const [RTSTableActionData] = useState({
    action: "RTSbuttons"
  })

  const [ActiveTableActionData] = useState({})

  useEffect(() => {
    setRTSbusy(true);
    const getCampaignRTS = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
          {
            params: {
              brand_owner_id: userId,
              status: "Ready to Start",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignRTS(res.data.campaign_list);
          setRTSbusy(false);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCampaignRTS();
  }, [userId]);

  useEffect(() => {
    setAbusy(true);
    const getCampaignRTS = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
          {
            params: {
              brand_owner_id: userId,
              status: "Active",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignActive(res.data.campaign_list);
          setAbusy(false);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCampaignRTS();
  }, [userId]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav Link="Campaigns" Type={auth().user_type} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Campaigns" />
        {auth().user_type === "Brand" && (
          <Generalactioncontainer SetPopup={setPopup} CustomData={customHeaderActionData} />
        )}
        {!Abusy && auth().user_type === "Brand" && (
          <Campaignlist
            Campaigns={campaignActive}
            Title={{ color: "ctm-bg-color-6", text: "Active" }}
            CustomData={ActiveTableActionData}
          />
        )}
        {!RTSbusy && auth().user_type === "Brand" && (
          <Campaignlist
            Campaigns={campaignRTS}
            Title={{ color: "ctm-bg-color-5", text: "Ready to Start" }}
            CustomData={RTSTableActionData}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboardcampaigns;
