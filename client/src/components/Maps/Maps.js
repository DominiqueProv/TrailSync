import React, { useState, useEffect, useContext } from "react";
import dotenv from "dotenv";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Cluster from "@urbica/react-map-gl-cluster";
import CircularProgress from "@material-ui/core/CircularProgress";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import Footer from "../Footer";
import { ip } from "../../constants";
import ReactMapGL, {
  Marker,
  FullscreenControl,
  Source,
  Layer,
  NavigationControl,
  Popup,
} from "@urbica/react-map-gl";
dotenv.config();

const Maps = () => {
  const {
    currentAppState,
    actions: { popUpModalIntro },
  } = useContext(CurrentAppContext);

  let trails;
  let history = useHistory();

  if (currentAppState.storage || localStorage.getItem("isLoggedIn")) {
    trails = JSON.parse(localStorage.getItem("trails"));
    trails = trails.trails;
  }

  const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      {pointCount > 50 && pointCount < 100 && (
        <div
          style={{
            ...style,
            background: "white",
            width: "40px",
            height: "40px",
          }}
        >
          {pointCount}
        </div>
      )}
      {pointCount < 50 && pointCount > 30 && (
        <div
          style={{
            ...style,
            background: "white",
            width: "30px",
            height: "30px",
          }}
        >
          {pointCount}
        </div>
      )}
      {pointCount > 100 && (
        <div
          style={{
            ...style,
            background: "white",
            width: "50px",
            height: "50px",
          }}
        >
          {pointCount}
        </div>
      )}
    </Marker>
  );

  const [viewport, setViewport] = useState({
    latitude: 47.837752,
    longitude: -69.539082,
    zoom: 6,
  });

  const [selectedTrail, setSelectedTrail] = useState(null);
  const [trailGeoData, setTrailGeoData] = useState(null);

  useEffect(() => {
    const listener = (ev) => {
      if (ev.key === "Escape") {
        setSelectedTrail(null);
      }
      if (ev.mousedown) {
        ev.preventDefault();
        history.push(`/trail/${selectedTrail._id}`);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      {trails && (
        <ReactMapGL
          style={{
            width: "100%",
            height: "calc(100vh - 110px)",
            position: "relative",
          }}
          {...viewport}
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={
            currentAppState.isDay
              ? "mapbox://styles/dominiqueprov/ck9usv5wd0e011ipbweu3fvp3"
              : "mapbox://styles/dominiqueprov/ck9mwpfn702ee1inr2yibugcp"
          }
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={setViewport}
        >
          <WrapperControle>
            <FullScreenCtl data-css="FullscreenControl" />
            <NavCtl data-css="NavigationControl" showCompass showZoom />
          </WrapperControle>

          <>
            <Cluster
              radius={40}
              extent={300}
              nodeSize={100}
              component={ClusterMarker}
              maxZoom={9}
              minZoom={7}
            >
              {trails.map((trail) => (
                <Marker
                  key={trail._id}
                  latitude={trail.startingpoint[1]}
                  longitude={trail.startingpoint[0]}
                >
                  <ButtonPin
                    onClick={(ev) => {
                      let num = trail._id;
                      let trailId = num.toString();
                      ev.preventDefault();
                      fetch(`${ip}/trailgeo`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: trailId,
                        }),
                        json: true,
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          setTrailGeoData(data);
                        });
                      setSelectedTrail(trail);
                    }}
                  >
                    {trail.Usager === "Piste cyclable" ? (
                      <DirectionsBikeIcon
                        style={{
                          color: currentAppState.isDay ? "dodgerblue" : "blue",
                        }}
                      />
                    ) : (
                      <DirectionsWalkIcon
                        style={{
                          color: currentAppState.isDay ? "dodgerblue" : "blue",
                        }}
                      />
                    )}
                  </ButtonPin>
                </Marker>
              ))}
            </Cluster>
          </>
          {selectedTrail && (
            <>
              <WrapperPopUp
                closeOnClick={false}
                latitude={selectedTrail.startingpoint[1]}
                longitude={selectedTrail.startingpoint[0]}
                onClose={() => {
                  setSelectedTrail(null);
                }}
              >
                <div>
                  {trailGeoData &&
                  trailGeoData.trailGeo.geometry.coordinates ? (
                    <ReactMapGL
                      style={{
                        width: "100%",
                        height: "200px",
                        marginBottom: "10px",
                      }}
                      {...viewport}
                      accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                      mapStyle="mapbox://styles/dominiqueprov/ck9usv5wd0e011ipbweu3fvp3"
                      latitude={
                        trailGeoData.trailGeo.geometry.coordinates[1][1]
                      }
                      longitude={
                        trailGeoData.trailGeo.geometry.coordinates[1][0]
                      }
                      zoom={14}
                    >
                      <Source
                        id="route"
                        type="geojson"
                        data={trailGeoData.trailGeo}
                      />
                      <Layer
                        id="route"
                        type="line"
                        source="route"
                        layout={{
                          "line-join": "round",
                          "line-cap": "round",
                        }}
                        paint={{
                          "line-color": "dodgerblue",
                          "line-width": 6,
                        }}
                      />
                    </ReactMapGL>
                  ) : (
                    <Wrapper>
                      <CircularProgress />
                    </Wrapper>
                  )}
                </div>
                <div>
                  <h2>
                    {selectedTrail.properties.Reseau}{" "}
                    {selectedTrail.properties.Nom_etab}
                  </h2>
                  <h3>Trail: {selectedTrail.properties.Toponyme1}</h3>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <h4>Level : {selectedTrail.properties.Niv_diff}</h4>
                    <div
                      style={{
                        backgroundColor:
                          selectedTrail.properties.Niv_diff === "Facile"
                            ? "green"
                            : selectedTrail.properties.Niv_diff ===
                              "Intermédiaire"
                            ? "yellow"
                            : selectedTrail.properties.Niv_diff === "Difficile"
                            ? "orange"
                            : "red",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        marginLeft: "15px",
                      }}
                    ></div>
                  </div>
                  <Button
                    onClick={(ev) => {
                      ev.preventDefault();
                      history.push(`/trail/${selectedTrail._id}`);
                    }}
                  >
                    Select this trail
                  </Button>
                </div>
              </WrapperPopUp>
            </>
          )}
        </ReactMapGL>
      )}

      <Footer style={{ zIndex: "100" }} />
    </>
  );
};

const style = {
  width: "20px",
  height: "20px",
  color: "dodgerblue",
  background: "#ffffff",
  borderRadius: "50%",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #ff0000",
  boxShadow: "11px 10px 9px -6px rgba(0,0,0,0.12)",
};

const WrapperControle = styled.div`
  /* position: absolute; */
  /* top: 25px;
  right: 25px;
  display: flex;
  flex-direction: column; */
`;
const FullScreenCtl = styled(FullscreenControl)`
  /* display: block;
  width: 30px; */
  /* margin-bottom: 10px; */
`;

const NavCtl = styled(NavigationControl)`
  /* display: block;
  width: 30px; */
`;

const ButtonPin = styled.button`
  background: #fff;
  border: 1px solid #ff0000;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperPopUp = styled(Popup)``;

const Button = styled.button`
  color: white;
  display: flex;
  align-items: center;
  background-color: #2aa9e0;
  padding: 10px 50px 10px 40px;
  border-radius: 30px;
  border: none;
  margin-top: 20px;
  font-size: 1em;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #2593d8;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;

export default Maps;
