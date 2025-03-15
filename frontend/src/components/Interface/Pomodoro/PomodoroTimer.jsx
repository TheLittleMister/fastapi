import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography as Text,
  Grid,
  CircularProgress,
  Stack,
} from "@mui/material";

import ButtonPrimary from "../../../UI/Buttons/ButtonPrimary";
import ButtonSecondary from "../../../UI/Buttons/ButtonSecondary";

const WORK_TIME = 25 * 60; // 25 minutos en segundos
const SHORT_BREAK = 5 * 60; // 5 minutos en segundos
const LONG_BREAK = 15 * 60; // 15 minutos en segundos

const PomodoroTimer = () => {
  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false); // Indica si está en descanso
  const [pomodoroCount, setPomodoroCount] = useState(0); // Contador de Pomodoros

  // Cargar los sonidos
  const ping1 = useMemo(() => new Audio("/sounds/ping1.mp3"), []);
  const ping2 = useMemo(() => new Audio("/sounds/ping2.mp3"), []);

  // Sonido para finalizar descanso

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(WORK_TIME);
    setIsBreak(false);
    setPomodoroCount(0);
  };

  const handleSkip10Sec = () => {
    setTime((prevTime) => (prevTime > 10 ? prevTime - 10 : 0));
  };

  const handleSkip5Min = () => {
    setTime((prevTime) => (prevTime > 300 ? prevTime - 300 : 0));
  };

  const getCircleColor = () => {
    if (!isRunning) return "#636464"; // Pausa: gris oscuro
    if (isBreak) return "#2196f3"; // Descanso: azul
    return "#c15c5c"; // Trabajo normal: naranja
  };

  useEffect(() => {
    const handleTimerEnd = () => {
      setIsRunning(false);

      if (isBreak) {
        ping2.play(); // Reproducir sonido para finalizar descanso
        setTime(WORK_TIME); // Volvemos al tiempo de trabajo
        setIsBreak(false);
      } else {
        ping1.play(); // Reproducir sonido para finalizar tiempo de trabajo
        const newPomodoroCount = pomodoroCount + 1;
        setPomodoroCount(newPomodoroCount);

        // Verificamos si es hora de un descanso largo
        if (newPomodoroCount % 4 === 0) {
          setTime(LONG_BREAK);
        } else {
          setTime(SHORT_BREAK);
        }
        setIsBreak(true);
      }
    };

    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    if (time === 0) {
      handleTimerEnd(); // Lógica cuando el temporizador llega a 0
    }
    return () => clearInterval(timer);
  }, [isRunning, time, isBreak, ping1, ping2, pomodoroCount]);

  return (
    <Box
      sx={{
        textAlign: "center",
        maxWidth: "50rem",
        margin: "2rem auto",
      }}
    >
      <Text variant="h4" sx={{ marginBottom: "2rem" }}>
        {isBreak
          ? pomodoroCount % 4 === 0
            ? "Descanso Largo"
            : "Descanso Corto"
          : "Pomodoro"}
      </Text>
      <CircularProgress
        variant="determinate"
        value={
          (time /
            (isBreak
              ? pomodoroCount % 4 === 0
                ? LONG_BREAK
                : SHORT_BREAK
              : WORK_TIME)) *
          100
        }
        size={150} // Aumentamos el tamaño
        thickness={6}
        sx={{ marginBottom: "2rem", color: getCircleColor() }}
      />
      <Text
        variant="h3" // Texto más grande
        sx={{ marginBottom: "2rem", color: "#333", fontWeight: "bold" }}
      >
        {formatTime(time)}
      </Text>
      <Text variant="body1" sx={{ marginBottom: "10px", color: "#666" }}>
        Pomodoros Completados: {pomodoroCount}
      </Text>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <ButtonPrimary onClick={handleStart} disabled={isRunning}>
            Iniciar
          </ButtonPrimary>
        </Grid>
        <Grid item>
          <ButtonPrimary onClick={handlePause} disabled={!isRunning}>
            Pausar
          </ButtonPrimary>
        </Grid>
        <Grid item>
          <ButtonPrimary onClick={handleReset}>Reiniciar</ButtonPrimary>
        </Grid>
        <Stack direction="row" spacing={2}>
          <Grid item>
            <ButtonSecondary
              onClick={handleSkip10Sec}
              sx={{ marginTop: "10px" }}
            >
              Adelantar 10s
            </ButtonSecondary>
          </Grid>
          <Grid item>
            <ButtonSecondary
              onClick={handleSkip5Min}
              sx={{ marginTop: "10px" }}
            >
              Adelantar 5m
            </ButtonSecondary>
          </Grid>
        </Stack>
      </Grid>
    </Box>
  );
};

export default PomodoroTimer;
