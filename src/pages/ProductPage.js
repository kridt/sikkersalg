import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { database } from "../firebase";
import "./ProductPage.scss";

export default function ProductPage() {
  const [seller, setSeller] = useState({});
  const product = JSON.parse(localStorage.getItem("product"));
  const price = new Intl.NumberFormat("da-DK").format(product.productPrice);
  console.log(product);

  useEffect(() => {
    database
      .collection("users")
      .doc(product.userId)
      .get()
      .then((doc) => setSeller(doc.data()));
  }, [product?.userId]);

  return (
    <div>
      <Navbar />
      <div className="productPage">
        <div>
          <h1 style={{ textAlign: "left" }}>{product.productName}</h1>
          <h3>{price} Kr.</h3>
          <div style={{ marginTop: "2em" }}>
            <img src={product.productImage} alt="product" />
          </div>
          <div className="productInfo">
            <p>{product.productDescription}</p>
          </div>
        </div>
        <div className="contactInfoUser">
          <h3>Sælger oplysninger</h3>
          <div>
            <p>{seller.firstName}</p>
            <p>
              {seller.zipCode} {seller.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
