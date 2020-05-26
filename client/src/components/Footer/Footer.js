import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <div>
        <p>Millions of songs, thousands of hikes, only one like you &trade; </p>
      </div>
      <div>
        <i className="fab fa-twitter" style={{ paddingLeft: "20px" }}></i>
        <i className="fab fa-facebook"></i>
        <i className="fas fa-share-alt-square"></i>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 25px;
  border-top: 1px solid #e6ecf0;
  background-color: white;
  z-index: 100;
  p {
    font-weight: 400;
    font-size: 0.9em;
    @media (max-width: 750px) {
      font-size: 0.7em;
    }
  }
  i {
    margin-left: 20px;
    @media (max-width: 750px) {
      margin-left: 10px;
    }
  }
  @media (max-width: 450px) {
    p {
      width: 200px;
    }
  }
`;

export default Footer;
