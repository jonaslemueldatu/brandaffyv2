import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

//Section import
import NavigationDashboard from "../../../sections/NavigationDashboard";
import ContainerHeader from "../../../sections/ContainerHeader";
import ListCreators from "../../../sections/ListCreators";

function DashboardBoxDetails() {
  const auth = useAuthUser();
  //Get boxid from Link parameters
  const { boxid } = useParams();

  const [loggedInUserType] = useState(auth().user_type);
  const [box, setBox] = useState({ box_label: "" });
  const [creatorList, setCreatorList] = useState([]);

  //Useeffect Triggers
  const [getBoxDetailsTrigger, setGetBoxDetailsTrigger] = useState(true);
  const [getBoxDetailsExternalTrigger, setGetBoxDetailsExternalTrigger] =
    useState(false);

  //Popup states/information
  const [customData] = useState({
    action: "Creator Box - Details - Brand",
    boxId: boxid,
    displayActionButtons: true,
  });

  useEffect(() => {
    setGetBoxDetailsTrigger(true);

    const getBoxDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/box/getbox`,
          {
            params: {
              box_id: boxid,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setBox(res.data.box_details);
          if (res.data.box_details.creator_list.length !== 0) {
            const res2 = await axios.get(
              `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
              {
                params: {
                  _id: {
                    $in: res.data.box_details.creator_list,
                  },
                },
              }
            );
            if (res2.data.err) {
            } else {
              setCreatorList(res2.data.creator_list);
              setGetBoxDetailsTrigger(false);
            }
          } else {
            setCreatorList([]);
            setGetBoxDetailsTrigger(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBoxDetails();
  }, [boxid, getBoxDetailsExternalTrigger]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Creator Box"
        LoggedInUserType={loggedInUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        {!getBoxDetailsTrigger && (
          <ContainerHeader Title={`Creator Box - ${box.box_label}`} />
        )}
        {!getBoxDetailsTrigger && (
          <ListCreators
            CreatorList={creatorList}
            CustomData={customData}
            SetTrigger1={setGetBoxDetailsExternalTrigger}
            Trigger1={getBoxDetailsExternalTrigger}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardBoxDetails;
