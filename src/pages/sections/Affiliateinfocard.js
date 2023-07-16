import React from "react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Affiliateinfocard(props) {
  const [profile, setProfile] = useState(props.Profile.profile_picture);
  const [myprofile] = useState(props.Myprofile);
  const [newprofile, setNewprofile] = useState("");
  const [oldprofile] = useState(props.Profile.profile_picture);
  const [editprofile, setEditprofile] = useState(false);
  const [editcontact, setEditcontact] = useState(false);
  const [profileload, setProfileload] = useState(false);
  const [contactload, setContactload] = useState(false);

  const [firstname, setFirstname] = useState(props.Profile.firstname);
  const [lastname, setLastname] = useState(props.Profile.lastname);
  const [birthdate, setBirthdate] = useState(props.Profile.birthdate);
  const [age, setAge] = useState(props.Profile.age);
  const [gender, setGender] = useState(props.Profile.gender);
  const [email] = useState(props.Profile.email);
  const [phonenumber, setPhonenumber] = useState(props.Profile.phone_number);
  const [province, setProvince] = useState(props.Profile.province);
  const [country, setCountry] = useState(props.Profile.country);

  const handleCancel = (section) => {
    switch (section) {
      case "profile":
        setProfile(props.Profile.profile_picture);
        setFirstname(props.Profile.firstname);
        setLastname(props.Profile.lastname);
        setGender(props.Profile.gender);
        setBirthdate(props.Profile.birthdate);
        setAge(props.Profile.age);
        setEditprofile(false);
        break;
      case "contact":
        setPhonenumber(props.Profile.phone_number);
        setProvince(props.Profile.province);
        setCountry(props.Profile.country);
        setEditcontact(false);
        break;
      default:
    }
  };

  const handlePhotochange = (e) => {
    setNewprofile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfile = async (e) => {
    try {
      setProfileload(true);
      newprofile === "" ? setProfile(oldprofile) : console.log("");
      e.preventDefault();
      const formData = new FormData();
      if (newprofile) {
        formData.append("profile_picture", newprofile);
      }
      formData.append("id", props.Id);
      formData.append("birthdate", birthdate);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("type", "profile");
      formData.append("user_type", "Affiliate");

      await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/updateprofile`,
        formData
      );
      setProfileload(false);
      setEditprofile(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (e) => {
    setContactload(true);
    try {
      await axios.post(`${process.env.REACT_APP_ROUTE}/api/updateprofile`, {
        type: "contact",
        id: props.Id,
        phone_number: phonenumber,
        province: province,
        country: country,
        user_type: "Affiliate",
      });
      setContactload(false);
      setEditcontact(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-col md:flex-row flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4">
      <form
        id="profile"
        className="justify-center w-full md:w-80 flex flex-col md:justify-start items-center"
        onSubmit={(e) => updateProfile(e)}
      >
        {editprofile ? (
          <label htmlFor="profile-upload">
            <img
              alt="Upload user profile placeholder"
              className="rounded-lg w-60 h-60 my-10 cursor-pointer"
              src={profile}
            ></img>
            <input
              hidden
              id="profile-upload"
              onChange={(e) => handlePhotochange(e)}
              type="file"
            ></input>
          </label>
        ) : (
          profile && (
            <img
              alt="Profile placeholder"
              className="rounded-lg w-60 h-60 my-10"
              src={profile}
            ></img>
          )
        )}
      </form>
      <div className="flex-1 flex flex-col">
        <div>
          <div className="font-bold text-base flex flex-start ctm-bg-color-1 rounded-sm px-4">
            Profile{" "}
            {profileload && (
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
              {editprofile ? (
                <input
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={firstname}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{firstname}</div>
              )}
            </div>
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Last Name</label>
              {editprofile ? (
                <input
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={lastname}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{lastname}</div>
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="font-bold">Gender</label>

              {editprofile ? (
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
                {editprofile ? (
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                    className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
                  ></input>
                ) : (
                  <div className="p-4 ctm-min-width-1">{birthdate}</div>
                )}
              </div>
              <div className="flex w-20 flex-col my-4">
                <label className="font-bold">Age</label>
                {editprofile ? (
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
          {!editprofile && myprofile && (
            <button
              onClick={() => {
                setEditprofile(true);
                setProfile(
                  "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/profile+upload+icon.webp"
                );
              }}
              className="mx-2 ctm-btn ctm-btn-1"
            >
              Edit
            </button>
          )}
          {editprofile && (
            <button
              onClick={() => {
                handleCancel("profile");
              }}
              className="mx-2 ctm-btn ctm-btn-2"
            >
              Cancel
            </button>
          )}
          {editprofile && (
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
            {contactload && (
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
              {editcontact ? (
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
              <label className="my-2 font-bold">Province</label>
              {editcontact ? (
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
              {editcontact ? (
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
          {!editcontact && myprofile && (
            <button
              onClick={() => {
                setEditcontact(true);
              }}
              className="mx-2 ctm-btn ctm-btn-1"
            >
              Edit
            </button>
          )}
          {editcontact && (
            <button
              onClick={() => {
                handleCancel("contact");
              }}
              className="mx-2 ctm-btn ctm-btn-2"
            >
              Cancel
            </button>
          )}
          {editcontact && (
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

export default Affiliateinfocard;
