import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import NavigationDashboard from "../../../sections/NavigationDashboard";
import ContainerHeader from "../../../sections/ContainerHeader";
import ListCreatorBox from "../../../sections/ListCreatorBox";
import ContainerActionGeneral from "../../../sections/ContainerGeneralAction";

//Snippet imports
import PopupCreateBox from "../../../snippets/PopupCreateBox";

function DashboardCreatorBox() {
  const auth = useAuthUser();

  const [loggedInUserId] = useState(auth().id);
  const [loggedInUserType] = useState(auth().user_type);

  const [boxList, setBoxList] = useState([]);

  // Trigger the useEffect
  const [getBoxListTrigger, setGetBoxListTrigger] = useState(true);
  const [getBoxListExternalTrigger, setGetBoxListExternalTrigger] =
    useState(false);

  // Popup information
  const [createBoxPopup, setCreateBoxPopup] = useState(false);
  const [customData] = useState({
    action: "Creator Box - Brand",
  });

  useEffect(() => {
    setGetBoxListTrigger(true);
    const getBoxList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/box/getlist`,
          {
            params: {
              brand_owner_id: loggedInUserId,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setBoxList([]);
          setGetBoxListTrigger(false);
        } else {
          setBoxList(res.data.brandbox_list);
          setGetBoxListTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBoxList();
  }, [loggedInUserId, getBoxListExternalTrigger]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Creator Box"
        LoggedInUserType={loggedInUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Creator Box" />
        {!getBoxListTrigger && (
          <ContainerActionGeneral
            SetPopup1={setCreateBoxPopup}
            CustomData={customData}
          />
        )}
        {!getBoxListTrigger && (
          <ListCreatorBox
            BoxList={boxList}
            SetGetBoxListTrigger={setGetBoxListExternalTrigger}
            GetBoxListTrigger={getBoxListExternalTrigger}
          />
        )}
      </div>
      {createBoxPopup && !getBoxListTrigger && (
        <PopupCreateBox
          SetCreateBoxPopup={setCreateBoxPopup}
          SetGetBoxListTrigger={setGetBoxListExternalTrigger}
          GetBoxListTrigger={getBoxListExternalTrigger}
          BoxOwnerId={loggedInUserId}
        />
      )}
    </div>
  );
}

export default DashboardCreatorBox;
