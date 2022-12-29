import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";

export default function Dashboard() {
  const { signOut, currentUser } = useAuth();
  const navigate = useNavigate();
  const [validateEmail, setValidateEmail] = useState([
    "Din email er ikke valideret",
    "Tryk her for at validere din email",
    false,
  ]);
  const [myProducts, setMyProducts] = useState([]);
  const [validateButton, setValidateButton] = useState(false);

  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    database
      .collection("users")
      .doc(currentUser?.uid)
      .collection("products")
      .onSnapshot((snapshot) => {
        setMyProducts(snapshot.docs.map((doc) => doc.data()));
      });
  }, [currentUser.uid]);
  console.log(myProducts);
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

      <Link to="/createProduct">Opret produkt her!</Link>
      <br />
      <br />
      <button
        onClick={() => {
          signOut();
          window.location.reload();
          navigate("/");
        }}
      >
        Log ud
      </button>
      <br />
      <br />

      <div>
        <p>
          Her kan du se dine produkter, du har {myProducts?.length} på listen
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "1em",
          }}
        >
          {myProducts?.map((product) => {
            return (
              <div
                style={{ backgroundColor: "grey", marginBottom: "1em" }}
                key={product.productId}
              >
                <p>{product.productName}</p>
                <p>{product.productBrand}</p>
                <p>{product.productColor}</p>
                <p>{product.productPrice} kr</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
