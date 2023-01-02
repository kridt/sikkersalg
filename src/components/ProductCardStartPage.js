import React from "react";
import { Link } from "react-router-dom";

export default function ProductCardStartPage({ product }) {
  var productPrice = product.productPrice;
  var productPriceFixed = new Intl.NumberFormat("da-DK").format(productPrice);

  function setTheLocal() {
    localStorage.setItem("product", JSON.stringify(product));
  }

  return (
    <Link
      onClick={() => setTheLocal()}
      to={"/productPage/" + product.productId}
      style={{ textDecoration: "none", color: "black", margin: "1em" }}
    >
      <div>
        <img src={product.productImage} alt="product" />
      </div>
      <div>
        <h3>{product.productName}</h3>
        <p>{productPriceFixed} kr</p>
        læs mere
      </div>
    </Link>
  );
}
