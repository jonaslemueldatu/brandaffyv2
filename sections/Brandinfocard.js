import React from "react";
import { useState } from "react";
import axios from "axios";
import IndustryDropdown from "../src/pages/snippets/IndustryDropdown";

function Brandinfocard(props) {
  const [profile, setProfile] = useState(props.Profile.profile_picture);
  const [myprofile] = useState(props.Myprofile);
  const [newprofile, setNewprofile] = useState("");
  const [oldprofile] = useState(props.Profile.profile_picture);

  const [editprofile, setEditprofile] = useState(false);
  const [editcontact, setEditcontact] = useState(false);
  const [profileload, setProfileload] = useState(false);
  const [contactload, setContactload] = useState(false);

  const [brandname, setBrandname] = useState(props.Profile.brand_name);
  const [about, setAbout] = useState(props.Profile.about);
  const [industry, setIndustry] = useState(props.Profile.industry);
  const [employeesize, setEmployeesize] = useState(props.Profile.employee_size);

  const [email] = useState(props.Profile.email);
  const [phonenumber, setPhonenumber] = useState(props.Profile.phone_number);
  const [address, setAddress] = useState(props.Profile.company_address);
  const [country, setCountry] = useState(props.Profile.country);

  const handleCancel = (section) => {
    switch (section) {
      case "profile":
        setProfile(props.Profile.profile_picture);
        setBrandname(props.Profile.brand_name);
        setAbout(props.Profile.about);
        setIndustry(props.Profile.industry);
        setEmployeesize(props.Profile.employee_size);
        setEditprofile(false);
        break;
      case "contact":
        setPhonenumber(props.Profile.phone_number);
        setAddress(props.Profile.address);
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
      formData.append("brand_name", brandname);
      formData.append("about", about);
      formData.append("industry", industry);
      formData.append("employee_size", employeesize);
      formData.append("type", "profile");
      formData.append("user_type", "Brand");

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
        address: address,
        country: country,
        user_type: "Brand",
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
            Profile {profileload && <span className="ctm-loaders"></span>}
          </div>
          <hr className="my-4 border-t w-full ctm-border-color-2" />
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Brand Name</label>
              {editprofile ? (
                <input
                  type="text"
                  onChange={(e) => setBrandname(e.target.value)}
                  required
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                  placeholder={brandname}
                ></input>
              ) : (
                <div className="p-4 ctm-min-width-1">{brandname}</div>
              )}
            </div>
            <div className="flex flex-1 flex-col my-4"></div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="font-bold">About</label>
              {editprofile ? (
                <textarea
                  rows="3"
                  onChange={(e) => setAbout(e.target.value)}
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
                ></textarea>
              ) : (
                <div className="p-4 ctm-min-width-1">{about}</div>
              )}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-1 flex-col my-4">
              <label className="my-2 font-bold">Industry</label>
              {editprofile ? (
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
              {editprofile ? (
                <div>
                  Around
                  <input
                    type="number"
                    onChange={(e) => setEmployeesize(e.target.value)}
                    required
                    className="p-4 mx-2 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
                    placeholder={employeesize}
                  ></input>
                  employees
                </div>
              ) : (
                <div className="p-4 ctm-min-width-1">
                  {employeesize && (
                    <span>Around {employeesize}+ employees</span>
                  )}
                </div>
              )}
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
            {contactload && <span className="ctm-loaders"></span>}
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
              <label className="my-2 font-bold">Company Address</label>
              {editcontact ? (
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
      </div>
    </div>
  );
}

export default Brandinfocard;
