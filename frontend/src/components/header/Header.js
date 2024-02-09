import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import userContext from "../../UserContext";
import { LoginAPI } from "../../apis/LoginAPI";

const loginTitle = (user) => {
  if (user?.first_name) {
    return `Hi, ${user?.first_name}!`;
  }
  return "Login";
};

const HeaderNavButton = ({ path, title, onClick }) => {
  return (
    <div className="header-button" onClick={() => onClick(path)}>
      {title}
    </div>
  );
};

export const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    if (user === undefined) {
      const onError = (error) => console.log(error);

      LoginAPI(setUser, onError);
    }
    console.log("hello from header");
  }, [setUser, user]);

  const navigateToPage = (path) => {
    navigate(path);
  };

  const loginOrRedirect = (path) => {
    if (user !== undefined) {
      navigate(path);
    } else {
      const loginModal = document.getElementById("login-modal");
      loginModal.showModal();
    }
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="Title">Take Me There</div>
        <div className="header-button-container">
          <HeaderNavButton path="/home" title="Home" onClick={navigateToPage} />
          <HeaderNavButton
            path="/events"
            title="Events"
            onClick={navigateToPage}
          />
          <HeaderNavButton
            path={`/user/${user?.username}`}
            title={loginTitle(user)}
            onClick={loginOrRedirect}
          />
        </div>
      </div>
    </div>
  );
};
