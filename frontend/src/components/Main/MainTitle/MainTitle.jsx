import React, { useEffect, useState } from "react";
import { Typography as Text, Box, Stack } from "@mui/material";
import ButtonPrimary from "../../../UI/Buttons/ButtonPrimary";
import ButtonSecondary from "../../../UI/Buttons/ButtonSecondary";
import * as styles from "./MainTitleStyles";
import "./MainTitle.css"; // Import the CSS file

import LoginIcon from "@mui/icons-material/Login";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Link } from "react-router";

const messages = [
  "Transforma tus ideas en acciones",
  "Organiza tu día, alcanza tus metas",
  "La productividad comienza aquí",
  "Haz más con menos esfuerzo",
  "Tu éxito, nuestra misión",
];

const MainTitle = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 500); // Tiempo de la animación de salida
    }, 15000); // Cambia el mensaje cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <Box flex={1} sx={styles.MainTitle}>
      <Text
        variant="h2"
        fontWeight={700}
        className={fade ? "fade-in" : "fade-out"}
      >
        {messages[currentMessage]}
      </Text>
      <br />
      <Text variant="h6" fontWeight={400}>
        Maneja tus tiempos y tareas de forma eficiente, en un solo lugar.
      </Text>
      <br />
      <br />
      <Stack sx={styles.stackButtons}>
        <Link to="signup/" tabIndex={-1}>
          <ButtonPrimary tabIndex={-1} startIcon={<SaveAltIcon />}>
            Registrarse
          </ButtonPrimary>
        </Link>
        <Link to="login/" tabIndex={-1}>
          <ButtonSecondary tabIndex={-1} startIcon={<LoginIcon />}>
            Ingresar
          </ButtonSecondary>
        </Link>
      </Stack>
    </Box>
  );
};

export default MainTitle;
