import React, { createContext, useState, useEffect } from "react";

import {
  getTokens,
  refreshAccessToken,
  urlAPI,
  userBase,
} from "../utils/utils";
// import ButtonLoading from "../UI/Buttons/ButtonLoading";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(userBase);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tokens = getTokens();

    if (!tokens.expired) {
      const getUser = async (tokens) => {
        const result = await fetch(urlAPI + "users/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokens.access,
          },
        });

        const data = await result.json();

        if (!result.ok) {
          const refreshed = await refreshAccessToken(
            result.statusText,
            tokens.refresh,
            setUser
          );
          if (refreshed) getUser(getTokens());
          else setReady(true);
          return;
        } else {
          setUser({ ...data, tokens });
          setReady(true);
        }
      };

      getUser(tokens);
    } else setReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {ready ? (
        props.children
      ) : (
        // <ButtonLoading loading>Cargando...</ButtonLoading>
        <div>Cargando...</div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
