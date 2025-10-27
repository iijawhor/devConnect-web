import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/edit-profile",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex gap-2 justify-center my-10">
      <div className="flex justify-center mx-10 items-center">
        <div className="card card-dash border flex bg-base-300 w-96">
          <div className="card-body flex items-center">
            <h2 className="card-title">Edit Profile</h2>
            <div className="w-full">
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
              <fieldset className="fieldset mY-2">
                <legend className="fieldset-legend">Photo</legend>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset mY-2">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset mY-2">
                <legend className="fieldset-legend">Gender </legend>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset mY-2">
                <legend className="fieldset-legend">About </legend>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            {/* <p>{error?.response?.data || "Something went wrong!"}</p> */}
            <div className="card-actions justify-end mY-2">
              <button onClick={saveProfile} className="btn btn-primary">
                Save
              </button>
            </div>
            {}
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
