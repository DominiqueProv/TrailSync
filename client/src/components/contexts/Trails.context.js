import React, { createContext, useReducer } from "react";
export const CurrentAppContext = createContext();

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  isLoaded: false,
  trails: [],
  images: [],
};

function currentAppReducer(state, action) {
  switch (action.type) {
    case "loggin-spotify":
      localStorage.setItem("user", state);
      return {
        ...state,
        currentUser: action.user,
        isLoggedIn: true,
      };
    case "loading-app":
      // localStorage.setItem("trails", state);
      return { ...state, trails: action.trails.payload, isLoaded: true };
    case "loading-images":
      // localStorage.setItem("images", state);
      return { ...state, images: action.images.payload };
    case "logout":
      // localStorage.setItem("trails", state);
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        trails: [],
        isLoaded: false,
        images: [],
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
      type: "loading-app",
      trails: { payload },
    });
  };
  const handleFetchImages = (payload) => {
    dispatch({
      type: "loading-images",
      images: { payload },
    });
  };
  const handlelogginUser = (data) => {
    dispatch({
      type: "loggin-spotify",
      user: { data },
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
          handleFetchImages,
          handlelogginUser,
          logout,
        },
      }}
    >
      {children}
    </CurrentAppContext.Provider>
  );
}
