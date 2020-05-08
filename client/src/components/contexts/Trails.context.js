import React, { createContext, useReducer } from "react";
export const CurrentAppContext = createContext();

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  isLoaded: false,
  trails: [],
  storage: false,
};

function currentAppReducer(state, action) {
  switch (action.type) {
    case "loggin-spotify":
      return {
        ...state,
        currentUser: action.user,
        isLoggedIn: true,
      };
    case "loading-success":
      return { ...state, trails: action.trails.payload, isLoaded: true };
    case "save-storage":
      return { ...state, storage: true };
    case "logout":
      window.localStorage.clear();
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        trails: [],
        isLoaded: false,
        storage: false,
      };
    default:
      throw new Error("Should not get there!");
  }
}

export function CurrentAppProvider({ children }) {
  const [currentAppState, dispatch] = useReducer(
    currentAppReducer,
    initialState
  );
  const handleFetchTrail = (payload) => {
    dispatch({
      type: "loading-success",
      trails: { payload },
    });
  };
  const handlelogginUser = (data) => {
    dispatch({
      type: "loggin-spotify",
      user: { data },
    });
  };
  const saveLocalStorage = () => {
    dispatch({
      type: "save-storage",
    });
  };

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  return (
    <CurrentAppContext.Provider
      value={{
        currentAppState,
        actions: {
          handleFetchTrail,
          handlelogginUser,
          saveLocalStorage,
          logout,
        },
      }}
    >
      {children}
    </CurrentAppContext.Provider>
  );
}
