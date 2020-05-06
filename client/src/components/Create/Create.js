import React, { useEffect, useContext, useState } from "react";
// import { useParams, Redirect } from "react-router-dom";
import { CurrentAppContext } from "../contexts/Trails.context";
import _ from "lodash";
import mapValues from "lodash/mapValues";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const Create = ({ info }) => {
  const { Niv_diff, Shape_Leng, Usager, Toponyme1 } = info;

  let acousticness;
  let danceability;
  let energy;
  let tempo;
  let songLength;
  let limit = {};

  songLength = Number(Shape_Leng);
  songLength = Math.trunc(songLength);

  const [genre, setGenre] = useState({
    seed_genres: null,
    limit: null,
    seed_genres: null,
    target_acousticness: null,
    target_danceability: null,
    target_energy: null,
    target_tempo: null,
  });

  const analyseTrack = () => {
    let qs = {};
    switch (Niv_diff) {
      case "Facile":
        acousticness = (Math.random() * (1 - 0.7) + 0.7).toFixed(1);
        acousticness = parseFloat(acousticness);
        if (acousticness === 1.0) {
          acousticness = Math.trunc(acousticness);
        }
        // console.log(acousticness);
        danceability = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        danceability = parseFloat(danceability);
        if (danceability === 0.0) {
          danceability = Math.trunc(danceability);
        }
        // console.log(danceability);
        energy = (Math.random() * (0.3 - 0) + 0).toFixed(1);
        energy = parseFloat(energy);
        if (energy === 0.0) {
          energy = Math.trunc(energy);
        }
        // console.log(energy);
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
          console.log(limit);
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
        qs.seed_genres = "rock,classical,hiphop,latin,edm";
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
        qs.seed_genres = "rock,hiphop,rap,edm";
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
  };

  useEffect(() => {
    analyseTrack();
  }, []);

  if (genre !== null) {
    // let newGenre = _.mapValues(genre, (value) => {
    //   if (typeof value === "number") {
    //     return value.toString();
    //   } else {
    //     return value;
    //   }
    // });

    // console.log(newGenre);
    // const entries = Object.entries(genre);
    // console.log(entries);
    // let value;

    // let entries = Object.entries(genre);
    // console.log(entries);
    let newObj = mapValues(genre, (value, key) => {
      return {};
    });

    // for (let [key, value] of Object.entries(genre)) {
    //   if (typeof value === "number") {
    //     value.toString();
    //   }
    //   console.log(genre);
    //   // console.log(key, genre[(key, value)]);
    //   // console.log(genre);
    // }

    // for (let value of genre) {
    //   if (typeof value === "number") {
    //     value.toString();
    //   }
    // return genre;
    // }

    // console.log(genre);
    // itemstoString();
  }

  const createPlaylist = (ev) => {
    ev.preventDefault();
    let newGenre = _.mapValues(genre, (value) => {
      if (typeof value === "number") {
        return value.toString();
      } else {
        return value;
      }
    });
    fetch("/createplaylist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: Toponyme1,
        qs: newGenre,
        json: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const marks = [
    {
      value: 0,
    },
    {
      value: 10,
    },
    {
      value: 20,
    },
    {
      value: 30,
    },
    {
      value: 40,
    },
    {
      value: 50,
    },
    {
      value: 60,
    },
    {
      value: 70,
    },
    {
      value: 80,
    },
    {
      value: 90,
    },
    {
      value: 100,
    },
  ];

  const handleChange = (ev) => {
    setGenre({ ...genre, seed_genres: ev.target.value });
  };

  return (
    <>
      <Wrapper>
        <form onSubmit={(ev) => createPlaylist(ev)}>
          <label>
            <p>Genre</p>
            <select
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
              <option value="electropop">Electropop</option>
            </select>
          </label>
          <p>Acousticness</p>
          <PrettoSlider
            valueLabelDisplay="off"
            aria-label="pretto slider"
            max={100}
            min={0}
            marks={marks}
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

          <p>Danceability</p>

          <PrettoSlider
            valueLabelDisplay="off"
            aria-label="pretto slider"
            max={100}
            min={0}
            marks={marks}
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

          <p>Energy</p>

          <PrettoSlider
            valueLabelDisplay="off"
            aria-label="pretto slider"
            max={100}
            marks={marks}
            step={10}
            min={0}
            value={genre.target_energy ? genre.target_energy * 100 : 0}
            onChange={(ev, val) => {
              ev.preventDefault();
              console.log(val);
              setGenre({
                ...genre,
                target_energy: val / 100,
              });
            }}
          />

          <p>Tempo</p>

          <PrettoSlider
            valueLabelDisplay="off"
            aria-label="pretto slider"
            marks={marks}
            max={100}
            step={10}
            min={0}
            value={genre.target_tempo ? genre.target_tempo * 100 : 0}
            onChange={(ev, val) => {
              ev.preventDefault();
              console.log(val);
              setGenre({
                ...genre,
                target_tempo: val / 100,
              });
            }}
          />
          <ButtonInput type="submit" value="Create your playlist" />
        </form>
      </Wrapper>
    </>
  );
};

const PrettoSlider = withStyles({
  root: {
    color: "dodgerblue",
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonInput = styled.input`
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
