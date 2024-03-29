import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";

import { CurrentAppContext } from "../contexts/Trails.context";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ip } from "../../constants";

const Init = () => {
  const {
    currentAppState,
    actions: { handlelogginUser, handleFetchTrail, saveLocalStorage },
  } = useContext(CurrentAppContext);
  let parsed = queryString.parse(window.location.hash);
  let access_token = parsed.access_token;
  window.localStorage.setItem("tokens", access_token);

  useEffect(() => {
    if (access_token) {
      fetch(`${ip}/getUserInfo`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ access_token: access_token }),
      })
        .then((res) => res.json())
        .then((data) => {
          handlelogginUser(data);
        });
      fetch(`${ip}/trails`)
        .then((res) => res.json())
        .then((payload) => {
          handleFetchTrail(payload);
        });
    }
  }, []);

  if (currentAppState.isLoggedIn && currentAppState.isLoaded) {
    handleSetData();
  }

  async function handleSetData() {
    try {
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(currentAppState.currentUser)
      );
      window.localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(currentAppState.isLoggedIn)
      );
      window.localStorage.setItem(
        "trails",
        JSON.stringify(currentAppState.trails)
      );
      window.localStorage.setItem(
        "storage",
        JSON.stringify(currentAppState.storage)
      );
      window.localStorage.setItem(
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
