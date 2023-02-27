import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./Navigation.css"

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.session.user);

  const onLogout = async (e) => {
    await dispatch(logout());
    return history.push("/");
  };

  return (
    <button className="logout-button" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
