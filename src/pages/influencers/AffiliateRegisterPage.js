import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

function AffiliateRegisterPage() {
  const navigate = useNavigate();
  const signIn = useSignIn

  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_ROUTE}/api/affiliate/register`, {
        "first_name": firstname,
        "last_name": lastname,
        "email": email,
        "password": password
      })
      .then((res) => {
        if (res.data.err) {
          setError(res.data.err);
        } else {
            signIn({
              token: res.data.token,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: res.data.user_profile,
            });
          navigate("/dashboard/affiliate/profile");
        }
      })
      .catch((err) => console.log(err));
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
          <div className="m-7">Hi, Welcome to Brandaffy!</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col mx-16 my-10 bg-gray-300"
          >
            <div className="flex">
              <div className="flex flex-col flex-1">
                <label className="my-2">First Name</label>
                <input
                  required
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  onFocus={(e) => setError("")}
                ></input>
              </div>
              <div className="flex flex-col flex-1">
                <label className="my-2">Last Name</label>
                <input
                  required
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  onFocus={(e) => setError("")}
                ></input>
              </div>
            </div>
            <label className="my-2">Email</label>
            <input
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => setError("")}
            ></input>
            <label className="my-2">Password</label>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setError("")}
            ></input>
            <div>{error}</div>
            <button type="submit">Sign up</button>
            <div>
              Already have an account? <Link to="/affiliate/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:flex-1 h-full bg-red-500">2</div>
    </div>
  );
}

export default AffiliateRegisterPage;
