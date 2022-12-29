import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import Loading from "../components/Loading";

export default function CreateUser() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [zipCity, setZipCity] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    var userInfo = {
      email: email,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      address: e.target.address.value,
      zipCode: e.target.zip.value,
      city: zipCity,
      phoneNumber: e.target.phone.value,
      birthDate: e.target.birthday.value,
    };
    if (password.length < 6) {
      alert("Din adgangskode opfylder ikke kravene");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Adgangskoderne er ikke ens");
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        userInfo.userId = user.uid;
        console.log(userInfo);
        database.collection("users").doc(user.uid).set(userInfo);
      });
      // ...
      setLoading(false);
      navigate("/minSide");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }

    console.log(email, password, passwordConfirm);
  }

  function zipCodeCity(e) {
    if (e.length === 4) {
      const zip = e;
      const zipCode = zip.toString();
      const url = `https://dawa.aws.dk/postnumre/${zipCode}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setZipCity(data.navn);
        });
    } else {
      setZipCity("");
    }
  }
  return (
    <div>
      {loading && <Loading />}
      <Navbar />
      <h1>Opret profil</h1>
      <form onSubmit={(e) => handleSignUp(e)}>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input required type="email" name="email" />
        </div>
        <br />
        <div>
          <label htmlFor="password">Adgangskode:</label>
          <input required type="password" name="password" />
          <br />
          Dit password skal mindst være 6 tegn
        </div>
        <br />
        <div>
          <label htmlFor="passwordConfirm">Gentag adgangskode:</label>
          <input required type="password" name="passwordConfirm" />
        </div>
        <br />
        <div>
          <label htmlFor="firstName">Fornavn:</label>
          <input required type="text" name="firstName" />
        </div>
        <br />
        <div>
          <label htmlFor="lastName">Efternavn:</label>
          <input required type="text" name="lastName" />
        </div>
        <br />
        <div>
          <label htmlFor="address">Adresse:</label>
          <input required type="text" name="address" />
        </div>
        <br />
        <div>
          <label htmlFor="zip">Postnummer:</label>
          <input
            required
            type="text"
            onChange={(e) => zipCodeCity(e.target.value)}
            name="zip"
          />
        </div>
        <br />
        <div>
          <label htmlFor="city">By:</label>
          <input required defaultValue={zipCity} type="text" name="city" />
        </div>
        <br />
        <div>
          <label htmlFor="phone">Telefon:</label>
          <input required type="tel" name="phone" />
        </div>
        <br />
        <div>
          <label htmlFor="birthday">Fødselsdag:</label>
          <input required type="date" name="birthday" />
        </div>
        <br />
        <br />
        <input disabled={loading} type="submit" value="Opret Profil" />
      </form>
    </div>
  );
}
