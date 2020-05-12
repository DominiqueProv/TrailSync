import React, { useEffect, useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { ip } from "../../constants";
const Init = () => {
  const {
    currentAppState,
    actions: { handlelogginUser, handleFetchTrail, saveLocalStorage },
  } = useContext(CurrentAppContext);

  useEffect(() => {
    fetch(`${ip}/getUserInfo`)
      .then((res) => res.json())
      .then((data) => {
        handlelogginUser(data);
      });
    fetch(`${ip}/trails`)
      .then((res) => res.json())
      .then((payload) => {
        handleFetchTrail(payload);
      });
  }, []);

  if (currentAppState.isLoggedIn && currentAppState.isLoaded) {
    handleSetData();
  }

  async function handleSetData() {
    try {
      await window.localStorage.setItem(
        "currentUser",
        JSON.stringify(currentAppState.currentUser)
      );
      await window.localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(currentAppState.isLoggedIn)
      );
      await window.localStorage.setItem(
        "trails",
        JSON.stringify(currentAppState.trails)
      );
      await window.localStorage.setItem(
        "storage",
        JSON.stringify(currentAppState.storage)
      );
      await window.localStorage.setItem(
        "firstVisit",
        JSON.stringify(currentAppState.fistVisit)
      );
    } catch (err) {
      return console.log(err);
    }
    saveLocalStorage();
  }

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
        <p>
          Millions of songs,
          <br /> thousands of hikes,
          <br /> only one like you &trade;
        </p>
        <CircularProgress style={{ color: "dodgerblue" }} size={40} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  p {
    font-size: 3vw;
    padding-bottom: 30px;
    text-align: center;
    line-height: 1.5em;
    @media (max-width: 750px) {
      font-size: 1.8em;
    }
  }
`;

export default Init;
