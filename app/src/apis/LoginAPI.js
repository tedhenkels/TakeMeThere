import axios from "./Axios";

const LOGIN_URL = "/api/users/login";

export const LoginAPI = (onSuccess, onError, username, password) => {
  const data = {
    username,
    password,
  };

  axios({
    method: "post",
    url: LOGIN_URL,
    data: data,
    withCredentials: true,
  })
    .then((res) => {
      onSuccess(res.data);
    })
    .catch(onError);
};
