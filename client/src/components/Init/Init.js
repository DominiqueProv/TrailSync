import React, { useEffect, useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import Maps from "../Maps";
import { useHistory, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Init = () => {
  const {
    currentAppState,
    actions: {
      handlelogginUser,
      handleFetchTrail,
      handleFetchImages,
      saveLocalStorage,
    },
  } = useContext(CurrentAppContext);

  if (
    currentAppState.isLoggedIn &&
    currentAppState.images !== [] &&
    currentAppState.isLoaded
  ) {
    console.log(currentAppState);
  }

  useEffect(() => {
    fetch("/getUserInfo")
      .then((res) => res.json())
      .then((data) => {
        handlelogginUser(data);
      });
    fetch("/trails")
      .then((res) => res.json())
      .then((payload) => {
        handleFetchTrail(payload);
      });
    fetch("/images")
      .then((res) => res.json())
      .then((payload) => {
        handleFetchImages(payload);
      });
  }, []);

  let localstorageCompleted;

  if (
    currentAppState.isLoggedIn &&
    currentAppState.isImages &&
    currentAppState.isLoaded
  ) {
    handleSetData();

    console.log(currentAppState);
  }

  function handleSetData() {
    window.localStorage.setItem(
      "currentUser",
      JSON.stringify(currentAppState.currentUser)
    );
    window.localStorage.setItem(
      "isLoggedIn",
      JSON.stringify(currentAppState.isLoggedIn)
    );
    window.localStorage.setItem(
      "isImages",
      JSON.stringify(currentAppState.isImages)
    );
    window.localStorage.setItem(
      "trails",
      JSON.stringify(currentAppState.trails)
    );
    window.localStorage.setItem(
      "images",
      JSON.stringify(currentAppState.images)
    );
    window.localStorage.setItem(
      "storage",
      JSON.stringify(currentAppState.storage)
    );
    saveLocalStorage();
  }

  // const history = useHistory();
  // if (currentAppState.storage) {
  //   history.push("/map");
  // }

  if (currentAppState.storage) {
    return (
      <Redirect
        to={{
          pathname: "/map",
        }}
      />
    );
  }

  return (
    <>
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export default Init;
