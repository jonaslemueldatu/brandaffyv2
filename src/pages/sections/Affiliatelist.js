import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

import Activeindicator from "../snippets/Activeindicator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import { faMarsAndVenus } from "@fortawesome/free-solid-svg-icons";

function Affiliatelist(props) {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const [affiliatelist] = useState(props.AffiliateList);

  const handleTrClick = (id) => {
    id === auth().id.toString()
      ? navigate(`/dashboard/profile`)
      : navigate(`/dashboard/profile/${id}`);
  };

  return (
    <div className="flex-col md:flex-row flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-x-scroll">
      <table className="flex-1">
        <thead>
          <tr className="h-20 ctm-border-color-3 border-b">
            <th className="px-4 text-center">Select</th>
            <th className="px-4 text-center w-80">User</th>
            <th className="px-4 text-left w-80">Email</th>
            <th className="px-4 text-center">Gender</th>
            <th className="px-4 text-center">Age</th>
            <th className="px-4 text-left">Province</th>
            <th className="px-4 text-center">Online</th>
            <th className="px-4 text-center">Tiktok</th>
            <th className="px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {affiliatelist.map((affiliate) => {
            let genderIcon;
            switch (affiliate.gender) {
              case "Male":
                genderIcon = (
                  <FontAwesomeIcon icon={faMars} className="ctm-font-color-3" />
                );
                break;
              case "Female":
                genderIcon = (
                  <FontAwesomeIcon
                    icon={faVenus}
                    className="ctm-font-color-4"
                  />
                );
                break;
              case "Others":
                genderIcon = (
                  <FontAwesomeIcon
                    icon={faMarsAndVenus}
                    className="ctm-font-color-5"
                  />
                );
                break;
              default:
                break;
            }

            return (
              <tr
                key={affiliate._id.toString()}
                onClick={() => handleTrClick(affiliate._id.toString())}
                className="h-20 cursor-pointer"
              >
                <td className="px-4"></td>
                <td className="px-4 w-80">
                  <div className="flex justify-left items-center ">
                    <img
                      className="rounded-full h-16"
                      alt="Affiliate profile per row"
                      src={affiliate.profile_picture}
                    />{" "}
                    <span className="mx-4">
                      {affiliate.first_name} {affiliate.last_name}
                    </span>
                  </div>
                </td>
                <td className="px-4 text-left w-80">{affiliate.email}</td>
                <td className="px-4 text-center">{genderIcon}</td>
                <td className="px-4 text-center">{affiliate.age}</td>
                <td className="px-4 text-left">{affiliate.province}</td>
                <td className="px-4 text-center">
                  <Activeindicator Status={affiliate.logged_in} />
                </td>
                <td className="px-4"></td>
                <td className="px-4"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Affiliatelist;
