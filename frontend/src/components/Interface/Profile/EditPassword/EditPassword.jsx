import React, { useState } from "react";

import Form from "../../../../UI/Forms/Form";
import ModalTitle from "../../../../UI/Modals/ModalTitle";
import ModalUI from "../../../../UI/Modals/ModalUI";

import { urlAPI, getTokens, refreshAccessToken } from "../../../../utils/utils";

import Field from "../../../../UI/Fields/Field";

const EditPassword = ({ user, setUser, open, setOpen }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const editPasswordHandler = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    setCollapseOpen(false);

    const tokens = getTokens();
    const dataArr = [...new FormData(e.target)];
    const dataObj = Object.fromEntries(dataArr);

    const result = await fetch(urlAPI + `users/password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokens.access,
      },
      body: JSON.stringify(dataObj),
    });

    const data = await result.json();
    if (result.status === 401) {
      const refreshed = await refreshAccessToken(
        result.statusText,
        tokens.refresh,
        setUser
      );
      if (refreshed) editPasswordHandler(e);
      return;
    }

    if (data.detail || (data.errors && data.errors.length > 0)) {
      setMessages(data.errors || [data.detail]);
    } else {
      setMessages(data.messages);
      setSuccess(true);
      e.target.reset();
    }
    setCollapseOpen(true);
    setLoading(false);
  };

  return (
    <ModalUI open={open} setOpen={setOpen}>
      <ModalTitle>Actualizar Contraseña</ModalTitle>
      <Form
        onSubmit={editPasswordHandler}
        messages={messages}
        loading={loading}
        collapseOpen={collapseOpen}
        setCollapseOpen={setCollapseOpen}
        submitText="Actualizar"
        success={success}
      >
        <Field
          id="id_old_password"
          label="Contraseña Antigua"
          placeholder="Contraseña Antigua"
          type="password"
          name="old_password"
          autoComplete="current-password"
          required
        />
        <Field
          id="id_new_password1"
          label="Contraseña Nueva"
          placeholder="Contraseña Nueva"
          type="password"
          name="new_password1"
          autoComplete="new-password"
          required
        />
        <Field
          id="id_new_password2"
          label="Confirmar Contraseña Nueva"
          placeholder="Confirmar Contraseña Nueva"
          type="password"
          name="new_password2"
          autoComplete="new-password"
          required
        />
      </Form>
    </ModalUI>
  );
};

export default EditPassword;
