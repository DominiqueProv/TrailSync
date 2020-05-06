import React, { useState, useEffect, useContext } from "react";
import dotenv from "dotenv";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
// import { SvgIcon } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Cluster from "@urbica/react-map-gl-cluster";
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
// } from "react-map-gl";
dotenv.config();

const Maps = () => {
  const { currentAppState } = useContext(CurrentAppContext);
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
  };

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
            height: "calc(100vh - 60px)",
            position: "relative",
          }}
          {...viewport}
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/dominiqueprov/ck9mwpfn702ee1inr2yibugcp"
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
              maxZoom={8}
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
                          console.log(data.trailGeo.geometry.coordinates);

                          setTrailGeoData(data);
                        });
                      setSelectedTrail(trail);
                    }}
                  >
                    {/* <RoomOutlinedIcon
                      htmlColor="#63FD84"
                      style={{ fontSize: 30 }}
                    /> */}
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
                      style={{ width: "100%", height: "300px" }}
                      {...viewport}
                      accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                      mapStyle="mapbox://styles/dominiqueprov/ck9mwpfn702ee1inr2yibugcp"
                      // latitude={37.83381888486939}
                      // longitude={-122.48369693756104}
                      latitude={
                        trailGeoData.trailGeo.geometry.coordinates[1][1]
                      }
                      longitude={
                        trailGeoData.trailGeo.geometry.coordinates[1][0]
                      }
                      zoom={17}

                      // onViewportChange={setViewport}
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
                          "line-color": "green",
                          "line-width": 6,
                        }}
                      />
                    </ReactMapGL>
                  ) : (
                    <Wrapper>
                      <CircularProgress />
                    </Wrapper>
                  )}
                  <h2>
                    {selectedTrail.properties.Reseau}{" "}
                    {selectedTrail.properties.Nom_etab}
                  </h2>
                  <h3>Trail: {selectedTrail.properties.Toponyme1}</h3>
                  <h4>
                    Niveau de difficulté : {selectedTrail.properties.Niv_diff}
                  </h4>
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
    </>
  );
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
  background: #63fd84;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const WrapperPopUp = styled(Popup)`
  width: 600px;
  padding: 10px;
`;

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
  height: 300px;
`;

export default Maps;
