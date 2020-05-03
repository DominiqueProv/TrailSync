import React, { useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import Create from "../Create";

const Trail = () => {
  const { currentAppState } = useContext(CurrentAppContext);
  console.log(currentAppState);

  return (
    <Wrapper>
      <TrailInfo>Hello Trail</TrailInfo>
      <SpotifyInfo>
        <p>Hello Spotify</p>
        <Create />
      </SpotifyInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const TrailInfo = styled.div`
  width: 50%;
  background: lightblue;
`;

const SpotifyInfo = styled.div`
  width: 50%;
  background: lightgreen;
`;

export default Trail;
