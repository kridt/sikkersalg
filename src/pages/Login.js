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
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Adgangskode:</label>
          <input type="password" name="password" />
        </div>
        <input
          disabled={loading}
          className="submit"
          type="submit"
          value="Log Ind"
        />

        <p>
          Har du ikke en profil? Lav en <Link to={"/opretBruger"}>Her</Link>
        </p>
      </form>
    </div>
  );
}
