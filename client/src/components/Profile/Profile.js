import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Iframe from "react-iframe";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { CurrentAppContext } from "../contexts/Trails.context";
import Footer from "../Footer";
import { ip } from "../../constants";

let name;
let email;
let avatar;
let userId;
let body;
let initialNoProfile;

const Profile = () => {
  const [isDashboard, setIsDashboard] = useState(false);
  const [playlistHistorique, setPlaylistHistorique] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const { currentAppState } = useContext(CurrentAppContext);

  useEffect(() => {
    if (currentAppState.storage || localStorage.getItem("isLoggedIn")) {
      userId = JSON.parse(localStorage.getItem("currentUser"));
      body = JSON.stringify({ userId: userId.data.id });
      name = userId.data.display_name;
      initialNoProfile = name.charAt(0);

      email = userId.data.email;
      if (userId.data.images[0]) {
        avatar = userId.data.images[0].url;
      }
      loadHistorique(body);
    }

    async function loadHistorique(body) {
      try {
        let token = localStorage.getItem("tokens");
        const res = await fetch(`${ip}/getcurrentlyplaying`, {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({ access_token: token }),
        });

        const currentlyPlaying = await res.json();
        setCurrentlyPlaying(currentlyPlaying);

        const result = await fetch(`${ip}/getHistorique`, {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: body,
        });
        const data = await result.json();
        setPlaylistHistorique(data);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  async function getCurrentlyPlaying() {
    let token = localStorage.getItem("tokens");
    const res = await fetch(`${ip}/getcurrentlyplaying`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token: token }),
    });

    const currentlyPlaying = await res.json();
    setCurrentlyPlaying(currentlyPlaying);
  }

  return (
    <>
      <MainWrapper>
        {playlistHistorique !== null ? (
          <>
            <WrapperInfo>
              <WrapperUser>
                <div>
                  {avatar ? (
                    <img src={avatar} alt="Profile" />
                  ) : (
                    <NoProfilePic>{initialNoProfile}</NoProfilePic>
                  )}
                </div>
                <div>
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
                </div>
              </WrapperUser>
              <CurrentlyPlayingWrap>
                {currentlyPlaying === `Nothing is playing at the moment` ? (
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
                    <div>
                      <p style={{ fontWeight: "700" }}>
                        {currentlyPlaying.item.artists[0].name}
                      </p>
                      <p>Album: {currentlyPlaying.item.album.name}</p>
                      <p>
                        Release date: {currentlyPlaying.item.album.release_date}
                      </p>
                    </div>
                  </CurrentInfoWrapper>
                )}

                <Button
                  onClick={() => getCurrentlyPlaying()}
                  style={{ width: "max-content" }}
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
                {playlistHistorique !== null && playlistHistorique !== [] ? (
                  <WrapGrid>
                    {playlistHistorique.result
                      .map((playlist) => (
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
                      ))
                      .reverse()}
                  </WrapGrid>
                ) : (
                  <div></div>
                )}
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

const NoProfilePic = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ebf5ff;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 1.5em;
  border: 2px solid dodgerblue;

  @media (max-width: 1005px) {
    width: 60px;
    height: 60px;
    margin-right: 25px;
    font-size: 1em;
  }
`;

const CurrentInfoWrapper = styled.div`
  div {
    p {
      font-weight: 400;
      padding-bottom: 12px;
    }
  }
  @media (max-width: 1005px) {
    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

const CurrentlyPlayingWrap = styled.div`
  background-color: #ebf5ff;
  padding: 30px;
  /* height: calc(100vh - 450px); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    padding: 0px;
    img {
      width: 100%;
    }
    @media (max-width: 1005px) {
      flex-direction: flex-start;
    }
  }
  @media (max-width: 1005px) {
    height: auto;
    justify-content: flex-start;
    width: inherit;
    div {
      display: flex;
      /* flex-direction: column; */
      img {
        width: 100px;
        margin-right: 20px;
      }
    }
  }
`;

const WrapperUser = styled.div`
  padding: 30px;
  width: 400px;
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
  @media (max-width: 1005px) {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      flex-direction: column;
      img {
        width: 60px;
        height: 60px;
        margin-right: 25px;
      }
    }
  }
  @media (max-width: 750px) {
    /* div { */
    /* display: flex; */
    width: 100%;
    flex-direction: row;
    /* } */
    img {
      margin-bottom: 0px;
    }
  }
  @media (max-width: 500px) {
    div {
      h2 {
        font-size: 3vw;
      }
      p {
        font-size: 3vw;
      }
    }
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
      @media (max-width: 750px) {
        width: 80%;
        height: 80%;
      }
    }
    h2 {
      padding-bottom: 30px;
      font-weight: 400;
      font-size: 2em;
    }
  }
  @media (max-width: 750px) {
    margin-bottom: 60px;
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
  width: calc(100vw - 120px);
  min-height: calc(100vh - 240px);
  border: 1px solid #e6ecf0;
  @media (max-width: 1005px) {
    flex-direction: column;
  }
  @media (max-width: 600px) {
    margin: 20px;
    width: calc(100vw - 40px);
  }
`;
const WrapperInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-right: 1px solid #e6ecf0;
  width: 265px;
  @media (max-width: 1005px) {
    width: 100%;
    flex-direction: flex-start;
    border-bottom: 1px solid #e6ecf0;
    border-right: none;
  }
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const WrapGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  @media (max-width: 750px) {
    grid-template-columns: repeat(auto-fill, 1fr);
  }
`;

const WrapperHistory = styled.div`
  width: 100%;
  padding: 60px;
  h2 {
    font-size: 2em;
    padding-bottom: 40px;
  }
  @media (max-width: 500px) {
    padding: 20px;
  }
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
  /* width: 100%; */
  @media (max-width: 1005px) {
    margin-top: 15px;
    /* width: fit-content; */
  }
`;
export default Profile;
