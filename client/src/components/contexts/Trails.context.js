import React, { createContext, useReducer } from "react";
export const CurrentAppContext = createContext();

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  isLoaded: false,
  trails: [],
  storage: false,
  isDay: true,
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
    case "day-night":
      return { ...state, isDay: true };
    case "night-day":
      return { ...state, isDay: false };
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
  const toggleDay = () => {
    dispatch({
      type: "day-night",
    });
  };
  const toggleNight = () => {
    dispatch({
      type: "night-day",
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
          toggleDay,
          toggleNight,
        },
      }}
    >
      {children}
    </CurrentAppContext.Provider>
  );
}
