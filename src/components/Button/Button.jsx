import React, {forwardRef} from "react";
import "./Button.scss";

const Button = forwardRef(function Button(
  {onClick, disabled = false, classname, type, children},
  ref
) {
  return (
    <button
      type={type}
      ref={ref}
      className={`btn ${classname}`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
});
export default Button;
