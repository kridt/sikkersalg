import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCardStartPage from "../components/ProductCardStartPage";
import { database } from "../firebase";

export default function StartPage() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const allProducts = localStorage.getItem("allProducts");

    if (allProducts) {
      setAllProducts(JSON.parse(allProducts));
      console.log("from local storage");
    } else {
      database
        .collection("products")
        .get()
        .then((snapshot) => {
          const allProducts = snapshot.docs.map((doc) => doc.data());
          setAllProducts(allProducts);
          localStorage.setItem("allProducts", JSON.stringify(allProducts));
        });

      console.log("from database");
    }
  }, []);
  console.log(allProducts);
  return (
    <div>
      <Navbar />
      <div>
        <h1>Velkommen til</h1>
        <div>
          <p>Her kan du se alle vores produkter</p>
          <div style={{ display: "flex", overflowX: "scroll", width: "80%" }}>
            {allProducts.map((product) => {
              return <ProductCardStartPage product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
