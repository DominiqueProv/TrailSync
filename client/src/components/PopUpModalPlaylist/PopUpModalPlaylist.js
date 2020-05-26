import React from "react";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import MusicOffOutlinedIcon from "@material-ui/icons/MusicOffOutlined";

export default function PopUpModalPlaylist({ playlistInfo, toggle, open }) {
  return (
    <Dialog
      maxWidth={"md"}
      open={open}
      aria-labelledby="max-width-dialog-title"
    >
      <Wrapper>
        {!playlistInfo ? (
          <>
            <CircularProgress
              style={{ color: "dodgerblue", marginTop: "20px" }}
              size={60}
            />
            <p style={{ textAlign: "center" }}>
              {" "}
              Hold on tight, your playlist is being created...
            </p>
          </>
        ) : (
          <WrapperInfo>
            {typeof playlistInfo === "string" ? (
              <>
                <FailRequest>
                  <NoMusicIcon style={{ fontSize: "50px" }} />
                  <p>{playlistInfo}</p>
                  <ButtonWrong onClick={toggle}>Try again</ButtonWrong>
                </FailRequest>
              </>
            ) : (
              <>
                <WrapperImg>
                  <img
                    src={playlistInfo.images[0].url}
                    alt={playlistInfo.description}
                  />
                </WrapperImg>
                <div>
                  <p>
                    Playlist <br />
                    <span>{playlistInfo.name}</span> <br />
                    has been created on your Spotify application.
                  </p>
                  <h3>Enjoy your hike!</h3>
                  <Button onClick={toggle}>Got it</Button>
                </div>
              </>
            )}
          </WrapperInfo>
        )}
      </Wrapper>
    </Dialog>
  );
}

const WrapperInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  div {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    p {
      line-height: 1.7em;
      padding-bottom: 20px;
      font-weight: 400;
      span {
        font-size: 1.5em;
        color: dodgerblue;
      }
    }
  }
  @media (max-width: 850px) {
    flex-direction: column;
  }
  @media (max-width: 530px) {
    margin-left: 50px;
  }
  @media (max-width: 475px) {
    margin-left: 100px;
  }
  @media (max-width: 400px) {
    width: 250px;
    margin-left: 0px;
    padding: 20px;
  }
`;

const WrapperImg = styled.div`
  margin-right: 60px;
  img {
    width: 250px;
  }
  @media (max-width: 400px) {
    margin-right: 0px;
    img {
      width: 100%;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  padding: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    padding-top: 20px;
    width: 400px;
    /* padding-bottom: 30px; */
  }
  @media (max-width: 400px) {
    padding: 30px;
    p {
      width: 220px;
    }
  }
`;

const FailRequest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    /* width: 100%; */
    padding: 30px;
    @media (max-width: 530px) {
      margin-right: 50px;
    }
    @media (max-width: 475px) {
      margin-right: 100px;
      padding: 20px;
    }
    @media (max-width: 400px) {
      margin-right: 0px;
      padding: 10px;
    }
  }
`;

const NoMusicIcon = styled(MusicOffOutlinedIcon)`
  @media (max-width: 530px) {
    margin-right: 50px;
  }
  @media (max-width: 475px) {
    margin-right: 100px;
    padding: 20px;
  }
  @media (max-width: 400px) {
    margin-right: 0px;
    padding: 10px;
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
  @media (max-width: 400px) {
    margin-top: 30px;
  }
`;

const ButtonWrong = styled.button`
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
  @media (max-width: 530px) {
    margin-right: 50px;
  }
  @media (max-width: 475px) {
    margin-right: 100px;
    /* padding: 20px; */
  }
  @media (max-width: 400px) {
    margin-top: 30px;
    margin-right: 0px;
    padding: 10px;
  }
`;
