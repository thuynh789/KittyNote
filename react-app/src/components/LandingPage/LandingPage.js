import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "./SignupFormModal";

export default function LandingPage() {
  return (
    <div className="splash-container">
      <div className="splash-nav">
        <div className="nav-header">
          <div className="splash-name">
            <h2>KittyNote</h2>
          </div>
        </div>
        <div className="splash-login">
          <OpenModalButton
            buttonText="Login"
            className="sign-in register"
            modalComponent={<LoginFormModal />}
          />
        </div>
      </div>
      <div className="splash-signup">
        <OpenModalButton
          buttonText="Signup"
          className="signup"
          modalComponent={<SignupFormModal />}
        />
      </div>

      <footer className="splash-footer">
        <div className="leftside-footer">Evernote clone by Tiana Huynh</div>
        <div className="rightside-footer">
          <a
            className="link-footer"
            href="https://www.linkedin.com/in/tiana-huynh-58b296168/"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin fa-xl" />
          </a>
          <a
            className="link-footer"
            href="https://github.com/thuynh789/KittyNote"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-github fa-xl" />
          </a>
        </div>
      </footer>
    </div>
  );
}
