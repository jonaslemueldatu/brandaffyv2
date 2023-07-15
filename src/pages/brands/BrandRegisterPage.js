import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";

function BrandRegisterPage() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [brandname, setBrandname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/register`,
        {
          brand_name: brandname,
          email: email,
          password: password,
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
          className="h-40 w-40 m-7"
          alt="Brandaffy colored logo"
          src={brandlogo}
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
            <div className="my-2 flex flex-col">
              <label className="my-2">Email</label>
              <input
                required
                placeholder="john@email.com"
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm"
                type="text"
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
      <div className="hidden lg:block md:flex-1 h-full ctm-bg-image-1 bg-no-repeat bg-bottom bg-cover"></div>
    </div>
  );
}

export default BrandRegisterPage;
