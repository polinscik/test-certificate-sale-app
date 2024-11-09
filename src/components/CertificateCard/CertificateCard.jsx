import React, {useState} from "react";
import "./CertificateCard.scss";

function CertificateCard({
  name,
  price,
  desc,
  summa,
  discount,
  productType,
  primaryKey,
  id,
  handleChange,
  checked,
}) {
  const computedClassname = checked ? "product product_checked" : "product";
  return (
    <div
      className={computedClassname}
      onClick={() =>
        handleChange(id, productType, primaryKey, name, price, summa)
      }>
      <input
        type="radio"
        name="product"
        className="product__radio"
        id={id}
        checked={checked}
        onChange={() =>
          handleChange(id, productType, primaryKey, name, price, summa)
        }
      />
      <div className="product__info">
        <p className="product__name">{name}.</p>
        <p className="product__discount">
          <em>Скидка {Math.trunc(discount)}%</em>
        </p>
        <p className="product__price">{Math.trunc(summa)} руб.</p>
        <p className="product__desc">{desc}</p>
      </div>
    </div>
  );
}

export default CertificateCard;
