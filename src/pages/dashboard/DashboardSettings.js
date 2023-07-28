import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useLocation } from "react-router-dom";

//Section imports
import NavigationDashboard from "../../sections/NavigationDashboard";
import ContainerHeader from "../../sections/ContainerHeader";
import NavigationSettings from "../../sections/NavigationSettings";

function DashboardSettings() {
  const auth = useAuthUser();
  //Get URL -> Search params
  const { search } = useLocation();
  const subSettings = new URLSearchParams(search);

  const [currentSetting, setCurrentSetting] = useState(
    subSettings.get("subsettings")
  );
  const [viewerUserType] = useState(auth().user_type);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Account Settings"
        ViewerUserType={viewerUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title={`Account Settings - ${currentSetting} `} />
        <div className="flex flex-wrap -mx-3 overflow-hidden sm:-mx-8 md:-mx-6 lg:-mx-8">
          <div className="my-3 px-3 w-full overflow-hidden sm:my-8 sm:px-8 sm:w-full md:my-2 md:px-2 md:w-4/12 lg:my-8 lg:px-8 xl:my-8 xl:px-8">
            <NavigationSettings ActiveLink={currentSetting} />
          </div>
          <div className="my-3 px-3 w-full overflow-hidden sm:my-8 sm:px-8 sm:w-full md:my-2 md:px-2 md:w-8/12 lg:my-8 lg:px-8 xl:my-8 xl:px-8"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSettings;
