import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import Create from "../Create";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

const Trail = () => {
  // const { currentAppState } = useContext(CurrentAppContext);
  const { trailId } = useParams();
  // trailId = trailId.Number();
  console.log(typeof trailId);

  let images;
  let trails;
  trails = JSON.parse(localStorage.getItem("trails"));
  images = JSON.parse(localStorage.getItem("images"));
  images = images.hits;
  console.log(trails);
  console.log(images);

  const PrettoSlider = withStyles({
    root: {
      color: "#52af77",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  return (
    <Wrapper>
      <TrailInfo>
        {trails
          .filter((trail) => trail.id === Number(trailId))
          .map((trail) => (
            <>
              <ImgWrapper>
                <img
                  src={
                    images[Math.floor(Math.random() * images.length)]
                      .webformatURL
                  }
                />
              </ImgWrapper>
              <h2>
                {trail.properties.Reseau} {trail.properties.Nom_etab}
              </h2>
              <h3>Trail: {trail.properties.Toponyme1}</h3>
              <h4>Niveau de difficulté : {trail.properties.Niv_diff}</h4>
              <h4>Length : {Math.trunc(trail.properties.Shape_Leng)} m.</h4>
              {trail.properties.Secteur == " " ? (
                <p></p>
              ) : (
                <h4>Secteur : {trail.properties.Secteur}</h4>
              )}
            </>
          ))}
      </TrailInfo>
      <SpotifyInfo>
        <p>Hello Spotify</p>

        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={20}
        />

        <form></form>
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
  padding: 40px;
  h2 {
    margin-bottom: 30px;
    font-size: 5vw;
  }
  h3 {
    margin-bottom: 30px;
  }
  h4 {
    margin-bottom: 30px;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const SpotifyInfo = styled.div`
  width: 50%;
  background: lightgreen;
  padding: 40px;
`;

export default Trail;
