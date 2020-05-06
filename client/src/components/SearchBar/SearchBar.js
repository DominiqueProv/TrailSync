import React, { useState, useRef, useEffect, useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import { typeaheadSuggestion } from "../../utils";
import { useHistory } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
const SearchBar = ({ open, toggle }) => {
  const MAX_NUMBER_OF_SUGGESTIONS = 8;
  const { currentAppState } = useContext(CurrentAppContext);
  // const typaheadItems = currentAppState.trails;
  const [suggestions, setSuggestions] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState("");
  console.log(searchInputVal);
  let history = useHistory();

  const handleClickOnItemInSuggestionDropdown = (ev, suggestion) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/trail/${suggestion.id}`);
    toggle();
    window.location.reload(true);

    // setSearchInputVal("");
  };

  useEffect(() => {
    searchInputVal.length >= 3 && typaheadItems
      ? setSuggestions(typeaheadSuggestion(searchInputVal, typaheadItems))
      : setSuggestions([]);
  }, [searchInputVal]);

  let typaheadItems;
  if (currentAppState.storage || localStorage.getItem("trails")) {
    typaheadItems = JSON.parse(localStorage.getItem("trails"));
    typaheadItems = typaheadItems.trails;
    console.log(typaheadItems);
  }
  console.log(suggestions);

  const wrapperRef = useRef(null);
  return (
    <WrapperSearch ref={wrapperRef} data-css="Typehead-Wrapper" open={open}>
      <SearchForm
        // onSubmit={(event) => submitHandler(event)}
        open={open}
        autocomplete="off"
      >
        <InputField
          type="text"
          placeholder="Search trail..."
          name="search"
          open={open}
          onChange={(event) => setSearchInputVal(event.target.value)}
          autocomplete="off"
          value={searchInputVal}
        />
        <TypeaheadSuggestions data-css="typeaheadDropDown">
          {suggestions.map(
            (suggestion, index) =>
              index < MAX_NUMBER_OF_SUGGESTIONS && (
                <DropDownItem
                  key={`trail-${index}`}
                  onClick={(ev) =>
                    handleClickOnItemInSuggestionDropdown(ev, suggestion)
                  }
                >
                  <RoomOutlinedIcon
                    style={{
                      color: "white",
                      paddingRight: "15px",
                      fontSize: "40px",
                    }}
                  />
                  <p>{suggestion.name}</p>
                  <Button>Go</Button>
                </DropDownItem>
              )
          )}
        </TypeaheadSuggestions>
      </SearchForm>
    </WrapperSearch>
  );
};

const WrapperSearch = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  padding: 60px;
  /* display: none; */
  position: fixed;
  display: flex;
  justify-content: flex-start;
  /* z-index: 0; */
  display: none;
  /* top: 0;
  left: 0; */
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.85);
  transition: ease-in-out 0.2s all;
  ${(props) =>
    props.open
      ? `background-color: background-color: rgba(0, 0, 0, 0.85); display: flex; z-index: 4;`
      : `background-color: transparent; display : none;`};
`;

const SearchForm = styled.form`
  display: inline-block;
  padding-right: 60px;
  ${(props) => (props.open ? `display: inline-block;` : `display: none;`)};
`;

const Button = styled.button`
  /* width: 20%; */
  padding: 15px;
  background: #ddd;
  font-size: 17px;
  border: none;
  display: none;
  cursor: pointer;
  /* display: inline-block; */
  ${(props) => (props.open ? `display: block;` : `display: none;`)}
`;

const InputField = styled.input`
  /* width: 100vw; */
  height: 15vh;
  margin-top: 30px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  margin: auto;
  display: inline-block;
  color: #ffffff;
  font-size: 7vw;
  ${(props) => (props.open ? `display: inline-block;` : `display: none;`)};

  ::placeholder {
    color: #d3d3d3;
    font-size: 7vw;
  }
`;

const TypeaheadSuggestions = styled.div`
  position: absolute;
  padding-right: 120px;
  top: 300px;
  /* left: 60px; */
  /* width: 60vw; */
  background-color: transparent;
  /* padding: 60px; */
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  /* @media (max-width: 1425px) {
    margin-left: 6px;
    width: 411px;
    -webkit-box-shadow: 0px 19px 25px -12px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 19px 25px -12px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 19px 25px -12px rgba(0, 0, 0, 0.15);
  } */
`;

const DropDownItem = styled.div`
  color: white;
  display: flex;
  align-items: center;
  padding: 30px;
  transition: all 0.2s ease-in;
  border: 1px solid #fff;
  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

export default SearchBar;
