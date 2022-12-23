import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function CreateUser() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [notGoodPassword, setNotGoodPassword] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (password.length <= 6) {
      alert("Din adgangskode opfylder ikke kravene");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Adgangskoderne er ikke ens");
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password);
      navigate("/minSide");
    } catch (error) {
      alert(error);
    }

    console.log(email, password, passwordConfirm);
  }

  return (
    <div>
      <Navbar />
      <h1>Opret profil</h1>
      <form onSubmit={(e) => handleSignUp(e)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input required type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Adgangskode:</label>
          <input required type="password" name="password" /> Dit password skal
          mindst være 6 tegn
        </div>
        <div>
          <label htmlFor="passwordConfirm">Gentag adgangskode:</label>
          <input required type="password" name="passwordConfirm" />
        </div>

        <input disabled={loading} type="submit" value="Opret Profil" />
      </form>
    </div>
  );
}
