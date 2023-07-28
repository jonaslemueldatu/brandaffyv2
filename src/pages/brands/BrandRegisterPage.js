import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

//Snippet Imports
import DropdownBusinessType from "../../snippets/DropdownBusinessType";

function BrandRegisterPage() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  //Assets
  const [brandLogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );

  //Main States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [brandName, setBrandname] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("CORPORATION");

  //Handle display of errors
  const [error, setError] = useState("");

  //Functions
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/register`,
        {
          business_name: businessName,
          brand_name: brandName,
          business_type: businessType,
          email: email,
          password: password,
          user_type: "Brand",
        }
      );

      if (res.data.err) {
        setError(res.data.err);
      } else {
        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: res.data.user_profile,
        });
        navigate("/dashboard/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 h-full flex flex-col">
        <img
          className="h-40 w-40 m-7 cursor-pointer"
          alt="Brandaffy colored logo"
          src={brandLogo}
          onClick={() => navigate("/")}
        ></img>
        <div className="flex-1 flex justify-start flex-col">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col mx-16 my-10"
          >
            <div className="my-7 text-4xl font-bold">
              Hi, Welcome to Brandaffy!
            </div>
            <div className="my-2 flex flex-col">
              <label className="my-2">Business Name</label>
              <input
                required
                placeholder="Business Name"
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm"
                type="text"
                onChange={(e) => setBusinessName(e.target.value)}
                onFocus={(e) => setError("")}
              ></input>
            </div>
            <div className="flex gap-3">
              <div className="my-2 flex flex-1 flex-col">
                <label className="my-2">Brand Name</label>
                <input
                  required
                  placeholder="Brand Name"
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm"
                  type="text"
                  onChange={(e) => setBrandname(e.target.value)}
                  onFocus={(e) => setError("")}
                ></input>
              </div>
              <div className="my-2 flex flex-1 flex-col">
                <label className="my-2">Business Type</label>
                <DropdownBusinessType
                  SetState1={setBusinessType}
                  State1={businessType}
                />
              </div>
            </div>
            <div className="my-2 flex flex-col">
              <label className="my-2">Email</label>
              <input
                required
                placeholder="john@email.com"
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => setError("")}
              ></input>
            </div>
            <div className="my-2 flex flex-col">
              <label className="my-2">Password</label>
              <input
                required
                placeholder="8+ characters, 1 capital letter"
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => setError("")}
              ></input>
            </div>
            <div className="my-4 text-red-500">{error}</div>
            <button
              className="my-4 p-3 text-white font-medium ctm-bg-color-2 rounded-lg drop-shadow-sm"
              type="submit"
            >
              Sign up
            </button>
            <div className="my-10 text-base">
              Already have an account?{" "}
              <Link
                className="ctm-font-color-2 cursor-pointer"
                to="/brand/login"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block md:flex-1 h-full ctm-bg-image-2 bg-no-repeat bg-center bg-cover"></div>
    </div>
  );
}

export default BrandRegisterPage;
