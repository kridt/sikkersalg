import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.scss";

export default function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser != null) {
      setUserLoggedIn(true);
    }
  }, [currentUser, userLoggedIn]);

  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>
            <h1>Sikker salg</h1>
          </Link>
        </li>
        <li className="searchBar">søgebar</li>
        <li>
          {userLoggedIn ? (
            <Link to={"/minSide"}>Min profil</Link>
          ) : (
            <Link to={"/login"}>Log ind</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
