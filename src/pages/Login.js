import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import "./Login.scss";

export default function Login() {
  const { login, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogIn(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("log in pressed");

    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      navigate("/minSide");
    } catch (error) {
      alert(error);
      setLoading(false);
    }

    console.log(currentUser);
  }
  return (
    <div>
      <Navbar />
      <h1>Log ind på Sikker salg</h1>

      <form onSubmit={(e) => handleLogIn(e)}>
        <label htmlFor="email">Email:</label>
        <br />
        <input type="email" id="email" name="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" id="password" name="password" />
        <br />
        <br />
        <button type="submit">Log In</button>
        <p>
          Har du ikke en profil? Lav en <Link to={"/opretBruger"}>Her</Link>
        </p>

        <div
          style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button className="fb-button">Log in with Facebook</button>

          <button className="google-button">Log in with Google</button>
        </div>
      </form>
    </div>
  );
}
