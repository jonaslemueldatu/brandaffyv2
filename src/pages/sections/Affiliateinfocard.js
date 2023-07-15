import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Affiliateinfocard(props) {
  const [profile, setProfile] = useState("");
  const [myprofile] = useState(props.Myprofile);
  const [newprofile, setNewprofile] = useState("");
  const [oldprofile, setOldprofile] = useState("");
  const [editprofile, setEditprofile] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [profileload, setProfileload] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROUTE}/api/getprofile`, {
        params: {
          id: props.Id,
        },
      })
      .then((res) => {
        if (res.data.err) {
          alert(res.data.err);
        } else {
          console.log(res.data);
          setOldprofile(res.data.user_profile.profile_picture);
          setProfile(res.data.user_profile.profile_picture);
          setFirstname(res.data.user_profile.firstname);
          setLastname(res.data.user_profile.lastname);
          setAge(res.data.user_profile.age);
          setGender(res.data.user_profile.gender);
          setBirthdate(res.data.user_profile.birthdate);
        }
      })
      .catch((err) => alert(err));
  }, [cancel, props.Id]);

  const handleCancel = (section) => {
    switch (section) {
      case "profile":
        setCancel(!cancel);
        setEditprofile(false);
        break;
      case "contact":
        console.log("hello");
        break;
      default:
        break;
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

  const updateProfile = (e) => {
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

    axios
      .post(`${process.env.REACT_APP_ROUTE}/api/updateprofile`, formData)
      .then((res) => {
        console.log(res.data.user_profile);
        setProfileload(false);
        setEditprofile(false);
        // setFirstname(res.data.user_profile.first_name);
        // setLastname(res.data.user_profile.last_name);
        // setBirthdate(birthdate);
        // setProvince(province);
        // setCountry(country);
        // setEditview(false);
      })
      .catch((err) => console.log(err));
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
          <div className="font-bold text-base flex flex-start">
            Profile {profileload && <span className="ctm-loaders"></span>}
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
                  <div className="p-4 ctm-min-width-1">{age}</div>
                )}
              </div>
            </div>
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
        {/* <div>
          <div> Contact Information</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Province</div>
          <div>Country</div>
        </div>
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
