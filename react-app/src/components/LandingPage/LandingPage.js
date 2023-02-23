import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import { logout } from "../../store/session";
import OpenModalButton from "./OpenModalButton";
import LoginFormModal from "./LoginFormModal/index";
import SignupFormModal from "./SignupFormModal/index";
import DemoUser from "../auth/DemoUser";
import "./LandingPage.css"
import logo from "../Images/logo.png"
import outline from "../Images/outline.png"

export default function LandingPage() {
  return (
    <div className="splash-container">

        <div className="splash-logo">
           <img src={logo} alt='logo' />
        </div>

        <div className="splash">
            <img src={outline} alt='outline' />
            <div className="buttons">

                <div className="button1">
                <OpenModalButton
                    buttonText="Login"
                    className="sign-in register"
                    modalComponent={<LoginFormModal />}
                />
                </div>

                <div className="button2">
                <OpenModalButton
                 buttonText="Signup"
                 className="signup"
                modalComponent={<SignupFormModal />}
                />
                </div>
                <div className="button3">
                    <DemoUser />
                </div>

                <div className="footers">
                    <div className="footer">Evernote clone by Tiana Huynh</div>
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
                </div>

            </div>
        </div>

    </div>
  );
}
