import { createContext, useEffect, useReducer } from "react";

const initailState = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
};

export const authContext = createContext(initailState);``

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
      };

    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initailState);

  useEffect(() => {
    console.log(state.user);
    if (state.user?.type === "patient") {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.setItem("doctor", JSON.stringify(state.user));
    }
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        type: state.type,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
