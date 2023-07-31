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

  const [loggedInUserType] = useState(auth().user_type);
  const [loggedInUserID] = useState(auth().id);

  //Main data states
  const [campaignDetails, setCampaignDetails] = useState({});

  const [videoList, setVideoList] = useState([]);

  //useEffect states
  const [gettingCampaignDetails, setGettingCampaignDetails] = useState(true);
  const [videoListTrigger, setVideoListTrigger] = useState(true);
  const [isGettingVidList, setIsGettingVidList] = useState(true);

  //Accepted State
  const [isGettingAcceptedUser, setIsGettingAcceptedUser] = useState(true);
  const [pageAccepted, setPageAccepted] = useState(1);
  const [searchAccepted, setSearchAccepted] = useState("");
  const [totalAccepted, setTotalAccepted] = useState(0);
  const limitAccepted = 5;

  //Invited State
  const [isGettingInvitedUser, setIsGettingInvitedUser] = useState(true);
  const [pageInvited, setPageInvited] = useState(1);
  const [searchInvited, setSearchInvited] = useState("");
  const [totalInvited, setTotalInvited] = useState(0);
  const limitInvited = 5;

  //Requested State
  const [isGettingRequestedUser, setIsGettingRequestedUser] = useState(true);
  const [pageRequested, setPageRequested] = useState(1);
  const [searchRequested, setSearchRequested] = useState("");
  const [totalRequested, setTotalRequested] = useState(0);
  const limitRequested = 5;

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

  const [customDataCreatorReady] = useState({
    action: "Campaign Details - Creator - Ready",
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
        setAcceptedUserIds(res.data.campaign_details.creator_list_accepted);
        setInvitedUserIds(res.data.campaign_details.creator_list_invited);
        setRequestedUserIds(res.data.campaign_details.creator_list_applied);
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
              user_type: loggedInUserType,
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
  }, [loggedInUserID, campaignid, loggedInUserType, videoListTrigger]);

  //Get Accepted user list
  useEffect(() => {
    setIsGettingAcceptedUser(true);

    const getAcceptedUserList = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
        {
          params: {
            search: searchAccepted,
            page: pageAccepted - 1,
            limit: limitAccepted,
            list: acceptedUserIds,
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setIsGettingAcceptedUser(false);
      } else {
        setTotalAccepted(acceptedUserIds.length);
        setAcceptedUserList(res.data.creator_list);
        setIsGettingAcceptedUser(false);
      }
    };
    if (acceptedUserIds.length > 0) {
      getAcceptedUserList();
    } else {
      setIsGettingAcceptedUser(false);
    }
  }, [acceptedUserIds, pageAccepted, searchAccepted]);

  //Get Invited user list
  useEffect(() => {
    setIsGettingInvitedUser(true);

    const getInvitedUserList = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
        {
          params: {
            search: searchInvited,
            page: pageInvited - 1,
            limit: limitInvited,
            list: invitedUserIds,
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setIsGettingInvitedUser(false);
      } else {
        setTotalInvited(invitedUserIds.length);
        setInvitedUserList(res.data.creator_list);
        setIsGettingInvitedUser(false);
      }
    };
    if (invitedUserIds.length > 0) {
      getInvitedUserList();
    } else {
      setIsGettingInvitedUser(false);
    }
  }, [invitedUserIds, pageInvited, searchInvited]);

  //Get Requested user list
  useEffect(() => {
    setIsGettingRequestedUser(true);

    const getRequestedUserList = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
        {
          params: {
            search: searchRequested,
            page: pageRequested - 1,
            limit: limitRequested,
            list: requestedUserIds,
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setIsGettingRequestedUser(false);
      } else {
        setTotalRequested(requestedUserIds.length);
        setRequestedUserList(res.data.creator_list);
        setIsGettingRequestedUser(false);
      }
    };
    if (requestedUserIds.length > 0) {
      getRequestedUserList();
    } else {
      setIsGettingRequestedUser(false);
    }
  }, [requestedUserIds, pageRequested, searchRequested, limitRequested]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard LoggedInUserType={loggedInUserType} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        {!gettingCampaignDetails && (
          <ContainerHeader
            Title={`Campaign - ${campaignDetails.campaign_name}`}
          />
        )}
        {!gettingCampaignDetails &&
          loggedInUserType === "Creator" &&
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

        {!gettingCampaignDetails && loggedInUserType === "Brand" && (
          <InfoCardCampaignSummary />
        )}

        {loggedInUserType === "Brand" &&
          !gettingCampaignDetails &&
          campaignDetails.status !== "Cancelled" && (
            <ListCreators
              CustomData={customDataBrandAccepted}
              CreatorList={acceptedUserList}
              Title="Accepted"
              SetState1={setPageAccepted}
              SetState2={setSearchAccepted}
              State1={pageAccepted}
              State2={totalAccepted}
              State3={limitAccepted}
              State4={searchAccepted}
              State5={isGettingAcceptedUser}
            />
          )}

        {loggedInUserType === "Brand" &&
          !gettingCampaignDetails &&
          campaignDetails.status === "Ready to Start" && (
            <ListCreators
              CustomData={customDataBrandInvited}
              CreatorList={invitedUserList}
              Title="Invited"
              SetState1={setPageInvited}
              SetState2={setSearchInvited}
              State1={pageInvited}
              State2={totalInvited}
              State3={limitInvited}
              State4={searchInvited}
              State5={isGettingInvitedUser}
            />
          )}

        {loggedInUserType === "Brand" &&
          !gettingCampaignDetails &&
          campaignDetails.status === "Ready to Start" && (
            <ListCreators
              CustomData={customDataBrandRequested}
              CreatorList={requestedUserList}
              Title="Requested"
              SetState1={setPageRequested}
              SetState2={setSearchRequested}
              State1={pageRequested}
              State2={totalRequested}
              State3={limitRequested}
              State4={searchRequested}
              State5={isGettingRequestedUser}
            />
          )}

        {!isGettingVidList &&
          !gettingCampaignDetails &&
          loggedInUserType === "Creator" && (
            <ListTiktokVideos
              VideoList={videoList}
              CustomData={customDataCreatorReady}
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
