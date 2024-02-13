import "./LoginModal.css";
import { useState, useContext } from "react";
import userContext from "../../UserContext";
import { LoginAPI } from "../../apis/LoginAPI";

export const LoginModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);

  const closeModal = () => {
    setUsername("");
    setPassword("");

    document.getElementById("login-modal").close();
  };

  const submit = (e) => {
    const onSuccess = (data) => {
      setUser(data);
      document.getElementById("login-modal").close();
    };

    const onError = (error) => {
      console.log(error);
    };

    LoginAPI(onSuccess, onError, username, password);
  };

  return (
    <dialog id="login-modal">
      <div
        id="login-modal-close-button"
        className="button"
        onClick={closeModal}
      >
        &#9746;
      </div>
      <div id="login-modal-content">
        <div className="login-modal-input">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-modal-input">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="login-modal-button">
        <button onClick={submit}>Submit</button>
      </div>
    </dialog>
  );
};
