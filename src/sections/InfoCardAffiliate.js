// Props
// 1. ProfileToDisplay = The profile information to be displayed when accessing the affiliate profile
// 2. IsThisMyProfile = boolean if logged-user is viewing own profile page
// 3. ViewedProfileId = Id of the profile being Viewed

import React, { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function InfoCardAffiliate(props) {
  // Toggles the edit buttons if profile viewed is logged-in user
  const [isThisMyProfile] = useState(props.IsThisMyProfile);

  // Toggles the edit state of the sections
  const [editProfile, setEditProfile] = useState(false);
  const [editContact, seteditContact] = useState(false);

  // Loading indicator
  const [profileStillLoading, setProfileStillLoading] = useState(false);
  const [contactStillLoading, setContactStillLoading] = useState(false);

  const [profilePicture, setProfilePicture] = useState(
    props.ProfileToDisplay.profile_picture
  );
  // Store new profile picture when updating
  const [newProfilePicture, setNewProfilePicture] = useState("");
  // Store old profile picture when discarding edit
  const [oldProfilePicture] = useState(props.ProfileToDisplay.profile_picture);
  const [firstName, setFirstName] = useState(props.ProfileToDisplay.firstname);
  const [lastName, setLastName] = useState(props.ProfileToDisplay.lastname);
  const [birthDate, setBirthDate] = useState(props.ProfileToDisplay.birthdate);
  const [age, setAge] = useState(props.ProfileToDisplay.age);
  const [gender, setGender] = useState(props.ProfileToDisplay.gender);
  const [email] = useState(props.ProfileToDisplay.email);
  const [phoneNumber, setPhoneNumber] = useState(
    props.ProfileToDisplay.phone_number
  );
  const [province, setProvince] = useState(props.ProfileToDisplay.province);
  const [country, setCountry] = useState(props.ProfileToDisplay.country);

  const handleCancel = (section) => {
    switch (section) {
      case "profile":
        setProfilePicture(props.ProfileToDisplay.profile_picture);
        setFirstName(props.ProfileToDisplay.firstname);
        setLastName(props.ProfileToDisplay.lastname);
        setGender(props.ProfileToDisplay.gender);
        setBirthDate(props.ProfileToDisplay.birthdate);
        setAge(props.ProfileToDisplay.age);
        setEditProfile(false);
        break;
      case "contact":
        setPhoneNumber(props.ProfileToDisplay.phone_number);
        setProvince(props.ProfileToDisplay.province);
        setCountry(props.ProfileToDisplay.country);
        seteditContact(false);
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
      newProfilePicture === "" ? setProfilePicture(oldProfilePicture) : console.log("");
      e.preventDefault();
      const formData = new FormData();
      if (newProfilePicture) {
        formData.append("profile_picture", newProfilePicture);
      }
      formData.append("id", props.ViewedProfileId);
      formData.append("birthdate", birthDate);
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("type", "profile");
      formData.append("user_type", "Affiliate");

      await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/updateprofile`,
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
      await axios.post(`${process.env.REACT_APP_ROUTE}/api/updateprofile`, {
        type: "contact",
        id: props.ViewedProfileId,
        phone_number: phoneNumber,
        province: province,
        country: country,
        user_type: "Affiliate",
      });
      setContactStillLoading(false);
      seteditContact(false);
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
          <label htmlFor="profile-upload">
            <img
              alt="Upload user profile placeholder"
              className="rounded-lg w-60 h-60 cursor-pointer"
              src={profilePicture}
            ></img>
            <input
              hidden
              id="profile-upload"
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
              <label className="my-2 font-bold">First Name</label>
              {editProfile ? (
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={firstName}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{firstName}</div>
              )}
            </div>
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Last Name</label>
              {editProfile ? (
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={lastName}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{lastName}</div>
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="font-bold">Gender</label>

              {editProfile ? (
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
                  id="gender"
                  defaultValue={gender}
                >
                  <option className="hidden">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              ) : (
                <div className="p-4 ctm-min-width-1">{gender}</div>
              )}
            </div>
            <div className="flex flex-1 gap-3">
              <div className="flex flex-1 flex-col my-4 ctm-min-width-1">
                <label className="font-bold">Birthdate</label>
                {editProfile ? (
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
                  ></input>
                ) : (
                  <div className="p-4 ctm-min-width-1">{birthDate}</div>
                )}
              </div>
              <div className="flex w-20 flex-col my-4">
                <label className="font-bold">Age</label>
                {editProfile ? (
                  <input
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
                    placeholder={age}
                  ></input>
                ) : (
                  <div className="p-4">{age}</div>
                )}
              </div>
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={phoneNumber}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{phoneNumber}</div>
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Province</label>
              {editContact ? (
                <input
                  type="text"
                  onChange={(e) => setProvince(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={province}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{province}</div>
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
                seteditContact(true);
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

        {/*
        <div>
          <div> Something About Me</div>
          <div>Hobbies</div>
          <div>Favorite Food</div>
          <div>Niche</div>
        </div> */}
      </div>
    </div>
  );
}

export default InfoCardAffiliate;
