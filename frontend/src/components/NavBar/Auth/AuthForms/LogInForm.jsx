import React, { useState, useContext } from "react";
import { Typography as Text } from "@mui/material";

import * as styles from "./LogInFormStyles";
import { Link, Route, Routes, useNavigate } from "react-router";
import ModalUI from "../../../../UI/Modals/ModalUI";
import ModalTitle from "../../../../UI/Modals/ModalTitle";
import Form from "../../../../UI/Forms/Form";
import Field from "../../../../UI/Fields/Field";

import { urlAPI, paths } from "../../../../utils/utils";
import { AuthContext } from "../../../../context/AuthContext";
import PasswordResetForm from "./ResetForms/PasswordResetForm";
import PasswordResetConfirmForm from "./ResetForms/PasswordResetConfirmForm";

const Content = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const logInFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCollapseOpen(false);

    if (Boolean(user.id)) return;

    const dataArr = [...new FormData(e.target)];
    const dataObj = Object.fromEntries(dataArr);

    const result = await fetch(urlAPI + "users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });

    console.log(result);

    const data = await result.json();

    console.log(data);

    // if (!result.ok) throw new Error("Something went wrong! 🍰");

    if (data.detail || (data.errors && data.errors.length > 0)) {
      console.log("HEY");
      setMessages(data.errors || [data.detail]);
      setCollapseOpen(true);
      setLoading(false);
    } else {
      console.log("YOU!");
      setUser(data.user);
      // localStorage.setItem("tokens", JSON.stringify(data.tokens));
      navigate("/student", { replace: true });
    }
  };

  return (
    <ModalUI open={true} closePath="/">
      <ModalTitle>Iniciar Sesión</ModalTitle>
      <Form
        sx={styles.form}
        onSubmit={logInFormHandler}
        messages={messages}
        loading={loading}
        collapseOpen={collapseOpen}
        setCollapseOpen={setCollapseOpen}
        submitText="Ingresar"
      >
        <Field
          id="outlined-textarea"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          required
          fullWidth
        />
        <Field
          id="outlined-password-input"
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          autoComplete="current-password"
          name="password"
          required
          fullWidth
          helperText={
            <Link to="password_reset/">
              <Text
                component="span"
                variant="caption"
                color="primary.main"
                fontWeight={500}
                sx={styles.forgot}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
          }
        />
      </Form>
    </ModalUI>
  );
};

const LogInForm = () => {
  return (
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="password_reset/" element={<PasswordResetForm />} />
      <Route
        path="password_reset/confirm/:token"
        element={<PasswordResetConfirmForm />}
      />
    </Routes>
  );
};

export default LogInForm;
