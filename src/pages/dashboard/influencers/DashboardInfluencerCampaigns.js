import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import NavigationDashboard from "../../../sections/NavigationDashboard";
import ContainerHeader from "../../../sections/ContainerHeader";
import ListCampaigns from "../../../sections/ListCampaigns";

function Dashboardcampaigns() {
  const auth = useAuthUser();

  const [viewerUserType] = useState(auth().user_type);
  const [loggedInUserId] = useState(auth().id);
  const [campaignInvitedList, setCampaignInvitedList] = useState([]);
  const [campaignAcceptedList, setCampaignAcceptedList] = useState([]);
  //   const [campaignCancelledList, setCampaignCancelledList] = useState([]);

  //UseEffect triggers
  const [getCampaignInvitedTrigger, setGetCampaignInvitedTrigger] =
    useState(true);
  const [getCampaignAcceptedTrigger, setGetCampaignAcceptedTrigger] =
    useState(true);
  //   const [getCampaignCancelledTrigger, setGetCampaignCancelledTrigger] =
  //     useState(true);
  const [getCampaignListExternalTrigger, setGetCampaignListExternalTrigger] =
    useState(true);

  // Setup Table Action Data
  const [CustomDataInvited] = useState({
    action: "Campaigns - Invited - Brand",
  });
  const [AcceptedTableActionData] = useState({});

  //Setup popup information

  //UseEffect to get List of Ready To Start Campaigns
  useEffect(() => {
    setGetCampaignInvitedTrigger(true);
    const getCampaignInvited = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlistaggregate`,
          {
            params: {
              affiliate_id: loggedInUserId,
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
  }, [loggedInUserId]);

  // UseEffect to get List of Accepted Campaigns
  useEffect(() => {
    setGetCampaignAcceptedTrigger(true);
    const getCampaignAccepted = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getlistaggregate`,
          {
            params: {
              brand_owner_id: loggedInUserId,
              status: "Accepted",
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
  }, [loggedInUserId]);

  //Useeffect to get list of cancelled campaigns
  //   useEffect(() => {
  //     setGetCampaignCancelledTrigger(true);
  //     const getCampaignCancelled = async () => {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_ROUTE}/api/campaign/getlist`,
  //           {
  //             params: {
  //               brand_owner_id: loggedInUserId,
  //               status: "Cancelled",
  //             },
  //           }
  //         );
  //         if (res.data.err) {
  //           console.log(res.data.err);
  //         } else {
  //           setCampaignCancelledList(res.data.campaign_list);
  //           setGetCampaignCancelledTrigger(false);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getCampaignCancelled();
  //   }, [loggedInUserId, getCampaignListExternalTrigger]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Campaigns"
        ViewerUserType={viewerUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Campaigns" />
        {!getCampaignAcceptedTrigger && auth().user_type === "Affiliate" && (
          <ListCampaigns
            CampaignList={campaignAcceptedList}
            TableTitle={{ color: "ctm-bg-color-1", text: "Accepted" }}
            CustomData={AcceptedTableActionData}
          />
        )}
        {!getCampaignInvitedTrigger && viewerUserType === "Affiliate" && (
          <ListCampaigns
            CampaignList={campaignInvitedList}
            TableTitle={{ color: "ctm-bg-color-1", text: "Invited" }}
            CustomData={CustomDataInvited}
            SetTrigger1={setGetCampaignListExternalTrigger}
            Trigger1={getCampaignListExternalTrigger}
          />
        )}
        {/* {!getCampaignCancelledTrigger && viewerUserType === "Brand" && (
          <ListCampaigns
            CampaignList={campaignCancelledList}
            TableTitle={{ color: "ctm-bg-color-10", text: "Cancelled" }}
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