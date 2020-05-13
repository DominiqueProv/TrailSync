import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentAppContext } from "../contexts/Trails.context";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import Footer from "../Footer";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

let name;
let email;
let avatar;
let userId;
let body;
const Profile = () => {
  const [isDashboard, setIsDashboard] = useState(false);
  const [playlistHistorique, setPlaylistHistorique] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // console.log(playlistHistorique);
  // console.log(userId);
  // console.log(currentlyPlaying);
  const { currentAppState } = useContext(CurrentAppContext);

  useEffect(() => {
    if (currentAppState.storage || localStorage.getItem("isLoggedIn")) {
      userId = JSON.parse(localStorage.getItem("currentUser"));
      body = JSON.stringify({ userId: userId.data.id });
      name = userId.data.display_name;
      email = userId.data.email;
      avatar = userId.data.images[0].url;
      // console.log(body);
      loadHistorique(body);
    }

    async function loadHistorique(body) {
      try {
        const res = await fetch("/getHistorique", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: body,
        });
        const data = await res.json();
        setPlaylistHistorique(data);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  async function getCurrentlyPlaying() {
    let token = localStorage.getItem("tokens");
    console.log("<<<<<", token);
    const res = await fetch("/getcurrentlyplaying", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token: token }),
    });

    const currentlyPlaying = await res.json();
    setCurrentlyPlaying(currentlyPlaying);
    console.log(currentlyPlaying);
  }

  useEffect(() => {
    getCurrentlyPlaying();
  }, []);

  return (
    <>
      <MainWrapper>
        {playlistHistorique !== null ? (
          <>
            <WrapperInfo>
              <WrapperUser>
                <img src={avatar} alt="Profile" />
                <h2>{name}</h2>
                <p>{email}</p>
                {userId.data.id === "12121769867" ? (
                  isDashboard ? (
                    <Button onClick={() => setIsDashboard(false)}>
                      {" "}
                      My History
                    </Button>
                  ) : (
                    <Button onClick={() => setIsDashboard(true)}>
                      {" "}
                      Dashboard
                    </Button>
                  )
                ) : (
                  <p></p>
                )}
              </WrapperUser>
              <CurrentlyPlayingWrap>
                {currentlyPlaying === "Notting is playing at the moment" ? (
                  <div
                    style={{
                      height: "205px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontWeight: "400",
                      }}
                    >
                      {currentlyPlaying}
                    </p>
                  </div>
                ) : (
                  <CurrentInfoWrapper>
                    <img
                      style={{ borderRadius: "0px", marginBottom: "20px" }}
                      src={currentlyPlaying.item.album.images[1].url}
                      alt={"artist"}
                    />
                    <p style={{ fontWeight: "700" }}>
                      {currentlyPlaying.item.artists[0].name}
                    </p>
                    <p>Album: {currentlyPlaying.item.album.name}</p>
                    <p>
                      Release date: {currentlyPlaying.item.album.release_date}
                    </p>
                  </CurrentInfoWrapper>
                )}

                <Button
                  style={{ width: "100%", marginTop: "40px" }}
                  onClick={() => getCurrentlyPlaying()}
                >
                  Currently playing
                </Button>
              </CurrentlyPlayingWrap>
            </WrapperInfo>
            {isDashboard ? (
              <Iframe
                url="https://developer.spotify.com/dashboard/applications/e9c4ad0d85dc4141b5a08be0ac51eddc"
                width="100%"
                height="auto"
              />
            ) : (
              <WrapperHistory>
                <h2>Playlist created</h2>

                <WrapGrid>
                  {playlistHistorique.result.map((playlist) => (
                    <PlayListInfoWrapper>
                      <div>
                        <img
                          src={playlist.playlistInfo.images[1].url}
                          alt={playlist.playlistInfo.decription}
                        />
                        <h3>{playlist.playlistInfo.name}</h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "200px",
                            alignItems: "flex-end",
                          }}
                        >
                          <p>{playlist.playlistInfo.tracks.total} tracks</p>
                          <PlaylistAddIcon />
                        </div>
                      </div>
                    </PlayListInfoWrapper>
                  ))}
                </WrapGrid>
              </WrapperHistory>
            )}
          </>
        ) : (
          <>
            <Wrapper>
              <CircularProgress style={{ color: "dodgerblue" }} />
            </Wrapper>
          </>
        )}
      </MainWrapper>
      <Footer />
    </>
  );
};

const CurrentInfoWrapper = styled.div`
  p {
    font-weight: 400;
    padding-bottom: 12px;
  }
`;

const CurrentlyPlayingWrap = styled.div`
  background-color: #ebf5ff;
  padding: 30px;
  height: calc(100vh - 570px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    padding: 0px;
    img {
      width: 100%;
    }
  }
`;

const WrapperUser = styled.div`
  padding: 30px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 30px;
  }
  h2 {
    padding-bottom: 12px;
    font-weight: 400;
  }
`;
const PlayListInfoWrapper = styled.div`
  margin-bottom: 30px;
  div {
    h3 {
      padding-top: 20px;
      font-size: 1.2em;
      font-weight: 400;
      color: black;
    }
    p {
      padding-top: 15px;
    }
    img {
      width: 200px;
      height: 200px;
      /* margin-bottom: 30px; */
    }
    h2 {
      padding-bottom: 30px;
      font-weight: 400;
      font-size: 2em;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const MainWrapper = styled.div`
  display: flex;
  margin: 60px;
  /* padding: 30px; */
  width: calc(100vw - 120px);
  height: calc(100vh - 230px);
  border: 1px solid #e6ecf0;
`;
const WrapperInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-right: 1px solid #e6ecf0;
`;

const WrapGrid = styled.div`
  width: 100%;
  display: grid;
  /* gap: 2rem; */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const WrapperHistory = styled.div`
  width: 100%;
  padding: 60px;
  h2 {
    font-size: 2em;
    padding-bottom: 40px;
  }
  /* display: flex;
  flex-direction: column; */
`;

const Button = styled.button`
  color: dodgerblue;
  display: flex;
  width: 150px;
  align-items: center;
  background-color: white;
  padding: 10px 30px 10px 25px;
  border-radius: 30px;
  border: 1px solid #ff0000;
  margin-top: 60px;
  font-size: 1em;
  display: block;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  box-shadow: 11px 10px 9px -6px rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s ease-in;
`;
export default Profile;

// "{"data":
//   {"country":"CA",
//   "display_name":"DomBonhomme",
//   "email":"troispointzero@hotmail.com",
//   "explicit_content":{
//       "filter_enabled":false,
//       "filter_locked":false
//     },
//   "external_urls":{
//       "spotify":"https://open.spotify.com/user/12121769867"},
//   "followers":{"href":null,"total":5},
//   "href":"https://api.spotify.com/v1/users/12121769867",
//   "id":"12121769867",
//   "images":[{"height":null,"url":"https://i.scdn.co/image/ab6775700000ee85438eef2f8390404fc5d07fb4","width":null}],
