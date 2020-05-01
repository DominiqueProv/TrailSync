import React, { useState, useEffect, useContext, useRef } from "react";
import dotenv from "dotenv";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import { SvgIcon } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";

import ReactMapGL, {
  Marker,
  FullscreenControl,
  GeolocateControl,
  Source,
  Layer,
  SVGOverlay,
  HTMLOverlay,
  NavigationControl,
  LinearInterpolator,
  CanvasOverlay,
  Popup,
} from "react-map-gl";
dotenv.config();

// const geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [73.05625599999999, 33.644543999999996],
//       },
//     },
//   ],
// };

const Maps = ({ resize }) => {
  let history = useHistory();
  useEffect(() => {
    fetch("/trails")
      .then((res) => res.json())
      .then((payload) => {
        // console.log(payload);
        handleFetchTrail(payload);
      });
    fetch("/images")
      .then((res) => res.json())
      .then((payload) => {
        // console.log(payload);
        handleFetchImages(payload);
      });
  }, []);

  const {
    currentAppState,
    actions: { handleFetchTrail, handleFetchImages },
  } = useContext(CurrentAppContext);
  const trails = currentAppState.trails;
  const images = currentAppState.images.hits;

  const [viewport, setViewport] = useState({
    latitude: 47.837752,
    longitude: -69.539082,
    zoom: 6,
    width: window.innerWidth,
    height: window.innerHeight,
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
        <WrapperMap>
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/dominiqueprov/ck9mwpfn702ee1inr2yibugcp"
            onViewportChange={(viewport) => {
              setViewport({
                ...viewport,
              });
              resize = true;
            }}
          >
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
                <Popup
                  closeOnClick={false}
                  latitude={selectedTrail.geometry.coordinates[0]}
                  longitude={selectedTrail.geometry.coordinates[1]}
                  // onClick={(ev) => {
                  //   ev.preventDefault();
                  //   console.log("Hello");
                  //   history.push(`/trail/${selectedTrail.id}`);
                  // }}
                  onClose={() => {
                    setSelectedTrail(null);
                  }}
                >
                  <WrapperPopUp>
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
                        Niveau de difficulté :{" "}
                        {selectedTrail.properties.Niv_diff}
                      </h4>
                      {/* <Link to={`trail/${selectedTrail.id}`}> */}
                      <Button
                        onClick={(ev) => {
                          ev.preventDefault();
                          console.log("Hello");
                          history.push(`/trail/${selectedTrail.id}`);
                        }}
                      >
                        Select this trail
                      </Button>
                      {/* </Link> */}
                    </div>
                  </WrapperPopUp>
                </Popup>
              </>
            )}
          </ReactMapGL>
        </WrapperMap>
      )}
    </>
  );
};

const WrapperMap = styled.div`
  width: auto;
`;
const ButtonPin = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const WrapperPopUp = styled.div`
  width: 400px;
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
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

export default Maps;
