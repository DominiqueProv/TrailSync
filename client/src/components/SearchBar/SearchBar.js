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
        option.properties.Toponyme1.toLowerCase().includes(
          input.toLowerCase()
        ) ||
        option.properties.Niv_diff.toLowerCase().includes(
          input.toLowerCase()
        ) ||
        option.properties.Nom_etab.toLowerCase().includes(input.toLowerCase())
      )
        suggestions1.push({
          id: option._id,
          name: option.properties.Toponyme1,
          diff: option.properties.Niv_diff,
          reseau: option.properties.Reseau,
          etablissement: option.properties.Nom_etab,
        });
    });
    return suggestions1;
  };

  const handleClickOnItemInSuggestionDropdown = (ev, suggestion) => {
    ev.preventDefault();
    // console.log(typeof suggestion.id);
    // let trailNum = suggestion.id.toString();
    // console.log(typeof trailNum);
    history.push(`/trail/${suggestion.id}`);
    toggle();
    window.location.reload(true);
  };

  useEffect(() => {
    searchInputVal.length >= 1 && typaheadItems
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "15px",
                    }}
                  >
                    <RoomOutlinedIcon
                      style={{
                        color: "white",
                        paddingRight: "15px",
                        fontSize: "35px",
                      }}
                    />
                    <p>{suggestion.name}</p>
                  </div>
                  <p
                    style={{
                      paddingBottom: "15px",
                      fontWeight: "400",
                      textAlign: "center",
                    }}
                  >
                    {suggestion.reseau} {suggestion.etablissement}
                  </p>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "400" }}>
                      Level : {suggestion.diff}
                    </p>
                    <div
                      style={{
                        backgroundColor:
                          suggestion.diff === "Facile"
                            ? "green"
                            : suggestion.diff === "Intermédiaire"
                            ? "yellow"
                            : suggestion.diff === "Moyen"
                            ? "yellow"
                            : suggestion.diff === "Difficile"
                            ? "orange"
                            : "red",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        marginLeft: "15px",
                      }}
                    ></div>
                  </div>
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
  background-color: rgba(0, 0, 0, 0.9);
  transition: ease-in-out 0.2s all;
  @media (max-width: 750px) {
  }
  ${(props) =>
    props.open
      ? `background-color: background-color: rgba(0, 0, 0, 0.9); display: flex; z-index: 4;`
      : `background-color: transparent; display : none;`};
`;

const SearchForm = styled.form`
  display: inline-block;
  width: 100%;
  position: relative;
  ${(props) => (props.open ? `display: inline-block;` : `display: none;`)};
`;

const InputField = styled.input`
  width: 100%;
  margin-top: 30px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  margin: auto;
  display: inline-block;
  color: #ffffff;
  font-size: 7vw;
  @media (max-width: 750px) {
  }
  ${(props) => (props.open ? `display: inline-block;` : `display: none;`)};

  ::placeholder {
    color: #595959;
    font-size: 7vw;
  }
`;

const TypeaheadSuggestions = styled.div`
  position: absolute;
  top: 200px;
  background-color: transparent;
  width: 100%;
  @media (max-width: 900px) {
    top: 100px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr, 1fr));
  }
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  @media (max-width: 1405px) {
    height: calc(100vh - 400px);
    overflow: scroll;
  }
  @media (max-width: 900px) {
    height: calc(100vh - 300px);
    overflow: scroll;
  }
  @media (max-width: 620px) {
    height: calc(100vh - 280px);
    overflow: scroll;
  }
`;

const DropDownItem = styled.div`
  color: white;
  background-color: #1c2126;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  transition: all 0.2s ease-in;
  @media (max-width: 750px) {
    align-items: flex-start;
    padding: 10px;
  }
  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

export default SearchBar;
