// npm install jwt-decode
// npm install --save-dev @babel/plugin-transform-private-property-in-object
// npm install --save-dev @babel/plugin-proposal-private-property-in-object
import { jwtDecode } from "jwt-decode";

import { useTheme, useMediaQuery } from "@mui/material";

export const url = "http://localhost:8000";
// export const url = "https://focused.co";
export const urlAPI = url + "/api/v1/";

export const userBase = { user: { id: 0 } };

export const logOut = (setUser) => {
  localStorage.removeItem("tokens");
  setUser(userBase);
};

export const refreshAccessToken = async (statusText, refresh, setUser) => {
  // if (statusText !== "Unauthorized") return false;

  const response = await fetch(urlAPI + "users/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  const responseJSON = await response.json();

  if (!response.ok) {
    logOut(setUser);
    return { refreshed: false };
    // return false;
  } else {
    localStorage.setItem(
      "tokens",
      JSON.stringify({
        access: responseJSON.access,
        refresh,
      })
    );

    return { refreshed: true };
    // return true;
  }
};

export const getTokens = () => {
  const tokensStorage = JSON.parse(localStorage.getItem("tokens"));
  let tokens = {
    refresh: "",
    access: "",
    expired: true,
  };

  if (tokensStorage) {
    tokens = {
      access: tokensStorage.access,
      refresh: tokensStorage.refresh,
      expired: Date.now() >= jwtDecode(tokensStorage.refresh).exp * 1000,
    };
  }

  if (tokens.expired) localStorage.removeItem("tokens");

  return tokens;
};

export const paths = {
  student: "student",
  parent: "parent",
  teacher: "teacher",
};

export const useIsWidthUp = (breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
};

export const useIsWidthDown = (breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};

export const prettyDate = (time) => {
  const date = new Date(time),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      // timeZone: "America/Bogota",
    });

  const r =
    (day_diff === 0 &&
      ((diff < 60 && "Justo ahora") ||
        (diff < 120 && "Hace 1 minuto") ||
        (diff < 3600 && "Hace " + Math.floor(diff / 60) + " minutos") ||
        (diff < 7200 && "Hace 1 hora") ||
        (diff < 86400 && "Hace " + Math.floor(diff / 3600) + " horas"))) ||
    (day_diff === 1 && "Ayer") ||
    (day_diff < 7 && "Hace " + day_diff + " días") ||
    (day_diff < 31 && "Hace " + Math.ceil(day_diff / 7) + " semanas");

  return r;
};

export const shortDate = (time) =>
  new Date(time)
    .toLocaleDateString("es-ES", {
      // weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "America/Bogota",
    })
    .toLowerCase();

export const prettyCountdownDate = (futureTime) => {
  const now = new Date();
  const futureDate = new Date(futureTime);
  const diff = (futureDate.getTime() - now.getTime()) / 1000;
  const day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0) return "Fecha pasada";
  else if (day_diff >= 31) return `${shortDate(futureTime)}`;

  const r =
    (day_diff === 0 &&
      ((diff < 60 && "Quedan menos de un minuto") ||
        (diff < 120 && "Queda 1 minuto") ||
        (diff < 3600 && "Quedan " + Math.floor(diff / 60) + " minutos") ||
        (diff < 7200 && "Queda 1 hora") ||
        (diff < 86400 && "Quedan " + Math.floor(diff / 3600) + " horas"))) ||
    (day_diff === 1 && "Queda 1 día") ||
    (day_diff < 7 && "Quedan " + day_diff + " días") ||
    (day_diff < 31 && "Quedan " + Math.ceil(day_diff / 7) + " semanas");

  return r;
};
