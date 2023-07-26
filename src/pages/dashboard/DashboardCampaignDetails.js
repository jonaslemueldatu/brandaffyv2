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

  //Popup States
  const [linkTiktokPopup, setLinkTiktokPopup] = useState(false);

  //Action states
  const [customData] = useState({
    action: "Campaign Details - Link Post",
  });

  const [customDataAffiliateReady] = useState({
    action: "Campaign Details - Affiliate - Ready",
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
          viewerUserType === "Affiliate" &&
          campaignDetails.status === "Ready to Start" && (
            <ContainerGeneralAction
              CustomData={customData}
              SetPopup1={setLinkTiktokPopup}
            />
          )}
        {!gettingCampaignDetails && (
          <InfoCardCampaign CampaignDetails={campaignDetails} />
        )}
        {!isGettingVidList && !gettingCampaignDetails && viewerUserType === "Affiliate" && (
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
