//Props
//1. ActiveLink = the current active sublink

import React from "react";
import { useNavigate } from "react-router-dom";

function NavigationSettings(props) {
  const navigate = useNavigate();

  const handleLink = (navLink) => {
    navigate(navLink);
    navigate(0);
  };
  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-2xl mb-4">
      <ul className="p-4">
        <li
          className={`px-6 py-3 text-base cursor-pointer border-l-4 ${
            props.ActiveLink === "Subscription"
              ? "font-bold ctm-border-color-4 ctm-font-color-7"
              : ""
          }`}
          onClick={(e) => handleLink("/dashboard/settings?subsettings=Subscription")}
        >
          Subscription
        </li>
        <li
          className={`px-6 py-3 text-base cursor-pointer border-l-4 ${
            props.ActiveLink === "Payment"
              ? "font-bold ctm-border-color-4 ctm-font-color-7"
              : ""
          }`}
          onClick={(e) => handleLink("/dashboard/settings?subsettings=Payment")}
        >
          Payment Methods
        </li>
        <li
          className={`px-6 py-3 text-base cursor-pointer border-l-4 ${
            props.ActiveLink === "Account"
              ? "font-bold ctm-border-color-4 ctm-font-color-7"
              : ""
          }`}
        >
          Account Settings
        </li>
        <li
          className={`px-6 py-3 text-base cursor-pointer border-l-4 ${
            props.ActiveLink === "Notifications"
              ? "font-bold ctm-border-color-4 ctm-font-color-7"
              : ""
          }`}
        >
          Notifications
        </li>
      </ul>
    </div>
  );
}

export default NavigationSettings;
