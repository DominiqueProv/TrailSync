import React, { useEffect, useContext, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

import { CurrentAppContext } from "../contexts/Trails.context";
import PopUpModalPlaylist from "../PopUpModalPlaylist";
import { ip } from "../../constants.js";

const Create = ({ info, trailName }) => {
  const { Niv_diff, Shape_Leng, Toponyme1 } = info;
  const {
    actions: { addNotificationPill },
  } = useContext(CurrentAppContext);
  let acousticness;
  let danceability;
  let energy;
  let tempo;
  let songLength;
  let limit = {};
  songLength = Number(Shape_Leng);
  songLength = Math.trunc(songLength);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [genre, setGenre] = useState({
    seed_genres: null,
    limit: null,
    target_acousticness: null,
    target_danceability: null,
    target_energy: null,
    target_tempo: null,
  });
  const access_token = localStorage.getItem("tokens");
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const userId = userInfo.data.id;
  const TogglePlaylistModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let qs = {};
    switch (Niv_diff) {
      case "Facile":
        acousticness = (Math.random() * (1 - 0.7) + 0.7).toFixed(1);
        acousticness = parseFloat(acousticness);
        if (acousticness === 1.0) {
          acousticness = Math.trunc(acousticness);
        }
        danceability = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        danceability = parseFloat(danceability);
        if (danceability === 0.0) {
          danceability = Math.trunc(danceability);
        }
        energy = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        energy = parseFloat(energy);
        if (energy === 0.0) {
          energy = Math.trunc(energy);
        }
        tempo = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        tempo = parseFloat(tempo);
        if (tempo === 0.0) {
          tempo = Math.trunc(tempo);
        }
        if (songLength > 0 && songLength < 500) {
          limit = 10;
          qs.limit = limit;
        } else if (songLength > 500 && songLength < 2000) {
          limit = 15;
          qs.limit = limit;
        } else if (songLength > 2000 && songLength < 4000) {
          limit = 20;
          qs.limit = limit;
        } else {
          limit = 25;
          qs.limit = limit;
        }
        qs.target_tempo = tempo;
        qs.seed_genres = "rock,classical,hiphop,latin,country";
        qs.target_acousticness = acousticness;
        qs.target_energy = energy;
        qs.target_danceability = danceability;
        setGenre({
          ...genre,
          ...qs,
        });
        break;

      case "Moyen":
        acousticness = (Math.random() * (1 - 0.7) + 0.7).toFixed(1);
        acousticness = parseFloat(acousticness);
        if (acousticness === 1.0) {
          acousticness = Math.trunc(acousticness);
        }
        danceability = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        danceability = parseFloat(danceability);
        if (danceability === 0.0) {
          danceability = Math.trunc(danceability);
        }
        energy = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        energy = parseFloat(energy);
        if (energy === 0.0) {
          energy = Math.trunc(energy);
        }
        tempo = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        tempo = parseFloat(tempo);
        if (tempo === 0.0) {
          tempo = Math.trunc(tempo);
        }
        if (songLength > 0 && songLength < 500) {
          limit = 10;
          qs.limit = limit;
        } else if (songLength > 500 && songLength < 2000) {
          limit = 15;
          qs.limit = limit;
        } else if (songLength > 2000 && songLength < 4000) {
          limit = 20;
          qs.limit = limit;
        } else {
          limit = 25;
          qs.limit = limit;
        }
        qs.target_tempo = tempo;
        qs.seed_genres = "rock,classical,hiphop,latin,country";
        qs.target_acousticness = acousticness;
        qs.target_energy = energy;
        qs.target_danceability = danceability;
        setGenre({
          ...genre,
          ...qs,
        });
        break;

      case "Intermédiaire":
        acousticness = (Math.random() * (0.7 - 0.4) + 0.4).toFixed(1);
        acousticness = parseFloat(acousticness);
        danceability = (Math.random() * (0.7 - 0.3) + 0.3).toFixed(1);
        danceability = parseFloat(danceability);
        energy = (Math.random() * (0.7 - 0.3) + 0.3).toFixed(1);
        energy = parseFloat(energy);
        tempo = (Math.random() * (0.7 - 0.3) + 0.3).toFixed(1);
        tempo = parseFloat(tempo);
        if (songLength > 0 && songLength < 500) {
          limit = 10;
          qs.limit = limit;
        } else if (songLength > 500 && songLength < 2000) {
          limit = 15;
          qs.limit = limit;
          console.log(limit);
        } else if (songLength > 2000 && songLength < 4000) {
          limit = 20;
          qs.limit = limit;
        } else {
          limit = 25;
          qs.limit = limit;
        }
        qs.target_tempo = tempo;
        qs.seed_genres = "rock,pop,hiphop,latin,edm";
        qs.target_acousticness = acousticness;
        qs.target_energy = energy;
        qs.target_danceability = danceability;
        setGenre({
          ...genre,
          ...qs,
        });
        break;

      case "Difficile":
        acousticness = (Math.random() * (0.3 - 0.1) + 0.1).toFixed(1);
        acousticness = parseFloat(acousticness);
        danceability = (Math.random() * (0.8 - 0.6) + 0.6).toFixed(1);
        danceability = parseFloat(danceability);
        energy = (Math.random() * (0.9 - 0.6) + 0.6).toFixed(1);
        energy = parseFloat(energy);
        tempo = (Math.random() * (1 - 0.5) + 0.5).toFixed(1);
        tempo = parseFloat(tempo);
        if (tempo === 1.0) {
          tempo = Math.trunc(tempo);
        }
        if (songLength > 0 && songLength < 500) {
          limit = 10;
          qs.limit = limit;
        } else if (songLength > 500 && songLength < 2000) {
          limit = 15;
          qs.limit = limit;
        } else if (songLength > 2000 && songLength < 4000) {
          limit = 20;
          qs.limit = limit;
        } else {
          limit = 25;
          qs.limit = limit;
        }
        qs.target_tempo = tempo;
        qs.seed_genres = "rock,hiphop,latin,edm";
        qs.target_acousticness = acousticness;
        qs.target_energy = energy;
        qs.target_danceability = danceability;
        setGenre({
          ...genre,
          ...qs,
        });
        break;
      case "Très difficile":
        acousticness = (Math.random() * (0.2 - 0.0) + 0.0).toFixed(1);
        acousticness = parseFloat(acousticness);
        if (acousticness === 0.0) {
          acousticness = Math.trunc(acousticness);
        }
        danceability = (Math.random() * (1 - 0.8) + 0.8).toFixed(1);
        danceability = parseFloat(danceability);
        if (danceability === 1.0) {
          danceability = Math.trunc(danceability);
        }
        energy = (Math.random() * (1 - 0.7) + 0.7).toFixed(1);
        energy = parseFloat(energy);
        if (energy === 1.0) {
          energy = Math.trunc(energy);
        }
        tempo = (Math.random() * (1 - 0.8) + 0.8).toFixed(1);
        tempo = parseFloat(tempo);
        if (tempo === 1.0) {
          tempo = Math.trunc(tempo);
        }
        if (songLength >= 0 && songLength < 500) {
          limit = 10;
          qs.limit = limit;
        } else if (songLength > 500 && songLength < 2000) {
          limit = 15;
          qs.limit = limit;
        } else if (songLength > 2000 && songLength < 4000) {
          limit = 20;
          qs.limit = limit;
        } else {
          limit = 25;
          qs.limit = limit;
        }
        qs.target_tempo = tempo;
        qs.seed_genres = "rock,hiphop,latin,edm";
        qs.target_acousticness = acousticness;
        qs.target_energy = energy;
        qs.target_danceability = danceability;
        setGenre({
          ...genre,
          ...qs,
        });
        break;
      default:
    }
  }, []);

  const createPlaylist = (ev) => {
    ev.preventDefault();
    setIsOpen(true);
    let newGenre = _.mapValues(genre, (value) => {
      if (typeof value === "number") {
        return value.toString();
      } else {
        return value;
      }
    });
    fetch(`${ip}/createplaylist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: access_token,
        userId: userId,
        name: Toponyme1 === "" ? trailName : Toponyme1,
        qs: newGenre,
        json: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setPlaylistInfo(res);
        if (res.collaborative === false) {
          addNotificationPill();
        }
      });
  };

  const handleChange = (ev) => {
    setGenre({ ...genre, seed_genres: ev.target.value });
  };

  return (
    <>
      {isOpen && (
        <PopUpModalPlaylist
          playlistInfo={playlistInfo}
          toggle={TogglePlaylistModal}
          open={isOpen}
        />
      )}
      {genre && (
        <Wrapper>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "30px",
                borderBottom: "1px solid black",
                height: "1px",
                marginRight: " 10px",
              }}
            ></div>
            <p style={{ fontSize: ".8em", fontWeigth: "400" }}>
              Playlist setup
            </p>
          </div>
          <h2 style={{ marginBottom: "30px" }}>Get creative with Spotify!</h2>
          <FormSlider onSubmit={(ev) => createPlaylist(ev)}>
            <p
              style={{
                fontWeight: "400",
                fontSize: ".9em",
                marginBottom: "30px",
                lineHeight: "1.8em",
              }}
            >
              We made a custom playlist based on the length and the difficulty
              of your hike. Feel free to make it your own!
            </p>
            <label>
              <p>Choose a genre</p>
              <Select
                labelid="select-genre"
                id="genre"
                value={genre.seed_genres ? genre.seed_genres : ""}
                onChange={(ev) => {
                  ev.preventDefault();
                  handleChange(ev);
                }}
              >
                <option defaultValue="rock,classical,hiphop,latin,edm">
                  Random
                </option>
                <option value="hiphop">Hip-Hop</option>
                <option value="classical">Classical</option>
                <option value="latin">Latin</option>
                <option value="edm">Edm</option>
                <option value="dance">Dance</option>
                <option value="country">Country</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
              </Select>
            </label>
            <p style={{ marginBottom: "20px" }}>Personalize your mood</p>
            <p style={{ fontWeight: "400", paddingBottom: "5px" }}>
              Acousticness
            </p>
            <PrettoSlider
              valueLabelDisplay="off"
              aria-label="pretto slider"
              max={100}
              min={0}
              step={10}
              value={
                genre.target_acousticness ? genre.target_acousticness * 100 : 0
              }
              onChange={(ev, val) => {
                ev.preventDefault();
                setGenre({
                  ...genre,
                  target_acousticness: val / 100,
                });
              }}
            />

            <p
              style={{
                fontWeight: "400",
                paddingBottom: "5px",
                paddingTop: "10px",
              }}
            >
              Danceability
            </p>

            <PrettoSlider
              valueLabelDisplay="off"
              aria-label="pretto slider"
              max={100}
              min={0}
              step={10}
              value={
                genre.target_danceability ? genre.target_danceability * 100 : 0
              }
              onChange={(ev, val) => {
                ev.preventDefault();
                setGenre({
                  ...genre,
                  target_danceability: val / 100,
                });
              }}
            />
            <p
              style={{
                fontWeight: "400",
                paddingBottom: "5px",
                paddingTop: "10px",
              }}
            >
              Energy
            </p>
            <PrettoSlider
              valueLabelDisplay="off"
              aria-label="pretto slider"
              max={100}
              step={10}
              min={0}
              value={genre.target_energy ? genre.target_energy * 100 : 0}
              onChange={(ev, val) => {
                ev.preventDefault();
                setGenre({
                  ...genre,
                  target_energy: val / 100,
                });
              }}
            />
            <p
              style={{
                fontWeight: "400",
                paddingBottom: "5px",
                paddingTop: "10px",
              }}
            >
              Tempo
            </p>
            <PrettoSlider
              valueLabelDisplay="off"
              aria-label="pretto slider"
              max={100}
              step={10}
              min={0}
              value={genre.target_tempo ? genre.target_tempo * 100 : 0}
              onChange={(ev, val) => {
                ev.preventDefault();
                setGenre({
                  ...genre,
                  target_tempo: val / 100,
                });
              }}
            />
            <ButtonInput type="submit" value="Create your playlist" />
          </FormSlider>
        </Wrapper>
      )}
    </>
  );
};

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin: 15px 0 35px;
  outline: none;

  option {
    color: black;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const FormSlider = styled.form`
  width: 400px;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  h2 {
    font-size: 3vw;
    @media (max-width: 550px) {
      font-size: 1.3em;
    }
  }
`;
const ButtonInput = styled.input`
  color: dodgerblue;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 30px 10px 25px;
  border-radius: 30px;
  border: 1px solid #ff0000;
  margin-top: 40px;
  font-size: 1em;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  box-shadow: 11px 10px 9px -6px rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s ease-in;
`;

const PrettoSlider = withStyles({
  root: {
    color: "red",
    height: 4,
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
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

export default Create;
