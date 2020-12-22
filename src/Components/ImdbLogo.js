import styled from "styled-components";
import React from "react";

const LinkContainer = styled.a``;
const ImdbImg = styled.img`
  width: 30px;
`;
const ImdbLogo = ({ imdb_id }) => (
  <LinkContainer
    target={"_blank"}
    href={`https://www.imdb.com/title/${imdb_id}`}
  >
    <ImdbImg src={require("../Assets/imdb_logo.png")} />
  </LinkContainer>
);

export default ImdbLogo;
