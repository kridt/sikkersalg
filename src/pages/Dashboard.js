import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { signOut, currentUser } = useAuth();
  const navigate = useNavigate();
  const [validateEmail, setValidateEmail] = useState([
    "Din email er ikke valideret",
    "Tryk her for at validere din email",
    false,
  ]);
  const [validateButton, setValidateButton] = useState(false);
  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  function handleValidateEmail() {
    console.log("validate pressed");
    const newText = ["Din email er ikke valideret", "Send igen", true];
    setValidateButton(true);

    setTimeout(() => {
      setValidateButton(false);
    }, 60000);

    currentUser.sendEmailVerification();
    setValidateEmail(newText);
  }

  console.log(validateEmail);
  return (
    <div>
      <Navbar />
      <h1>Din side</h1>

      <div>
        <p>Lidt info om dig</p>
        <div>
          <p>Email: {currentUser?.email}</p>
          <div>
            {currentUser?.emailVerified ? (
              <>Din email er bekræftet</>
            ) : (
              <>
                <p>{validateEmail[0]}</p>
                <button
                  disabled={validateButton}
                  onClick={() => handleValidateEmail()}
                >
                  {validateEmail[1]}
                </button>
                {validateEmail[2] ? (
                  <div>
                    <p>
                      Tjek din email, hvis du ikke får en mail, vent 1 minut og
                      prøv igen
                    </p>
                    <p>Husk at tjekke din spam</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          signOut();
          window.location.reload();
          navigate("/");
        }}
      >
        Log ud
      </button>
    </div>
  );
}
