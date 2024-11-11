import React, {useState, useEffect} from "react";
import "./CertificateCards.scss";
import CertificateCard from "../CertificateCard/CertificateCard.jsx";
import Button from "../Button/Button.jsx";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
const APIKey = "011ba11bdcad4fa396660c2ec447ef14";
const GETMethodName = "OSGetGoodList";
const BASEURL = "https://sycret.ru/service/api/api";

function CertificateCards() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [radio, setRadio] = useState({id: "", productType: "", primaryKey: ""});
  const [ApiError, setApiError] = useState({isError: false, info: ""});

  function handleRadioChange(id, productType, primaryKey, name, price, summa) {
    setRadio({id, productType, primaryKey, name, price, summa});
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASEURL}?MethodName=${GETMethodName}&ApiKey=${APIKey}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          setApiError((prev) => ({
            ...prev,
            isError: true,
            info: "При запросе на сервер произошла ошибка",
          }));
        }
        return response.json();
      })
      .then((response) => {
        setData(response.data);
        setApiError((prev) => ({
          ...prev,
          isError: false,
          info: "",
        }));
      })
      .catch((error) => {
        setApiError((prev) => ({
          ...prev,
          isError: true,
          info: "При запросе на сервер произошла ошибка",
        }));
        console.error("Error:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <section className="certificates">
      <h1 className="certificates__title">Выберите подарочный сертификат</h1>
      <div
        aria-live="polite"
        style={{display: "flex", flexDirection: "column"}}>
        {ApiError.isError && (
          <p className="certificate__error-msg">{ApiError.info}</p>
        )}
      </div>
      <div className="certificates__container">
        {data &&
          data.map((card) => (
            <CertificateCard
              key={card.ID}
              name={card.NAME}
              price={card.PRICE}
              desc={card.DESCRIPTION}
              summa={card.SUMMA}
              discount={card.DISCOUNT}
              productType={card.TABLENAME}
              id={card.ID}
              primaryKey={card.PRIMARYKEY}
              handleChange={handleRadioChange}
              checked={radio.id === card.ID ? true : false}></CertificateCard>
          ))}
      </div>
      <Link to="/form" state={{payload: radio}}>
        <Button disabled={!radio.id} classname="btn_buy">
          {radio.id ? "Купить" : "Выберите товар"}
        </Button>
      </Link>
    </section>
  );
}

export default CertificateCards;
