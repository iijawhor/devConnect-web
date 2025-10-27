import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import axios from "axios";
const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  // const [showButton, setShowButton] = useState(true);
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("ERROR in review request", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/68727972c6a2d9e9421",
        {
          withCredentials: true
        }
      );
      dispatch(addRequests(res.data));
      console.log("req....", res.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests?.data) return;
  if (requests?.data.length === 0) {
    return <h1 className="flex justify-center my-10">No request Found</h1>;
  }
  return (
    <div key={requests?.data._id} className="text-center my-10">
      <h1 className="text-bold text-2xl text-whiter">Connection Requests</h1>
      {requests?.data.map((request) => (
        <div className="m-4 p-4 flex gap-1 rounded-lg bg-base-300 w-1/2 mx-auto">
          <div className="">
            {" "}
            <img
              className="w-20 h-20 border rounded-full"
              src={request?.fromUserId.photoUrl}
              alt="photo"
              srcset=""
            />
          </div>
          <div className="flex text-left mx-4">
            <h2 className="font-bold text-xl">
              {request?.fromUserId.firstName +
                " " +
                request?.fromUserId.lastName}
            </h2>
            <p>{request.fromUserId.about}</p>
            {request?.fromUserId.age && request?.fromUserId?.gender && (
              <p>
                {request?.fromUserId.age + ", " + request.fromUserId.gender}
              </p>
            )}
            {request?.fromUserId.about && <p>{request?.fromUserId?.about}</p>}
          </div>
          <div className="">
            <button
              className="btn btn-primary mx-2"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
