import React, { useContext } from "react";
import styled from "styled-components";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { CurrentAppContext } from "../contexts/Trails.context";
import { ReactComponent as Logo } from "../../assets/trailSync-black.svg";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const {
    currentAppState,
    actions: { logout },
  } = useContext(CurrentAppContext);
  let user;

  if (currentAppState.storage || localStorage.getItem("currentUser")) {
    user = JSON.parse(localStorage.getItem("currentUser"));
  }

  return (
    <>
      <Wrapper data-css="Wrapper">
        <Link to={"/map"}>
          <ContainerLeft data-css="ContainerLeft">
            <BrandImage>Logo</BrandImage>
          </ContainerLeft>
        </Link>
        <ContainerRight data-css="ContainerRigth">
          <SearchNav data-css="SearchNav">
            <SearchOutlinedIcon />
          </SearchNav>
          <IconNav data-css="IconNav">
            <LanguageOutlinedIcon />
          </IconNav>
          {currentAppState.currentUser || localStorage.getItem("isLoggedIn") ? (
            <>
              <Link to="#">
                <IconNav data-css="IconNav">
                  <Name>{user.data.display_name}</Name>
                  <Avatar src={user.data.images[0].url} alt="avatar" />
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
          <MenuNav data-css="MenuNav">
            <MenuIcon />
          </MenuNav>
        </ContainerRight>
      </Wrapper>
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
  h2 {
    font-weight: 400;
  }
`;

const Name = styled.p`
  font-size: 0.8em;
  font-weight: 400;
  padding-right: 15px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const BrandImage = styled(Logo)`
  width: 60px;
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
  @media (max-width: 700px) {
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
  @media (max-width: 700px) {
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

  @media (max-width: 700px) {
    display: none;
  }
`;

const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
`;
