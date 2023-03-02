import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    history.push('/home')
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <>
      <h1 className="login">Log In</h1>
      <form className = 'login-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="lab1">
          Email
          <input
            type="email"
            value={email}
            minLength='1'
            maxLength='100'
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="lab2">
          Password
          <input
            type="password"
            value={password}
            minLength='1'
            maxLength='50'
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='but1' type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
