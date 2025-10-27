import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res.data?.users));
    } catch (error) {
      console.log("Error in feed...", error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (feed?.length <= 0) {
    return <h1 className="flex justify-center my-10">No new user found</h1>;
  }
  return (
    <div>
      {feed?.map((feed) => (
        <div key={feed?._id} className="flex justify-center">
          <UserCard user={feed} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
