import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, _id } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm m-1">
      <figure>
        <img src={user?.photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        {firstName && (
          <h2 className="card-title">{firstName + " " + lastName}</h2>
        )}
        {age && gender && <p>{age + ", " + gender}</p>}
        {about && <p>{about}</p>}

        <div className="card-actions justify-end m-4">
          <button
            className="btn btn-primary"
            onClick={(v) => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
