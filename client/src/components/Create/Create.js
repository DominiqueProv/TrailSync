import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import queryString from "query-string";
import Maps from "../Maps/Maps";
import { CurrentAppContext } from "../contexts/Trails.context";
import NavBar from "../NavBar";

const Create = () => {
  const {
    currentAppState,
    actions: { handlelogginUser },
  } = useContext(CurrentAppContext);

  let parsed = queryString.parse(window.location.hash);
  let access_token = parsed.access_token;
  let refresh_token = parsed.refresh_token;

  // const [data, setData] = useState(null);
  // if (currentAppState) {
  //   console.log(currentAppState);
  // }

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        handlelogginUser(data);
      });
  }, []);

  async function createPlaylist(userId, access_token) {
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({
        name: "Baloooo Playlist",
        description: "Speed",
        public: false,
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          fetch(`/refresh_token/${refresh_token}`)
            .then((res) => res.json())
            .then((res) => console.log("Hellooooo", res.access_token));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {currentAppState && (
        <>
          <NavBar />
          <Maps />
          <button
            onClick={() =>
              createPlaylist(currentAppState.currentUser.data.id, access_token)
            }
          >
            CreatePlaylist
          </button>
        </>
      )}
    </>
  );
};

export default Create;
