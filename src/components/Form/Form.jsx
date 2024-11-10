import "./Form.scss";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../Button/Button.jsx";
import {useMask} from "@react-input/mask";
import {formatPhone} from "./formUtils.js";
import Loader from "../Loader/Loader.jsx";
import {InputMask} from "@react-input/mask";
const APIKey = "011ba11bdcad4fa396660c2ec447ef14";
const POSTMethodName = "OSSale";
const BASEURL = "https://sycret.ru/service/api/api";
const PHONE_PATTERN = /\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;
const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Form() {
  const navigate = useNavigate();
  let productInfo = useLocation();
  useEffect(() => {
    if (!productInfo.state || !productInfo.state.payload) {
      navigate("/");
    }
  }, []);
  const [form, setForm] = useState({
    name: "",
    phone: "+7 (___) ___-__-__",
    email: "",
  });
  const [invalid, setInvalid] = useState({
    name: false,
    phone: false,
    email: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const formInvalid = invalid.name || invalid.phone || invalid.email;

  function navigateBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
    if (e.target.value.trim()) {
      setInvalid({...invalid, [e.target.name]: false});
    } else if (!e.target.value.trim()) {
      setInvalid({...invalid, [e.target.name]: true});
    }
  }

  const nameClassName = invalid.name
    ? "form__input form__input_invalid "
    : "form__input";
  const phoneClassName = invalid.phone
    ? "form__input form__input_invalid"
    : "form__input";
  const emailClassName = invalid.email
    ? "form__input form__input_invalid"
    : "form__input";

  async function handleSubmit(e) {
    e.preventDefault();
    const isNameValid = form.name.trim();
    const isPhoneValid = validateField(form.phone, PHONE_PATTERN, "phone");
    const isEmailValid = validateField(form.email, EMAIL_PATTERN, "email");
    if (!isNameValid) {
      setInvalid((prev) => ({...prev, name: true}));
    }
    if (!isPhoneValid) {
      setInvalid((prev) => ({...prev, phone: true}));
    }
    if (!isEmailValid) {
      setInvalid((prev) => ({...prev, email: true}));
    }
    const isFormValidInitially = isNameValid && isPhoneValid && isEmailValid;
    if (!formInvalid && isFormValidInitially) {
      const URL = `${BASEURL}?MethodName=${POSTMethodName}&ApiKey=${APIKey}&Id=${
        productInfo.state.payload.id
      }&TableName=${productInfo.state.payload.productType}&PrimaryKey=${
        productInfo.state.payload.primaryKey
      }&Price=${productInfo.state.payload.price}&Summa=${
        productInfo.state.payload.summa
      }&ClientName=${form.name.trim()}&Phone=${formatPhone(
        form.phone
      )}&Email=${form.email.trim()}&PaymentTypeId=2&UseDelivery=0&DeliveryAddress=null&IsGift=0&MsgText=null&PName=null&PPhone=null`;
      setIsLoading(true);
      fetch(URL, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((response) => {
          console.log(response.data);
          navigate("/payment-redirect", {state: {payload: "success"}});
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }
  const options = {
    mask: "+7 (___) ___-__-__",
    replacement: {_: /\d/},
    showMask: true,
  };
  const phoneInputRef = useMask(options);

  //there's certainly a better way to move the cursor to the end of user's input (with the mask on the input).
  function handlePhoneInputCursor(e) {
    const input = e.target;
    const formattedValue = formatPhone(input.value);
    const valueLength = formattedValue.length;
    let moveToIndex;
    if (!formattedValue) {
      moveToIndex = 4;
    } else if (valueLength < 3) {
      moveToIndex = 4 + valueLength;
    } else if (valueLength < 6) {
      moveToIndex = 6 + valueLength;
    } else if (valueLength < 8) {
      moveToIndex = 7 + valueLength;
    } else if (valueLength < 10) {
      moveToIndex = 8 + valueLength;
    } else return;
    setTimeout(() => {
      input.setSelectionRange(moveToIndex, moveToIndex);
    }, 400);
  }

  function validateField(value, pattern, propName) {
    const isValid = pattern.test(value);
    if (isValid) {
      setInvalid((prev) => ({...prev, [propName]: false}));
    }
    return isValid;
  }
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <form className="form">
      <p className="form__subtitle">Ваша покупка:</p>
      <h1 className="form__title">{productInfo.state.payload.name}.</h1>
      <div className="form__field">
        <label htmlFor="name" className="form__label">
          ФИО:{" *"}
        </label>
        <input
          placeholder="Введите ФИО"
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={(e) => handleChange(e)}
          className={nameClassName}
        />
        {invalid.name && (
          <p className="form__message form__message_invalid">Введите ФИО</p>
        )}
      </div>
      <div className="form__field">
        <label htmlFor="phone" className="form__label">
          Номер телефона:{" *"}
        </label>
        <input
          ref={phoneInputRef}
          type="tel"
          name="phone"
          id="phone"
          value={form.phone}
          onChange={(e) => handleChange(e)}
          className={phoneClassName}
          onClick={(e) => handlePhoneInputCursor(e)}
          onFocus={(e) => handlePhoneInputCursor(e)}
        />
        {invalid.phone && (
          <p className="form__message form__message_invalid">
            Введите номер телефона
          </p>
        )}
      </div>
      <div className="form__field">
        <label htmlFor="email" className="form__label">
          Электронная почта:{" *"}
        </label>
        <input
          placeholder="Введите адрес электронной почты"
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={(e) => handleChange(e)}
          className={emailClassName}
        />
        {invalid.email && (
          <p className="form__message form__message_invalid">
            Введите адрес электронной почты
          </p>
        )}
      </div>
      <div className="form__buttons">
        <Button onClick={(e) => navigateBack(e)} classname="btn_back">
          Назад
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={formInvalid}
          classname="btn_pay">
          Оплатить
        </Button>
      </div>
    </form>
  );
}

export default Form;
