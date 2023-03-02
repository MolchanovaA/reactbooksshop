import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";

export default function SignIn({}) {
  const NAVIGATE = useNavigate();
  const [VISITOR, setVisitor] = useState("");
  const [VALIDATE, setValidate] = useState(false);

  useEffect(() => {
    loginValidation();
  }, [VISITOR, VALIDATE]);

  function loginValidation() {
    setValidate(VISITOR.length >= 4 && VISITOR.length <= 16);
  }

  function toSubmit(e) {
    e.preventDefault();
    NAVIGATE("/listofbooks", {
      state: { userName: VISITOR },
    });

    sessionStorage.setItem("userName", JSON.stringify({ userName: VISITOR }));
  }

  return (
    <>
      <main className="bsMain">
        <form
          className="bsMain__form"
          action="#"
          method="post"
          onSubmit={toSubmit}
        >
          <span className="bsMain__form__loginIconDef">
            <i className="fa-regular fa-face-smile"></i>
          </span>
          <span>User Name</span>
          <input
            type="text"
            name="login"
            id=""
            placeholder="Type user name"
            onChange={(e) => {
              setVisitor(e.target.value.trim());
            }}
            value={VISITOR}
          />
          <button disabled={!VALIDATE}>Submit</button>
        </form>
      </main>
    </>
  );
}
