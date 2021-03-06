import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import MenuIcon from "@material-ui/icons/Menu";
import ExploreIcon from "@material-ui/icons/Explore";

import { CurrentAppContext } from "../contexts/Trails.context";
import { ReactComponent as Logo } from "../../assets/trailSync-hor-05.svg";
import SearchBar from "../SearchBar";
import MenuMobile from "../MenuMobile";

const NavBar = () => {
  const history = useHistory();
  const {
    currentAppState,
    actions: { logout, toggleDay, toggleNight, removeNotificationPill },
  } = useContext(CurrentAppContext);
  let user;
  const [searchModalOpenFlag, setSearchModalOpenFlag] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ToggleModal = () => {
    setSearchModalOpenFlag(!searchModalOpenFlag);
  };
  const ToggleMenuDisplay = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (currentAppState.storage || localStorage.getItem("currentUser")) {
    user = JSON.parse(localStorage.getItem("currentUser"));
  }

  return (
    <>
      <Wrapper data-css="Wrapper">
        <Link to={"/map"}>
          <ContainerLeft data-css="ContainerLeft">
            <BrandImage>Logo</BrandImage>
            <h1 style={{ width: "170px" }}>Custom playlists on the go </h1>
          </ContainerLeft>
        </Link>
        <ContainerRight data-css="ContainerRigth">
          <SearchNav data-css="SearchNav" onClick={() => ToggleModal()}>
            <SearchOutlinedIcon />
          </SearchNav>
          <IconNav data-css="IconNav">
            <Brightness4Icon
              onClick={(ev) => {
                ev.preventDefault();
                currentAppState.isDay === true
                  ? toggleNight(ev)
                  : toggleDay(ev);
                history.push("/map");
              }}
            />
          </IconNav>
          <Link to="/map">
            <IconNav data-css="IconNav">
              <ExploreIcon />
            </IconNav>
          </Link>
          {currentAppState.currentUser || localStorage.getItem("isLoggedIn") ? (
            <>
              <Link to="/Profile">
                <IconNav
                  onClick={(ev) => {
                    ev.preventDefault(ev);
                    removeNotificationPill();
                    history.push("/Profile");
                  }}
                  data-css="IconNav"
                  style={{ position: "relative" }}
                >
                  <Name>{user.data.display_name}</Name>
                  {user.data.images[0] ? (
                    <Avatar src={user.data.images[0].url} alt="avatar" />
                  ) : (
                    <NoProfilePic>
                      {user.data.display_name.charAt(0)}
                    </NoProfilePic>
                  )}
                  {currentAppState.isNotification && (
                    <Notification></Notification>
                  )}
                </IconNav>
              </Link>
              <IconNav
                onClick={() => {
                  logout();
                  history.push("/");
                }}
                data-css="IconNav"
              >
                <ExitToAppOutlinedIcon />
              </IconNav>
            </>
          ) : (
            <p></p>
          )}
          <MenuNav data-css="MenuNav" onClick={() => ToggleMenuDisplay()}>
            <MenuIcon />
          </MenuNav>
        </ContainerRight>
      </Wrapper>
      <SearchBar open={searchModalOpenFlag} toggle={ToggleModal} />
      <MenuMobile
        open={mobileMenuOpen}
        toggle={ToggleMenuDisplay}
        user={user}
        toggleNight={toggleNight}
        toggleDay={toggleDay}
        toggleModal={ToggleModal}
      />
    </>
  );
};

export default NavBar;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 20px 30px;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e6ecf0;
  z-index: 100;
  h2 {
    font-weight: 400;
  }
`;

const Name = styled.p`
  font-size: 0.8em;
  font-weight: 400;
  padding-right: 15px;
`;

const NoProfilePic = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ebf5ff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.9em;
  border: 2px solid dodgerblue;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const BrandImage = styled(Logo)`
  width: 150px;
`;

const IconNav = styled.div`
  padding: 0 20px;
  border-left: 1px solid #e6ecf0;
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #f4f7f6;
  }
  @media (max-width: 750px) {
    display: none;
  }
`;

const MenuNav = styled.div`
  padding: 0 30px;
  border-left: 1px solid #e6ecf0;
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  display: none;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #f4f7f6;
  }
  @media (max-width: 750px) {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchNav = styled.div`
  padding: 0 20px;
  border-left: 1px solid #e6ecf0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #f4f7f6;
  }

  @media (max-width: 750px) {
    display: none;
  }
`;

const ContainerLeft = styled.div`
  display: flex;
  align-items: flex-end;
  /* justify-content: flex-end; */
  cursor: pointer;
  h1 {
    padding-left: 15px;
    font-size: 0.8em;
  }
  @media (max-width: 850px) {
    h1 {
      display: none;
    }
  }
`;
const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
`;

const Notification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: red;
  border-radius: 50%;
  border: 2px solid white;
  color: white;
  font-size: 0.7em;
  height: 12px;
  width: 12px;
  padding-top: 2px;
  text-align: center;
  top: 15px;
  right: 15px;
`;
