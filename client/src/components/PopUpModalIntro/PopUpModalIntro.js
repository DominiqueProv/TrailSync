import React, { useState, useRef, useEffect, useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
// import { Button } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import Vinyl from "../../assets/711.gif";

const PopUpModalIntro = ({ open, toggle }) => {
  const { currentAppState } = useContext(CurrentAppContext);
  let history = useHistory();
  let user;

  if (currentAppState.storage || localStorage.getItem("currentUser")) {
    user = JSON.parse(localStorage.getItem("currentUser"));
  }

  const wrapperRef = useRef(null);

  return (
    <WrapperSearch ref={wrapperRef} data-css="Typehead-Wrapper" open={open}>
      <WrapperCenter>
        <h2>Welcome {user.data.display_name}</h2>
        <p> We are happy to see you for the first time!</p>

        <p
          style={{
            textAlign: "center",
            paddingTop: "30px",
            paddingBottom: "10px",
            fontWeight: "700",
          }}
        >
          Explore the outdoors as you discover new music
        </p>
        <Wrapperinfo>
          <div>
            <SearchOutlinedIcon style={{ fontSize: "40px" }} />
            <p>First, find a trail from the thousands offered by the Sepaq.</p>
          </div>
          <div>
            <img src={Vinyl} style={{ width: "40px" }} />
            <p>
              Then let our djs create an playlist for you. Don't be afraid, you
              can always customize it to your taste.
            </p>
          </div>
        </Wrapperinfo>
        <p>Voilà, your new playlist is ready for you on your Spotify app.</p>
        <Button
          onClick={(ev) => {
            toggle();
          }}
        >
          Cool, let's do this !
        </Button>
      </WrapperCenter>
    </WrapperSearch>
  );
};

const WrapperSearch = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  /* background-color: rgb(0, 0, 0); */
  background-color: rgba(0, 0, 0, 0.5);
  transition: ease-in-out 0.8s all;
  @media (max-width: 750px) {
  }
  ${(props) =>
    props.open
      ? `background-color: background-color: rgba(0, 0, 0, 0.5); display: flex; z-index: 4;`
      : `background-color: transparent; display : none;`};
`;

const WrapperCenter = styled.div`
  width: 60%;
  padding: 40px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-direction: column;
  h2 {
    font-size: 1.5em;
    padding-bottom: 10px;
  }
  p {
    padding-top: 10px;
    font-weight: 400;
  }
`;

const Wrapperinfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  div {
    padding: 0 20px;
    height: 100px;
    width: 48%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #ebf5ff;
    p {
      margin-left: 15px;
    }
  }
`;
const Button = styled.button`
  color: dodgerblue;
  display: flex;
  width: 200px;
  align-items: center;
  background-color: white;
  padding: 10px 30px 10px 25px;
  border-radius: 30px;
  border: 1px solid #ff0000;
  margin-top: 30px;
  font-size: 1em;
  display: block;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  box-shadow: 11px 10px 9px -6px rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s ease-in;
`;

const InputField = styled.input`
  width: 100%;
  margin-top: 30px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  margin: auto;
  display: inline-block;
  color: #ffffff;
  font-size: 7vw;
  @media (max-width: 750px) {
  }
  ${(props) => (props.open ? `display: inline-block;` : `display: none;`)};

  ::placeholder {
    color: #595959;
    font-size: 7vw;
  }
`;

const TypeaheadSuggestions = styled.div`
  position: absolute;
  padding-right: 120px;
  top: 250px;
  background-color: transparent;
  width: 100%;
  @media (max-width: 750px) {
    top: 200px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr, 1fr));
  }
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

const DropDownItem = styled.div`
  color: white;
  background-color: #1c2126;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  transition: all 0.2s ease-in;
  /* border: 1px solid #fff; */
  @media (max-width: 750px) {
    align-items: flex-start;
    padding: 10px;
  }
  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

export default PopUpModalIntro;
