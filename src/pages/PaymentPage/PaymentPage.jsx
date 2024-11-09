import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function PaymentPage() {
  let redirectCheck = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!redirectCheck.state) {
      navigate("/");
    }
  }, []);

  return <div style={{fontWeight: "500", fontSize: "1.5rem"}}>Оплата...</div>;
}

export default PaymentPage;
