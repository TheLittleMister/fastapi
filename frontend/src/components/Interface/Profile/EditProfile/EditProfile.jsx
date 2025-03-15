import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Box,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Form from "../../../../UI/Forms/Form";
import ModalTitle from "../../../../UI/Modals/ModalTitle";
import ModalUI from "../../../../UI/Modals/ModalUI";
import Field from "../../../../UI/Fields/Field";

import * as styles from "./EditProfileStyles";

import { urlAPI, getTokens, refreshAccessToken } from "../../../../utils/utils";

const EditProfile = ({ user, setUser, open, setOpen }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);

  // Form States
  const [gender, setGender] = useState(user.gender || "");

  // user.birth 1999-03-25
  const [birth, setBirth] = useState(user.birth ? new Date(user.birth) : null);

  const editProfileHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCollapseOpen(false);

    const tokens = getTokens();
    const dataArr = [...new FormData(e.target)];
    const dataObj = Object.fromEntries(dataArr);

    const birth_ = new Date(birth);
    birth_.setHours(0, 0, 0, 0);

    dataObj["birth"] = birth_ ? birth_ : "";

    const result = await fetch(urlAPI + `users/user/`, {
      method: "PUT",
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
      if (refreshed) editProfileHandler(e);
      return;
    }

    if (data.detail || (data.errors && data.errors.length > 0)) {
      setMessages(data.errors || [data.detail]);
      setCollapseOpen(true);
    } else {
      setUser(data.user);
      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <ModalUI open={open} setOpen={setOpen}>
      <ModalTitle>Actualizar Datos</ModalTitle>
      <Form
        onSubmit={editProfileHandler}
        messages={messages}
        loading={loading}
        collapseOpen={collapseOpen}
        setCollapseOpen={setCollapseOpen}
        submitText="Actualizar"
      >
        <Stack sx={styles.stack}>
          <Field
            id="outlined-textarea"
            label="Usuario"
            placeholder="Usuario"
            name="username"
            defaultValue={user.username}
            required
          />
          <Field
            id="outlined-textarea"
            label="Correo"
            placeholder="Correo"
            name="email"
            type="email"
            defaultValue={user.email}
            required
          />
        </Stack>

        <Stack sx={styles.stack}>
          <Field
            id="outlined-textarea"
            label="Nombres"
            placeholder="Nombres"
            name="first_name"
            defaultValue={user.first_name}
            required
          />
          <Field
            id="outlined-textarea"
            label="Apellidos"
            placeholder="Apellidos"
            name="last_name"
            defaultValue={user.last_name}
            required
          />
        </Stack>

        <Stack sx={styles.stack}>
          <FormControl sx={{ width: "25rem" }}>
            <InputLabel id="demo-simple-select-label">Género</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="gender"
              name="gender"
              required
              onChange={(e) => setGender(e.target.value)}
              sx={styles.gender}
            >
              <MenuItem value="female">Femenino</MenuItem>
              <MenuItem value="male">Masculino</MenuItem>
            </Select>
          </FormControl>
          <Field
            id="outlined-textarea"
            label="Número de documento"
            placeholder="Número de documento"
            name="document"
            type="number"
            defaultValue={user.document}
            required
          />
        </Stack>

        <Stack sx={styles.stack}>
          <Box sx={{ width: "25rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="birth_date"
                format="dd/MM/yyyy"
                label="Fecha de nacimiento"
                value={birth}
                onChange={(newValue) => {
                  setBirth(newValue);
                }}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    required: true,
                    sx: styles.datepicker,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          <Field
            id="outlined-textarea"
            label="Celular"
            placeholder="+57 (315) 6180639"
            name="phone"
            defaultValue={user.phone}
            type="text"
            required
          />
        </Stack>
      </Form>
    </ModalUI>
  );
};

export default EditProfile;
