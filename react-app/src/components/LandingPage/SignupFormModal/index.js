import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <h1 className="signup-head">Sign Up</h1>
      <form className="signup" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
          className="sign1"
            type="email"
            value={email}
            minLength='1'
            maxLength='100'
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            className="sign2"
            type="text"
            value={username}
            minLength='1'
            maxLength='20'
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="sign3"
            type="password"
            value={password}
            minLength='1'
            maxLength='50'
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            className="sign4"
            type="password"
            value={confirmPassword}
            placeholder='confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className='but2' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
