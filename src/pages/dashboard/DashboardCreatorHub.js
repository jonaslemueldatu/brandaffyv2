import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import NavigationDashboard from "../../sections/NavigationDashboard";
import ContainerHeader from "../../sections/ContainerHeader";
import ListCreators from "../../sections/ListCreators";

//Snippet imports
import PopupAddTobox from "../../snippets/PopupAddToBox";
import PopupInviteCampaign from "../../snippets/PopupInviteCampaign";

function Dashboardcreatorhub() {
  const auth = useAuthUser();

  const [loggedInUserType] = useState(auth().user_type);
  const [creatorList, setCreatorList] = useState({});

  // Trigger the useEffect
  const [getCreatorListTrigger, setGetCreatorListTrigger] = useState(true);

  // Popup information
  const [addToBoxPopup, setAddToBoxPopup] = useState(false);
  const [inviteCampaignPopup, setInviteCampaignPopup] = useState(false);

  //State for search sort filter
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const limit = 3;

  const [clickedProfileId, setClickedProfileId] = useState("");

  // Action displayed may differ based on Viewer user type
  const [customData] = useState({
    action:
      loggedInUserType === "Brand"
        ? "Creator Hub - Brand"
        : "Creator Hub - Creator",
    displayActionButtons: loggedInUserType === "Brand" ? true : false,
  });

  useEffect(() => {
    const getCreatorList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
          {
            params: {
              search: search,
              page: page - 1,
              limit: limit,
            },
          }
        );
        setTotal(res.data.total);
        setCreatorList(res.data.creator_list);
        setGetCreatorListTrigger(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (search !== "") {
      const delayDebounceFn = setTimeout(() => {
        setGetCreatorListTrigger(true);
        getCreatorList();
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setGetCreatorListTrigger(true);
      getCreatorList();
    }
  }, [search, limit, page]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Creator Hub"
        LoggedInUserType={loggedInUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Creator Hub" />
        <ListCreators
          CreatorList={creatorList}
          CustomData={customData}
          SetPopup1={setAddToBoxPopup}
          SetPopup2={setInviteCampaignPopup}
          SetClickedProfileId={setClickedProfileId}
          SetState1={setPage}
          SetState2={setSearch}
          State1={page}
          State2={total}
          State3={limit}
          State4={search}
          State5={getCreatorListTrigger}
        />
      </div>
      {addToBoxPopup && !getCreatorListTrigger && (
        <PopupAddTobox
          SetAddToBoxPopup={setAddToBoxPopup}
          ViewedProfileId={clickedProfileId}
        />
      )}
      {inviteCampaignPopup && !getCreatorListTrigger && (
        <PopupInviteCampaign
          SetInviteCampaignPopup={setInviteCampaignPopup}
          ViewedProfileId={clickedProfileId}
        />
      )}
    </div>
  );
}

export default Dashboardcreatorhub;
