import React, { useState, useRef, useEffect, useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ExploreIcon from "@material-ui/icons/Explore";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const MenuMobile = ({
  open,
  toggle,
  user,
  toggleNight,
  toggleDay,
  toggleModal,
}) => {
  const {
    currentAppState,
    actions: { logout, removeNotificationPill },
  } = useContext(CurrentAppContext);
  const wrapperRef = useRef(null);
  const history = useHistory();
  return (
    <WrapperMenu ref={wrapperRef} data-css="Typehead-Wrapper" open={open}>
      <WrapperTopPart>
        <WrapperAvartarClose>
          <div>
            <Avatar src={user.data.images[0] ? user.data.images[0].url : ""} />
            <p>{user.data.display_name}</p>
          </div>
          <div>
            <Button
              onClick={(ev) => {
                ev.preventDefault();
                toggle();
              }}
            >
              X
            </Button>
          </div>
        </WrapperAvartarClose>
        <ProfileWrapper>
          <AccountCircleOutlinedIcon
            style={{ color: "white", fontSize: "40px" }}
          />
          <p
            onClick={(ev) => {
              ev.preventDefault();
              toggle();
              history.push("/profile");
              removeNotificationPill();
            }}
          >
            Profile dashboard
          </p>
          {currentAppState.isNotification && <Notification></Notification>}
        </ProfileWrapper>
        <MapWrapper>
          <ExploreIcon style={{ color: "white", fontSize: "40px" }} />

          <p
            onClick={(ev) => {
              ev.preventDefault();
              toggle();
              history.push("/map");
            }}
          >
            Explore the trails
          </p>
        </MapWrapper>
        <MapWrapper>
          <SearchOutlinedIcon style={{ color: "white", fontSize: "40px" }} />
          <p
            onClick={(ev) => {
              ev.preventDefault();
              toggle();
              toggleModal();
            }}
          >
            Search
          </p>
        </MapWrapper>
      </WrapperTopPart>
      <WrapperBottom>
        <BrightnessWrap>
          <Brightness4Icon
            style={{ color: "white", fontSize: "30px", cursor: "pointer" }}
            onClick={(ev) => {
              ev.preventDefault();
              currentAppState.isDay === true ? toggleNight(ev) : toggleDay(ev);
              toggle();
              history.push("/map");
            }}
          />
          <p>Day/Night</p>
        </BrightnessWrap>
        <LogoutWrap>
          <ExitToAppOutlinedIcon
            style={{ color: "white", fontSize: "30px", cursor: "pointer" }}
            onClick={() => {
              logout();
              history.push("/");
            }}
          />
        </LogoutWrap>
      </WrapperBottom>
    </WrapperMenu>
  );
};

const WrapperMenu = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  padding: 30px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: none;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  transition: ease-in-out 0.2s all;
  ${(props) =>
    props.open
      ? `background-color: background-color: rgba(0, 0, 0, 0.9); display: flex; z-index: 4;`
      : `background-color: transparent; display : none;`};
`;

const WrapperTopPart = styled.div``;
const WrapperAvartarClose = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    p {
      font-size: 0.8em;
      font-weight: 400;
      padding-left: 15px;
      color: white;
    }
  }
`;
const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid white;
`;
const Button = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  outline: none;
  cursor: pointer;
  color: white;
  font-size: 15px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 80px;
  position: relative;
  p {
    color: white;
    margin-left: 15px;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  p {
    color: white;
    margin-left: 15px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const WrapperBottom = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const BrightnessWrap = styled.div``;
const LogoutWrap = styled.div``;

const Notification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: 0.7em;
  height: 12px;
  width: 12px;
  padding-top: 2px;
  margin-left: 15px;
  text-align: center;
  top: 15px;
  right: 15px;
`;

export default MenuMobile;
