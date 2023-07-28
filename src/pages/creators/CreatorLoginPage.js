import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";

function CreatorLoginPage() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  //Assets
  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );

  //Main section state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Functions
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/creator/login`,
        {
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
        //Check if plan is active
        res.data.user_profile.is_plan_active
          ? navigate("/dashboard/profile")
          : navigate("/dashboard/plans");
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
          src={brandlogo}
          onClick={() => navigate("/creator")}
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
              <label className="text-base my-2">Email</label>
              <input
                className="p-4 rounded-lg ctm-border-color-3 border drop-shadow-sm"
                required
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => setError("")}
                placeholder="john@email.com"
              ></input>
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-base my-2">Password</label>
              <input
                placeholder="8+ characters, 1 capital letter"
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm"
                required
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
              Login
            </button>
            <div className="my-10 text-base">
              Not registered yet?
              <Link
                className="ctm-font-color-2 cursor-pointer"
                to="/creator/register"
              >
                {" "}
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block md:flex-1 h-full ctm-bg-image-1 bg-no-repeat bg-bottom bg-cover"></div>
    </div>
  );
}

export default CreatorLoginPage;
