import React, { useContext } from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { CurrentAppContext } from "../contexts/Trails.context";
import { ReactComponent as Logo } from "../../assets/trailSync-black.svg";
import { useHistory } from "react-router-dom";

// import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

const NavBar = () => {
  const history = useHistory();
  const {
    currentAppState,
    actions: { logout },
  } = useContext(CurrentAppContext);

  return (
    <>
      <Wrapper data-css="Wrapper">
        <Link to={"/create"}>
          <ContainerLeft data-css="ContainerLeft">
            <BrandImage>Logo</BrandImage>
          </ContainerLeft>
        </Link>
        <ContainerRight data-css="ContainerRigth">
          <SearchNav
            // onClick={() => logout()}
            data-css="SearchNav"
          >
            <SearchOutlinedIcon />
          </SearchNav>
          <IconNav data-css="IconNav">
            <LanguageOutlinedIcon />
          </IconNav>
          {currentAppState.currentUser ? (
            <Link to="#">
              <IconNav data-css="IconNav">
                <Avatar
                  src={currentAppState.currentUser.data.images[0].url}
                  alt="avatar"
                />
              </IconNav>
            </Link>
          ) : (
            <p></p>
          )}
          {currentAppState.isLoggedIn && (
            <IconNav
              onClick={() => {
                logout();
                history.push("/");
              }}
              data-css="IconNav"
            >
              <ExitToAppOutlinedIcon />
            </IconNav>
          )}
          <MenuNav
            // onClick={() => logout()}
            data-css="MenuNav"
          >
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

const NumItemCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: 0.7em;
  height: 20px;
  width: 20px;
  padding-top: 2px;
  text-align: center;
  top: 18px;
  right: 18px;
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
  /* display: none; */
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #f4f7f6;
  }
  /* @media (max-width: 990px) {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
  } */
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
