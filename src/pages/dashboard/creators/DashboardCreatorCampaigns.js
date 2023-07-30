import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import NavigationDashboard from "../../../sections/NavigationDashboard";
import ContainerHeader from "../../../sections/ContainerHeader";
import ListCampaigns from "../../../sections/ListCampaigns";

function Dashboardcampaigns() {
  const auth = useAuthUser();

  const [loggedInUserType] = useState(auth().user_type);
  const [loggedInUserId] = useState(auth().id);
  const [campaignInvitedList, setCampaignInvitedList] = useState([]);
  const [campaignAcceptedList, setCampaignAcceptedList] = useState([]);
  // const [campaignAppliedList, setCampaignAppliedList] = useState([]);

  //UseEffect triggers
  const [getCampaignInvitedTrigger, setGetCampaignInvitedTrigger] =
    useState(true);
  const [getCampaignAcceptedTrigger, setGetCampaignAcceptedTrigger] =
    useState(true);
  // const [getCampaignAppliedTrigger, setGetCampaignAppliedTrigger] =
  //   useState(true);
  const [getCampaignListExternalTrigger, setGetCampaignListExternalTrigger] =
    useState(true);

  // Setup Table Action Data
  const [CustomDataInvited] = useState({
    action: "Campaigns - Invited - Creator",
  });
  const [AcceptedTableActionData] = useState({
    action: "Campaigns - Accepted - Creator",
  });

  //Setup popup information

  //UseEffect to get List of Invited Campaigns
  useEffect(() => {
    setGetCampaignInvitedTrigger(true);
    const getCampaignInvited = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlistaggregate`,
          {
            params: {
              creator_id: loggedInUserId,
              relationship_status: "Invited",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignInvitedList(res.data.campaign_list);
          setGetCampaignInvitedTrigger(false);
        }
        setGetCampaignInvitedTrigger(false);
      } catch (error) {}
    };

    getCampaignInvited();
  }, [loggedInUserId, getCampaignListExternalTrigger]);

  // UseEffect to get List of Accepted Campaigns
  useEffect(() => {
    setGetCampaignAcceptedTrigger(true);
    const getCampaignAccepted = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlistaggregate`,
          {
            params: {
              creator_id: loggedInUserId,
              relationship_status: "Accepted",
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setCampaignAcceptedList(res.data.campaign_list);
          setGetCampaignAcceptedTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCampaignAccepted();
  }, [loggedInUserId, getCampaignListExternalTrigger]);

  // Useeffect to get list of Applied campaigns
  // useEffect(() => {
  //   setGetCampaignAppliedTrigger(true);
  //   const getCampaignApplied = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_ROUTE}/api/campaign/getlistaggregate`,
  //         {
  //           params: {
  //             creator_id: loggedInUserId,
  //             relationship_status: "Applied",
  //           },
  //         }
  //       );
  //       if (res.data.err) {
  //         console.log(res.data.err);
  //       } else {
  //         setCampaignAppliedList(res.data.campaign_list);
  //         setGetCampaignAppliedTrigger(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCampaignApplied();
  // }, [loggedInUserId, getCampaignListExternalTrigger]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Campaigns"
        LoggedInUserType={loggedInUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Campaigns" />
        {!getCampaignAcceptedTrigger && auth().user_type === "Creator" && (
          <ListCampaigns
            CampaignList={campaignAcceptedList}
            TableTitle={{ color: "ctm-bg-color-1", text: "Accepted" }}
            CustomData={AcceptedTableActionData}
            Accordion={true}
          />
        )}
        {!getCampaignInvitedTrigger && loggedInUserType === "Creator" && (
          <ListCampaigns
            CampaignList={campaignInvitedList}
            TableTitle={{ color: "ctm-bg-color-1", text: "Invited" }}
            CustomData={CustomDataInvited}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
            Accordion={false}
          />
        )}
        {/* {!getCampaignAppliedTrigger && loggedInUserType === "Creator" && (
          <ListCampaigns
            CampaignList={campaignAppliedList}
            TableTitle={{ color: "ctm-bg-color-1", text: "Applied" }}
            CustomData={{}}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
          />
        )} */}
      </div>
    </div>
  );
}

export default Dashboardcampaigns;
