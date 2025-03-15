import React, { useState, useContext } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography as Text,
} from "@mui/material";

import { useNavigate } from "react-router";
import ModalUI from "../../../../UI/Modals/ModalUI";
import ModalTitle from "../../../../UI/Modals/ModalTitle";
import Form from "../../../../UI/Forms/Form";
import Field from "../../../../UI/Fields/Field";

import { urlAPI, paths } from "../../../../utils/utils";
import { AuthContext } from "../../../../context/AuthContext";

const SignUpForm = () => {
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

    const result = await fetch(urlAPI + "users/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });

    const data = await result.json();
    // console.log(data);
    if (!result.ok) throw new Error("Something went wrong! 🍰");

    if (data.detail || (data.errors && data.errors.length > 0)) {
      setMessages(data.errors || [data.detail]);
      setCollapseOpen(true);
      setLoading(false);
    } else {
      setUser(data.users);
      localStorage.setItem("tokens", JSON.stringify(data.tokens));
      navigate("/student", { replace: true });
    }
  };

  return (
    <ModalUI open={true} closePath="/">
      <ModalTitle>Crear Cuenta</ModalTitle>
      <Form
        sx={{ maxWidth: "35.6rem", minWidth: "35.6rem" }}
        onSubmit={logInFormHandler}
        messages={messages}
        loading={loading}
        collapseOpen={collapseOpen}
        setCollapseOpen={setCollapseOpen}
        submitText="Registrar"
      >
        <FormControl>
          <FormLabel id="role">Rol de Cuenta</FormLabel>
          <RadioGroup
            row
            aria-labelledby="role"
            name="role"
            defaultValue="student"
          >
            <FormControlLabel
              value="student"
              control={<Radio sx={{ color: "primary.main" }} />}
              label="Estudiante"
            />
            <FormControlLabel
              value="teacher"
              control={<Radio sx={{ color: "primary.main" }} />}
              label="Profesor"
            />
          </RadioGroup>
        </FormControl>
        <Field
          id="username-textarea"
          label="Nombre Completo"
          placeholder="Nombre Completo"
          name="full_name"
          required
          fullWidth
        />
        <Field
          id="email-textarea"
          label="Correo"
          placeholder="Correo"
          name="email"
          type="email"
          required
          fullWidth
        />
        <Field
          id="password-input"
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          autoComplete="current-password"
          name="password"
          required
          fullWidth
          helperText={
            <Text
              component="span"
              variant="caption"
              color="primary.main"
              fontWeight={500}
            >
              Tu contraseña no debe ser similar a tu información personal, no
              debe ser una contraseña común, no debe ser solo números y debe
              tener al menos 8 caracteres.
            </Text>
          }
        />
        {/*<Field
          id="password2-input"
          label="Confirmar Contraseña"
          placeholder="Confirmar Contraseña"
          type="password"
          autoComplete="current-password"
          name="password2"
          required
          fullWidth
        />*/}
      </Form>
    </ModalUI>
  );
};

export default SignUpForm;
