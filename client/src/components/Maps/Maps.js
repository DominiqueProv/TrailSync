import React, { useState, useEffect, useContext } from "react";
import dotenv from "dotenv";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
// import { SvgIcon } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapGL, {
  Marker,
  FullscreenControl,
  // GeolocateControl,
  // Source,
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

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [73.05625599999999, 33.644543999999996],
      },
    },
  ],
};

const Maps = () => {
  const { currentAppState } = useContext(CurrentAppContext);

  let trails;
  let images;

  if (currentAppState.storage || localStorage.getItem("isLoggedIn")) {
    trails = JSON.parse(localStorage.getItem("trails"));
    images = JSON.parse(localStorage.getItem("images"));
    images = images.hits;
  }

  let history = useHistory();

  // const trails = currentAppState.trails;
  // const images = currentAppState.images.hits;

  const [viewport, setViewport] = useState({
    latitude: 47.837752,
    longitude: -69.539082,
    zoom: 6,
  });

  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    const listener = (ev) => {
      if (ev.key === "Escape") {
        setSelectedTrail(null);
      }
      if (ev.mousedown) {
        ev.preventDefault();
        history.push(`/trail/${selectedTrail.id}`);
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
          style={{ width: "100%", height: "100vh" }}
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

          {trails.map((trail) => (
            <Marker
              key={trail.id}
              latitude={trail.geometry.coordinates[0]}
              longitude={trail.geometry.coordinates[1]}
            >
              <ButtonPin
                onClick={(ev) => {
                  ev.preventDefault();
                  setSelectedTrail(trail);
                }}
              >
                <RoomOutlinedIcon
                  htmlColor="#63FD84"
                  style={{ fontSize: 30 }}
                />
              </ButtonPin>
            </Marker>
          ))}

          {selectedTrail && images && (
            <>
              <WrapperPopUp
                closeOnClick={false}
                latitude={selectedTrail.geometry.coordinates[0]}
                longitude={selectedTrail.geometry.coordinates[1]}
                onClose={() => {
                  setSelectedTrail(null);
                }}
              >
                <div>
                  <Image
                    src={
                      images[Math.floor(Math.random() * images.length)]
                        .previewURL
                    }
                  />
                  <h2>
                    {selectedTrail.properties.Reseau}{" "}
                    {selectedTrail.properties.Nom_etab}
                  </h2>
                  <h3>{selectedTrail.properties.Toponyme1}</h3>
                  <h4>
                    Niveau de difficulté : {selectedTrail.properties.Niv_diff}
                  </h4>
                  <Button
                    onClick={(ev) => {
                      ev.preventDefault();
                      history.push(`/trail/${selectedTrail.id}`);
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
  position: absolute;
  top: 18px;
  right: 18px;
  display: flex;
  flex-direction: column;
`;
const FullScreenCtl = styled(FullscreenControl)`
  display: block;
  width: 30px;
  margin-bottom: 10px;
`;

const NavCtl = styled(NavigationControl)`
  display: block;
  width: 30px;
`;

const ButtonPin = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const WrapperPopUp = styled(Popup)`
  width: 400px;
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  background-color: lightgray;
  margin-bottom: 20px;
  border-radius: 10px;
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

export default Maps;
