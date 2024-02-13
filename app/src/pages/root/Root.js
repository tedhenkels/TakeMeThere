import { Outlet } from "react-router-dom";
import "./Root.css";
import { LoginModal, login } from "../../components/login/LoginModal";
import { Header } from "../../components/header/Header";

export const Root = () => {
  return (
    <div id="root">
      <Header />
      <LoginModal />
      <div className="content-container">
          <div className="content" >
            <Outlet />
          </div>
      </div>
    </div>
  );
};
