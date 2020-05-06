import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dotenv from "dotenv";
// import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import Create from "../Create";
import "mapbox-gl/dist/mapbox-gl.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactMapGL, {
  Marker,
  FullscreenControl,
  // GeolocateControl,
  Source,
  Layer,
  // SVGOverlay,
  // HTMLOverlay,
  NavigationControl,
  // LinearInterpolator,
  // CanvasOverlay,
  Popup,
} from "@urbica/react-map-gl";
dotenv.config();

// let trailGeo;

const Trail = () => {
  const [trailGeoData, setTrailGeoData] = useState(null);
  const [trailInfo, setTrailInfo] = useState(null);
  const { trailId } = useParams();

  useEffect(() => {
    fetch("/trailgeo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: trailId,
      }),
      json: true,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.trailGeo.geometry.coordinates);
        setTrailGeoData(data);
      });

    fetch("/trailinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: trailId,
      }),
      json: true,
    })
      .then((res) => res.json())
      .then((data) => {
        setTrailInfo(data);
      });
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 47.837752,
    longitude: -69.539082,
    zoom: 6,
  });

  return (
    <MainWrapper>
      {trailGeoData &&
      trailInfo &&
      trailGeoData.trailGeo.geometry.coordinates ? (
        <>
          <TrailInfo>
            <ReactMapGL
              style={{ width: "100%", height: "300px" }}
              {...viewport}
              accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/dominiqueprov/ck9mwpfn702ee1inr2yibugcp"
              // latitude={37.83381888486939}
              // longitude={-122.48369693756104}
              latitude={trailGeoData.trailGeo.geometry.coordinates[1][1]}
              longitude={trailGeoData.trailGeo.geometry.coordinates[1][0]}
              zoom={15}
              onViewportChange={setViewport}
            >
              <Source id="route" type="geojson" data={trailGeoData.trailGeo} />
              <Layer
                id="route"
                type="line"
                source="route"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "green",
                  "line-width": 6,
                }}
              />
            </ReactMapGL>
            <h2>
              {trailInfo.trailGeo.properties.Reseau}{" "}
              {trailInfo.trailGeo.properties.Nom_etab}
            </h2>
            <h3>Trail: {trailInfo.trailGeo.properties.Toponyme1}</h3>
            <h4>
              Niveau de difficulté : {trailInfo.trailGeo.properties.Niv_diff}
            </h4>
            <h4>
              Length : {Math.trunc(trailInfo.trailGeo.properties.Shape_Leng)} m.
            </h4>
            {trailInfo.trailGeo.properties.Secteur == "" ? (
              <p>Secteur Québec</p>
            ) : (
              <h4>Secteur : {trailInfo.trailGeo.properties.Secteur}</h4>
            )}
          </TrailInfo>
          <SpotifyInfo>
            <Create info={trailInfo.trailGeo.properties} />
          </SpotifyInfo>
        </>
      ) : (
        <Wrapper>
          <CircularProgress />
        </Wrapper>
      )}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TrailInfo = styled.div`
  width: 50%;
  background: #eaeaea;
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

const SpotifyInfo = styled.div`
  width: 50%;
  background: lightblue;
  padding: 40px;
`;

export default Trail;
