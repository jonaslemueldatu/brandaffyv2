import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";

function AffiliateLoginPage() {
  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = useSignIn()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_ROUTE}/api/affiliate/login`, {
        email: email,
        password: password,
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
            <label className="my-2">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => setError("")}
            ></input>
            <label className="my-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setError("")}
            ></input>
            <div>{error}</div>
            <button type="submit">Login</button>
            <div>Not registered yet? <Link to='/affiliate/register'>Create an Account</Link></div>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:flex-1 h-full bg-red-500">2</div>
    </div>
  );
}

export default AffiliateLoginPage;
