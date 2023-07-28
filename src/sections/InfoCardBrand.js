// Props
// 1. ProfileToDisplay = The profile information to be displayed when accessing the creator profile
// 2. IsThisMyProfile = boolean if logged-user is viewing own profile page
// 3. ViewedProfileId = Id of the profile being Viewed

import React, { useState } from "react";
import axios from "axios";

//Snippet Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import IndustryDropdown from "../snippets/IndustryDropdown";

function InfoCardBrand(props) {
  // Toggles the edit buttons if profile viewed is logged-in user
  const [isThisMyProfile] = useState(props.IsThisMyProfile);

  // Toggles the edit state of the sections
  const [editProfile, setEditProfile] = useState(false);
  const [editContact, setEditContact] = useState(false);

  // Loading indicator
  const [profileStillLoading, setProfileStillLoading] = useState(false);
  const [contactStillLoading, setContactStillLoading] = useState(false);

  const [profilePicture, setProfilePicture] = useState(
    props.ProfileToDisplay.profile_picture
  );
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [oldProfilePicture] = useState(props.ProfileToDisplay.profile_picture);

  const [brandName, setBrandName] = useState(props.ProfileToDisplay.brand_name);
  const [about, setAbout] = useState(props.ProfileToDisplay.about);
  const [industry, setIndustry] = useState(props.ProfileToDisplay.industry);
  const [employeeSize, setEmployeeSize] = useState(
    props.ProfileToDisplay.employee_size
  );

  const [email] = useState(props.ProfileToDisplay.email);
  const [phonenumber, setPhonenumber] = useState(
    props.ProfileToDisplay.phone_number
  );
  const [address, setAddress] = useState(
    props.ProfileToDisplay.company_address
  );
  const [country, setCountry] = useState(props.ProfileToDisplay.country);

  const handleCancel = (section) => {
    switch (section) {
      case "profile":
        setProfilePicture(props.ProfileToDisplay.profile_picture);
        setBrandName(props.ProfileToDisplay.brand_name);
        setAbout(props.ProfileToDisplay.about);
        setIndustry(props.ProfileToDisplay.industry);
        setEmployeeSize(props.ProfileToDisplay.employee_size);
        setEditProfile(false);
        break;
      case "contact":
        setPhonenumber(props.ProfileToDisplay.phone_number);
        setAddress(props.ProfileToDisplay.address);
        setCountry(props.ProfileToDisplay.country);
        setEditContact(false);
        break;
      default:
    }
  };

  const handlePhotochange = (e) => {
    setNewProfilePicture(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfile = async (e) => {
    try {
      setProfileStillLoading(true);
      newProfilePicture === ""
        ? setProfilePicture(oldProfilePicture)
        : console.log("");
      e.preventDefault();
      const formData = new FormData();
      if (newProfilePicture) {
        formData.append("profile_picture", newProfilePicture);
      }
      formData.append("id", props.ViewedProfileId);
      formData.append("brand_name", brandName);
      formData.append("about", about);
      formData.append("industry", industry);
      formData.append("employee_size", employeeSize);
      formData.append("type", "profile");
      formData.append("user_type", "Brand");

      await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/profile/update`,
        formData
      );
      setProfileStillLoading(false);
      setEditProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (e) => {
    setContactStillLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_ROUTE}/api/profile/update`, {
        type: "contact",
        id: props.ViewedProfileId,
        phone_number: phonenumber,
        address: address,
        country: country,
        user_type: "Brand",
      });
      setContactStillLoading(false);
      setEditContact(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4 flex-col md:flex-row flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4">
      <form
        id="profile"
        className="m-4 md:m-0 justify-center w-full md:w-80 flex flex-col md:justify-start items-center"
        onSubmit={(e) => updateProfile(e)}
      >
        {editProfile ? (
          <label htmlFor="profilePicture-upload">
            <img
              alt="Upload user profile placeholder"
              className="rounded-lg w-60 h-60 cursor-pointer"
              src={profilePicture}
            ></img>
            <input
              hidden
              id="profilePicture-upload"
              onChange={(e) => handlePhotochange(e)}
              type="file"
            ></input>
          </label>
        ) : (
          profilePicture && (
            <img
              alt="Profile placeholder"
              className="rounded-lg w-60 h-60"
              src={profilePicture}
            ></img>
          )
        )}
      </form>
      <div className="flex-1 flex flex-col">
        <div>
          <div className="font-bold text-base flex flex-start ctm-bg-color-1 rounded-sm px-4">
            Profile{" "}
            {profileStillLoading && (
              <FontAwesomeIcon
                className="mx-4 my-auto"
                icon={faSpinner}
                spin
                style={{
                  "--fa-primary-color": "#000000",
                  "--fa-secondary-color": "#000000",
                }}
              />
            )}
          </div>
          <hr className="my-4 border-t w-full ctm-border-color-2" />
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Brand Name</label>
              {editProfile ? (
                <input
                  type="text"
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={brandName}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{brandName}</div>
              )}
            </div>
            <div className="flex flex-1 flex-col my-4"></div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="font-bold">About</label>
              {editProfile ? (
                <textarea
                  rows="3"
                  onChange={(e) => setAbout(e.target.value)}
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
                  placeholder={about}
                ></textarea>
              ) : (
                <div className="p-4 ctm-min-width-1">{about}</div>
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Industry</label>
              {editProfile ? (
                <IndustryDropdown
                  SetIndustry={setIndustry}
                  Industry={industry}
                />
              ) : (
                <div className="p-4 ctm-min-width-1">{industry}</div>
              )}
            </div>
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Employee Size</label>
              {editProfile ? (
                <div>
                  Around
                  <input
                    type="number"
                    onChange={(e) => setEmployeeSize(e.target.value)}
                    required
                    className="p-4 mx-2 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                    placeholder={employeeSize}
                  ></input>
                  employees
                </div>
              ) : (
                <div className="p-4 ctm-min-width-1">
                  {employeeSize && (
                    <span>Around {employeeSize}+ employees</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {!editProfile && isThisMyProfile && (
            <button
              onClick={() => {
                setEditProfile(true);
                setProfilePicture(
                  "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/profile+upload+icon.webp"
                );
              }}
              className="mx-2 ctm-btn ctm-btn-1"
            >
              Edit
            </button>
          )}
          {editProfile && (
            <button
              onClick={() => {
                handleCancel("profile");
              }}
              className="mx-2 ctm-btn ctm-btn-2"
            >
              Cancel
            </button>
          )}
          {editProfile && (
            <button
              type="submit"
              form="profile"
              className="mx-2 ctm-btn ctm-btn-3"
            >
              Submit
            </button>
          )}
        </div>
        <hr className="my-4 border-t w-full ctm-border-color-2" />
        <div>
          <div className="font-bold text-base flex flex-start ctm-bg-color-1 rounded-sm px-4">
            Contact Information
            {contactStillLoading && (
              <FontAwesomeIcon
                className="mx-4 my-auto"
                icon={faSpinner}
                spin
                style={{
                  "--fa-primary-color": "#000000",
                  "--fa-secondary-color": "#000000",
                }}
              />
            )}
          </div>
          <hr className="my-4 border-t w-full ctm-border-color-2" />
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Email</label>
              <div className="p-4 ctm-min-width-1">{email}</div>
            </div>
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Phone Number</label>
              {editContact ? (
                <input
                  type="text"
                  onChange={(e) => setPhonenumber(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={phonenumber}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{phonenumber}</div>
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Company Address</label>
              {editContact ? (
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={address}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{address}</div>
              )}
            </div>
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Country</label>
              {editContact ? (
                <input
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={country}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{country}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {!editContact && isThisMyProfile && (
            <button
              onClick={() => {
                setEditContact(true);
              }}
              className="mx-2 ctm-btn ctm-btn-1"
            >
              Edit
            </button>
          )}
          {editContact && (
            <button
              onClick={() => {
                handleCancel("contact");
              }}
              className="mx-2 ctm-btn ctm-btn-2"
            >
              Cancel
            </button>
          )}
          {editContact && (
            <button
              onClick={(e) => updateContact(e)}
              className="mx-2 ctm-btn ctm-btn-3"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoCardBrand;
