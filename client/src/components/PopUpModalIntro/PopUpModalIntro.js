import React, { useRef, useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Vinyl from "../../assets/711.gif";

const PopUpModalIntro = ({ open, toggle }) => {
  const { currentAppState } = useContext(CurrentAppContext);
  let user;

  if (currentAppState.storage || localStorage.getItem("currentUser")) {
    user = JSON.parse(localStorage.getItem("currentUser"));
  }

  const wrapperRef = useRef(null);

  return (
    <WrapperSearch ref={wrapperRef} data-css="Typehead-Wrapper" open={open}>
      <WrapperCenter>
        <h2>Welcome {user.data.display_name}</h2>
        <p
          style={{
            textAlign: "center",
            paddingTop: "30px",
            paddingBottom: "30px",
            fontWeight: "700",
          }}
        >
          Explore the outdoors as you discover new music
        </p>
        <Wrapperinfo>
          <div>
            <SearchOutlinedIcon style={{ fontSize: "50px" }} />
            <p>First, find a trail from the thousands offered by the Sepaq.</p>
          </div>
          <div>
            <img src={Vinyl} style={{ width: "50px" }} />
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
  width: 40%;
  padding: 60px;
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
    width: 48%;
    height: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ebf5ff;
    padding: 20px;
    p {
      margin: 15px 15px 15px 30px;
      line-height: 1.5em;
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

export default PopUpModalIntro;
