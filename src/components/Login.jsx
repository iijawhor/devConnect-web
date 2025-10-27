import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async () => {
    console.log("Handle clicked");

    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password
        },
        { withCredentials: true } // ✅ Include cookies if using tokens
      );
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  const handleSignup = async () => {
    console.log("Handle clicked");

    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email: emailId,
          password
        },
        { withCredentials: true } // ✅ Include cookies if using tokens
      );
      dispatch(addUser(response.data.data));
      return navigate("/profile");
    } catch (error) {
      console.log(error);
      setError("error in signup...", error);
    }
  };
  return (
    <div className="flex justify-center my-10 items-center">
      <div className="card card-dash border flex bg-base-300 w-96">
        <div className="card-body flex items-center">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div className="w-full">
            {!isLoginForm && (
              <>
                <fieldset className="fieldset mY-2">
                  <legend className="fieldset-legend">First name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset mY-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset mY-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset mY-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <p>{error?.response?.data || "Something went wrong!"}</p>
          <div className="card-actions justify-end mY-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? " Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="flex justify-center mu-2"
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {isLoginForm ? "New User? Sign Up here" : "Existing user? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
