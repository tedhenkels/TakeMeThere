import axios from "./Axios";

const LIKE_EVENT_API_URL = "/api/events/";

export const LikeEventAPI = (onSuccess, onError, eventID, isLiked) => {
  const url = LIKE_EVENT_API_URL + eventID;
  const data = { liked: isLiked };

  axios({
    method: "post",
    url: url,
    data: data,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => onSuccess(res.data))
    .catch(onError);
};
