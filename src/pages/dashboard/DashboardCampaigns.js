import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import Dashboardnav from "../../sections/Dashboardnav";
import Dashboardheader from "../../sections/Dashboardheader";
import Generalactioncontainer from "../../sections/Generalactioncontainer";
import Campaignlist from "../../sections/Campaignlist";

function Dashboardcampaigns() {
  const auth = useAuthUser();

  const [viewerUserType] = useState(auth().user_type);
  const [loggedInUserId] = useState(auth().id);
  const [campaignReadyToStartList, setCampaignReadyToStartList] = useState([]);
  const [campaignActiveList, setCampaignActiveList] = useState([]);

  //UseEffect triggers
  const [getCampaignReadyToStartTrigger, setGetCampaignReadyToStartTrigger] =
    useState(true);
  const [getCampaignActiveTrigger, setGetCampaignActiveTrigger] =
    useState(true);
  const [getCampaignListExternalTrigger, setGetCampaignListExternalTrigger] =
    useState(true);

  // Setup General Action information
  const [customData] = useState({
    action: "Campaigns - Brand",
  });

  //Setup Table Action Data
  const [CustomDataReadyToStart] = useState({
    action: "Campaigns - Ready To Start - Brand",
  });
  const [ActiveTableActionData] = useState({});

  //Setup popup information

  //UseEffect to get List of Ready To Start Campaigns
  useEffect(() => {
    setGetCampaignReadyToStartTrigger(true);
    const getCampaignReadyToStart = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
          {
            params: {
              brand_owner_id: loggedInUserId,
              status: "Ready to Start",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignReadyToStartList(res.data.campaign_list);
          setGetCampaignReadyToStartTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCampaignReadyToStart();
  }, [loggedInUserId]);

  //UseEffect to get List of Active Campaigns
  useEffect(() => {
    setGetCampaignActiveTrigger(true);
    const getCampaignActive = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
          {
            params: {
              brand_owner_id: loggedInUserId,
              status: "Active",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignActiveList(res.data.campaign_list);
          setGetCampaignActiveTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCampaignActive();
  }, [loggedInUserId, getCampaignListExternalTrigger]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav ActiveLink="Campaigns" ViewerUserType={viewerUserType} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Campaigns" />
        {auth().user_type === "Brand" && (
          <Generalactioncontainer CustomData={customData} />
        )}
        {!getCampaignActiveTrigger && auth().user_type === "Brand" && (
          <Campaignlist
            CampaignList={campaignActiveList}
            TableTitle={{ color: "ctm-bg-color-6", text: "Active" }}
            CustomData={ActiveTableActionData}
          />
        )}
        {!getCampaignReadyToStartTrigger && viewerUserType === "Brand" && (
          <Campaignlist
            CampaignList={campaignReadyToStartList}
            TableTitle={{ color: "ctm-bg-color-5", text: "Ready to Start" }}
            CustomData={CustomDataReadyToStart}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboardcampaigns;
