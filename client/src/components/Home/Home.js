import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/trailSync.svg";
import { Link } from "react-router-dom";
import SpotifyLogo from "../../assets/spotify-red.png";
const Home = () => {
  let loggedIn = window.localStorage.getItem("isLoggedIn");
  console.log(loggedIn);

  return (
    <>
      <Wrapper>
        <h1 style={{ color: "#ff0000" }}>Welcome to</h1>
        <BrandImage>Logo</BrandImage>
        {loggedIn ? (
          <Link to="/map">
            <Button>Let's explore</Button>
          </Link>
        ) : (
          <a href="https://trailsync.herokuapp.com/login">
            {/* <a href="http://localhost:8888/login"> */}
            <Button>
              Login with Spotify{" "}
              <img
                style={{ marginLeft: "15px" }}
                src={SpotifyLogo}
                width={20}
                alt="logo"
              />
            </Button>
          </a>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background: #ebf5ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  h1 {
    font-size: 2vw;
    margin-bottom: 15px;
    @media (max-width: 750px) {
      font-size: 1.2em;
    }
  }
`;

const BrandImage = styled(Logo)`
  width: 20vw;
  @media (max-width: 750px) {
    width: 200px;
  }
`;

const Button = styled.button`
  color: dodgerblue;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 30px 10px 25px;
  border-radius: 30px;
  border: 1px solid #ff0000;
  margin-top: 30px;
  font-size: 1em;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  box-shadow: 11px 10px 9px -6px rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s ease-in;
`;
export default Home;
