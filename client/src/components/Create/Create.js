import React, { useEffect, useContext } from "react";
// import { useParams, Redirect } from "react-router-dom";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";

const Create = () => {
  const {
    // actions: { createPlaylist },
  } = useContext(CurrentAppContext);
  const createPlaylist = () => {
    fetch("/createplaylist")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
      <Button onClick={() => createPlaylist()}>CreatePlaylist</Button>
    </>
  );
};

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

export default Create;
