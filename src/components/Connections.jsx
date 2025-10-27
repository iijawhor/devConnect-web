import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true
    });
    dispatch(addConnections(res.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) {
    return <h1>No Connection Found</h1>;
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl text-whiter">Connections</h1>
      {connections?.data.map((connection) => (
        <div className="m-4 p-4 flex gap-1 rounded-lg bg-base-300 w-1/2 mx-auto">
          <div className="">
            {" "}
            <img
              className="w-20 h-20 border rounded-full"
              src={connection.photoUrl}
              alt="photo"
              srcset=""
            />
          </div>
          <div className="flex text-left mx-4">
            <h2 className="font-bold text-xl">
              {connection.firstName + " " + connection.lastName}
            </h2>
            <p>{connection.about}</p>
            {connection.age && connection.gender && (
              <p>{connection.age + ", " + connection.gender}</p>
            )}
            {connection.about && <p>{connection.about}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
