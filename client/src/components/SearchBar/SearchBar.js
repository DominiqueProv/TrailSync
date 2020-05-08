import React, { useState, useRef, useEffect, useContext } from "react";
import { CurrentAppContext } from "../contexts/Trails.context";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
const SearchBar = ({ open, toggle }) => {
  const MAX_NUMBER_OF_SUGGESTIONS = 8;
  const { currentAppState } = useContext(CurrentAppContext);
  const [suggestions, setSuggestions] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState("");
  let history = useHistory();

  const typeaheadSuggestion = (input, totalOptions) => {
    const suggestions1 = [];
    totalOptions.forEach((option) => {
      if (
        option.properties.Toponyme1.toLowerCase().includes(input.toLowerCase())
      )
        suggestions1.push({
          id: option._id,
          name: option.properties.Toponyme1,
        });
    });
    return suggestions1;
  };

  const handleClickOnItemInSuggestionDropdown = (ev, suggestion) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/trail/${suggestion.id}`);
    toggle();
    window.location.reload(true);
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
  }

  const wrapperRef = useRef(null);
  return (
    <WrapperSearch ref={wrapperRef} data-css="Typehead-Wrapper" open={open}>
      <SearchForm open={open}>
        <InputField
          ref={(input) => input && input.focus()}
          type="text"
          placeholder="Search trail..."
          autoFocus
          name="search"
          open={open}
          onChange={(event) => setSearchInputVal(event.target.value)}
          autoComplete="off"
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
  position: fixed;
  display: flex;
  justify-content: flex-start;
  display: none;
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
  padding: 15px;
  background: #ddd;
  font-size: 17px;
  border: none;
  display: none;
  cursor: pointer;
  ${(props) => (props.open ? `display: block;` : `display: none;`)}
`;

const InputField = styled.input`
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
    color: #595959;
    font-size: 7vw;
  }
`;

const TypeaheadSuggestions = styled.div`
  position: absolute;
  padding-right: 120px;
  top: 300px;
  background-color: transparent;
  width: 100%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
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
