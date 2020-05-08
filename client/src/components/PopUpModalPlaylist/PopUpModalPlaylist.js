import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function PopUpModalPlaylist({ playlistInfo, toggle, open }) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  // const [fullWidth, setFullWidth] = React.useState(true);
  // const [maxWidth, setMaxWidth] = React.useState("sm");
  return (
    <Dialog
      // fullWidth={fullWidth}
      maxWidth={"md"}
      open={open}
      // onClose={toggle}
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
            <div style={{ marginRight: "60px" }}>
              <img
                src={playlistInfo.images[0].url}
                alt={playlistInfo.description}
                width={"250px"}
              />
            </div>
            <div>
              <p>
                Playlist <br />
                <span>{playlistInfo.name}</span> <br />
                has been created on your Spotify application.
              </p>
              <h3>Enjoy your hike!</h3>
              <Button onClick={toggle}>Got it</Button>
            </div>
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
