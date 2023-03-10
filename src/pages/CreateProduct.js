import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navgate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(crypto.randomUUID());
    const productInfo = {
      productName: e.target.productName.value,
      productBrand: e.target.productBrand.value,
      productColor: e.target.productColor.value,
      productPrice: parseFloat(e.target.productPrice.value),
      productDescription: e.target.productDescription.value,
      productImage: "https://picsum.photos/200",
      productCategory: e.target.productCategory.value,
      productCondition: e.target.productCondition.value,
      productReceipt: e.target.productReceipt.value,
      productId: crypto.randomUUID(),
      userId: currentUser.uid,
    };

    try {
      database
        .collection("products")
        .doc(productInfo.productId)
        .set(productInfo)
        .then(() => {
          database
            .collection("users")
            .doc(currentUser.uid)
            .collection("products")
            .doc(productInfo.productId)
            .set(productInfo)
            .then(() => {
              console.log("product added to user");
              setLoading(false);
            });
        });
      console.log(productInfo);
      navgate("/minSide");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div>
      {loading && <Loading />}
      <Navbar />
      <h1>Opret produkt</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="productName">Hvad vil du sælge:</label>
          <input type="text" name="productName" />
        </div>
        <div>
          <label htmlFor="productBrand">Mærke:</label>
          <input type="text" name="productBrand" />
        </div>
        <div>
          <label htmlFor="productConditon">Stand:</label>
          <select name="productCondition" id="productCondition">
            <option value="Næsten som ny">Næsten som ny</option>
            <option value="Brugt">Brugt</option>
            <option value="Slidt">Slidt</option>
          </select>
        </div>
        <div>
          <label htmlFor="productColor">Color:</label>
          <input type="text" name="productColor" />
        </div>
        <div>
          <label htmlFor="productPrice">Pris:</label>
          <input type="number" name="productPrice" />
        </div>
        <div>
          <label htmlFor="productDescription">Beskrivelse:</label>
          <textarea name="productDescription" cols="30" rows="10"></textarea>
        </div>
        <div>
          <label htmlFor="productImage">Billede:</label>
          <input type="file" name="productImage" />
        </div>
        <div>
          <label htmlFor="productCategory">Kategori:</label>
          <select name="productCategory" id="productCategory">
            <option value="Biler">Biler</option>
            <option value="Bolig">Bolig</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Fritid">Fritid</option>
            <option value="Husdyr">Husdyr</option>
            <option value="Kunst">Kunst</option>
            <option value="Møbler">Møbler</option>
            <option value="Sport">Sport</option>
            <option value="Tøj">Tøj</option>
            <option value="Andre">Andre</option>
          </select>
        </div>

        <div>
          <label htmlFor="productDelivery">Levering:</label>
          <select name="productDelivery" id="productDelivery">
            <option value="Kan afhentes">Kan afhentes</option>
            <option value="Kan leveres">Kan leveres</option>
            <option value="Kan afhentes og leveres">
              Kan afhentes og leveres
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="productReceipt">Har du kvittering:</label>
          <select name="productReceipt" id="productReceipt">
            <option value="ja">Ja</option>
            <option value="nej">Nej</option>
          </select>
        </div>
        <input className="submit" type="submit" value="Opret" />
      </form>
    </div>
  );
}
