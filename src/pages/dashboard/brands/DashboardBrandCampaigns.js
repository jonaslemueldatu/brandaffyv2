import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import NavigationDashboard from "../../../sections/NavigationDashboard";
import ContainerHeader from "../../../sections/ContainerHeader";
import ContainerActionGeneral from "../../../sections/ContainerGeneralAction";
import ListCampaigns from "../../../sections/ListCampaigns";

function Dashboardcampaigns() {
  const auth = useAuthUser();

  const [loggedInUserType] = useState(auth().user_type);
  const [loggedInUserId] = useState(auth().id);
  const [campaignReadyToStartList, setCampaignReadyToStartList] = useState([]);
  const [campaignActiveList, setCampaignActiveList] = useState([]);
  const [campaignEndedList, setCampaignEndedList] = useState([]);
  const [campaignCancelledList, setCampaignCancelledList] = useState([]);

  //UseEffect triggers
  const [getCampaignReadyToStartTrigger, setGetCampaignReadyToStartTrigger] =
    useState(true);
  const [getCampaignActiveTrigger, setGetCampaignActiveTrigger] =
    useState(true);
  const [getCampaignCancelledTrigger, setGetCampaignCancelledTrigger] =
    useState(true);
  const [getCampaignEndedTrigger, setGetCampaignEndedTrigger] = useState(true);
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
  const [CustomDataActive] = useState({
    action: "Campaigns - Active - Brand",
  });
  const [CustomDataEnded] = useState({
    action: "Campaigns - Ended - Brand",
  });

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
  }, [loggedInUserId, getCampaignListExternalTrigger]);

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

  //Useeffect to get list of cancelled campaigns
  useEffect(() => {
    setGetCampaignEndedTrigger(true);
    const getCampaignEnded = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
          {
            params: {
              brand_owner_id: loggedInUserId,
              status: "Ended",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignEndedList(res.data.campaign_list);
          setGetCampaignEndedTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCampaignEnded();
  }, [loggedInUserId, getCampaignListExternalTrigger]);

  //Useeffect to get list of cancelled campaigns
  useEffect(() => {
    setGetCampaignCancelledTrigger(true);
    const getCampaignCancelled = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
          {
            params: {
              brand_owner_id: loggedInUserId,
              status: "Cancelled",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignCancelledList(res.data.campaign_list);
          setGetCampaignCancelledTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCampaignCancelled();
  }, [loggedInUserId, getCampaignListExternalTrigger]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Campaigns"
        LoggedInUserType={loggedInUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Campaigns" />
        {auth().user_type === "Brand" && (
          <ContainerActionGeneral CustomData={customData} />
        )}
        {!getCampaignActiveTrigger && auth().user_type === "Brand" && (
          <ListCampaigns
            CampaignList={campaignActiveList}
            TableTitle={{ color: "ctm-bg-color-6", text: "Active" }}
            CustomData={CustomDataActive}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
          />
        )}
        {!getCampaignReadyToStartTrigger && loggedInUserType === "Brand" && (
          <ListCampaigns
            CampaignList={campaignReadyToStartList}
            TableTitle={{ color: "ctm-bg-color-5", text: "Ready to Start" }}
            CustomData={CustomDataReadyToStart}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
          />
        )}
        {!getCampaignEndedTrigger && loggedInUserType === "Brand" && (
          <ListCampaigns
            CampaignList={campaignEndedList}
            TableTitle={{ color: "ctm-bg-color-1", text: "Ended" }}
            CustomData={CustomDataEnded}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
          />
        )}
        {!getCampaignCancelledTrigger && loggedInUserType === "Brand" && (
          <ListCampaigns
            CampaignList={campaignCancelledList}
            TableTitle={{ color: "ctm-bg-color-10", text: "Cancelled" }}
            CustomData={{}}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboardcampaigns;
