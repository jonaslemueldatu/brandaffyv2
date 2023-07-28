import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

//Section imports
import NavigationDashboard from "../../sections/NavigationDashboard";
import ContainerHeader from "../../sections/ContainerHeader";
import InfoCardCampaign from "../../sections/InfoCardCampaign";
import ListTiktokVideos from "../../sections/ListTiktokVideos";
import ContainerGeneralAction from "../../sections/ContainerGeneralAction";

//Snippet Imports
import PopupLinkTiktokVid from "../../snippets/PopupLinkTiktokVid";
import ListCreators from "../../sections/ListCreators";
import InfoCardCampaignSummary from "../../sections/InfoCardCampaignSummary";

function DashboardCampaignDetails() {
  const auth = useAuthUser();
  const { campaignid } = useParams();

  const [viewerUserType] = useState(auth().user_type);
  const [loggedInUserID] = useState(auth().id);

  //Main data states
  const [campaignDetails, setCampaignDetails] = useState({});

  const [videoList, setVideoList] = useState([]);

  //useEffect states
  const [gettingCampaignDetails, setGettingCampaignDetails] = useState(true);
  const [videoListTrigger, setVideoListTrigger] = useState(true);
  const [isGettingVidList, setIsGettingVidList] = useState(true);
  const [isGettingAcceptedUser, setIsGettingAcceptedUser] = useState(true);
  const [isGettingInvitedUser, setIsGettingInvitedUser] = useState(true);
  const [isGettingRequestedUser, setIsGettingRequestedUser] = useState(true);

  const [acceptedUserIds, setAcceptedUserIds] = useState([]);
  const [acceptedUserList, setAcceptedUserList] = useState([]);
  const [invitedUserIds, setInvitedUserIds] = useState([]);
  const [invitedUserList, setInvitedUserList] = useState([]);
  const [requestedUserIds, setRequestedUserIds] = useState([]);
  const [requestedUserList, setRequestedUserList] = useState([]);

  //Popup States
  const [linkTiktokPopup, setLinkTiktokPopup] = useState(false);

  //Action states
  const [customData] = useState({
    action: "Campaign Details - Link Post",
  });

  const [customDataAffiliateReady] = useState({
    action: "Campaign Details - Affiliate - Ready",
  });

  const [customDataBrandAccepted] = useState({
    action: "Campaign Details - Brand - Accepted",
    displayActionButtons: false,
  });

  const [customDataBrandInvited] = useState({
    action: "Campaign Details - Brand - Invited",
    displayActionButtons: false,
  });

  const [customDataBrandRequested] = useState({
    action: "Campaign Details - Brand - Requested",
    displayActionButtons: false,
  });

  //Get Campaign Details
  useEffect(() => {
    setGettingCampaignDetails(true);
    const getCampaignDetails = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/campaign/getdetails`,
        {
          params: {
            _id: campaignid,
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        setCampaignDetails(res.data.campaign_details);
        setAcceptedUserIds(res.data.campaign_details.affiliate_list_accepted);
        setInvitedUserIds(res.data.campaign_details.affiliate_list_invited);
        setRequestedUserIds(res.data.campaign_details.affiliate_list_applied);
        setGettingCampaignDetails(false);
      }
    };

    getCampaignDetails();
  }, [campaignid]);

  //Get Video List
  useEffect(() => {
    setIsGettingVidList(true);
    const getVideoList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getvideolist`,
          {
            params: {
              user_id: loggedInUserID,
              campaign_id: campaignid,
              user_type: viewerUserType,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setIsGettingVidList(false);
        } else {
          setVideoList(res.data.video_list);
          setIsGettingVidList(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getVideoList();
  }, [loggedInUserID, campaignid, viewerUserType, videoListTrigger]);

  //Get Accepted user list
  useEffect(() => {
    setIsGettingAcceptedUser(true);

    const getAcceptedUserList = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
        {
          params: {
            _id: {
              $in: acceptedUserIds,
            },
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setIsGettingAcceptedUser(false);
      } else {
        setAcceptedUserList(res.data.affiliate_list);
        setIsGettingAcceptedUser(false);
      }
    };
    if (acceptedUserIds.length > 0) {
      getAcceptedUserList();
    } else {
      setIsGettingAcceptedUser(false);
    }
  }, [acceptedUserIds]);

  //Get Invited user list
  useEffect(() => {
    setIsGettingInvitedUser(true);

    const getInvitedUserList = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
        {
          params: {
            _id: {
              $in: invitedUserIds,
            },
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setIsGettingInvitedUser(false);
      } else {
        setInvitedUserList(res.data.affiliate_list);
        setIsGettingInvitedUser(false);
      }
    };
    if (invitedUserIds.length > 0) {
      getInvitedUserList();
    } else {
      setIsGettingInvitedUser(false);
    }
  }, [invitedUserIds]);

  //Get Requested user list
  useEffect(() => {
    setIsGettingRequestedUser(true);

    const getRequestedUserList = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
        {
          params: {
            _id: {
              $in: requestedUserIds,
            },
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setIsGettingRequestedUser(false);
      } else {
        setRequestedUserList(res.data.affiliate_list);
        setIsGettingRequestedUser(false);
      }
    };
    if (requestedUserIds.length > 0) {
      getRequestedUserList();
    } else {
      setIsGettingRequestedUser(false);
    }
  }, [requestedUserIds]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard ViewerUserType={viewerUserType} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        {!gettingCampaignDetails && (
          <ContainerHeader
            Title={`Campaign - ${campaignDetails.campaign_name}`}
          />
        )}
        {!gettingCampaignDetails &&
          viewerUserType === "Creator" &&
          campaignDetails.status === "Ready to Start" &&
          acceptedUserIds.indexOf(loggedInUserID) >= 0 && (
            <ContainerGeneralAction
              CustomData={customData}
              SetPopup1={setLinkTiktokPopup}
            />
          )}
        {!gettingCampaignDetails && (
          <InfoCardCampaign CampaignDetails={campaignDetails} />
        )}

        {!gettingCampaignDetails && viewerUserType === "Brand" && (
          <InfoCardCampaignSummary />
        )}

        {!isGettingAcceptedUser &&
          viewerUserType === "Brand" &&
          !gettingCampaignDetails &&
          campaignDetails.status !== "Cancelled" && (
            <ListCreators
              CustomData={customDataBrandAccepted}
              AffiliateList={acceptedUserList}
              Title="Accepted"
            />
          )}

        {!isGettingInvitedUser &&
          viewerUserType === "Brand" &&
          !gettingCampaignDetails &&
          campaignDetails.status === "Ready to Start" && (
            <ListCreators
              CustomData={customDataBrandInvited}
              AffiliateList={invitedUserList}
              Title="Invited"
            />
          )}

        {!isGettingRequestedUser &&
          viewerUserType === "Brand" &&
          !gettingCampaignDetails &&
          campaignDetails.status === "Ready to Start" && (
            <ListCreators
              CustomData={customDataBrandRequested}
              AffiliateList={requestedUserList}
              Title="Requested"
            />
          )}

        {!isGettingVidList &&
          !gettingCampaignDetails &&
          viewerUserType === "Creator" && (
            <ListTiktokVideos
              VideoList={videoList}
              CustomData={customDataAffiliateReady}
              SetTrigger1={setVideoListTrigger}
              Trigger1={videoListTrigger}
              CampaignStatus={campaignDetails.status}
            />
          )}
      </div>
      {linkTiktokPopup && !gettingCampaignDetails && (
        <PopupLinkTiktokVid
          SetLinkTiktokPopup={setLinkTiktokPopup}
          BrandOwnerId={campaignDetails.brand_owner_id}
          SetTrigger1={setVideoListTrigger}
          Trigger1={videoListTrigger}
        />
      )}
    </div>
  );
}

export default DashboardCampaignDetails;
