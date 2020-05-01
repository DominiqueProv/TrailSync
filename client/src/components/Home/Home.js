import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/trailSync.svg";
import { CurrentAppContext } from "../contexts/Trails.context";
import CircularProgress from "@material-ui/core/CircularProgress";
import SpotifyLogo from "../../assets/spotify.png";
import Create from "../Create";
const Home = () => {
  const { currentAppState } = useContext(CurrentAppContext);

  console.log(currentAppState);

  return (
    <>
      {currentAppState.isLoggedIn ? (
        <Create />
      ) : (
        <Wrapper>
          <h1 style={{ color: "white" }}>Welcome to</h1>
          <BrandImage>Logo</BrandImage>
          <a href="http://localhost:8888/login">
            <Button>
              Login With Spotify{" "}
              <img
                style={{ marginLeft: "15px" }}
                src={SpotifyLogo}
                width={20}
              />
            </Button>
          </a>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  background: rgb(0, 152, 172);
  background: linear-gradient(
    63deg,
    rgba(0, 152, 172, 1) 0%,
    rgba(0, 16, 255, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  h1 {
    font-size: 2vw;
    margin-bottom: 15px;
  }
`;

const BrandImage = styled(Logo)`
  width: 20vw;
`;

const Button = styled.button`
  color: white;
  display: flex;
  align-items: center;
  background-color: #2aa9e0;
  padding: 10px 50px 10px 40px;
  border-radius: 30px;
  border: none;
  margin-top: 50px;
  font-size: 1em;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #2593d8;
  }
`;
export default Home;
