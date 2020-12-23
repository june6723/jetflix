import styled from "styled-components";
import { personApi } from "../api";
import React, { useState, useEffect } from "react";

const CastContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const CastInfoLink = styled.a``;
const CastProfileImg = styled.img`
  width: 180px;
`;
const CastName = styled.span`
  font-size: 14px;
  margin-top: 5px;
`;
const CastNameInAct = styled.span`
  margin-top: 5px;
  color: #bdc3c7;
`;

const CastTabLink = ({ cast }) => {
  const [imdbID, setImdbID] = useState("");
  async function getPersonData(id) {
    let result = null;
    try {
      const {
        data: { imdb_id },
      } = await personApi.personData(id);
      result = imdb_id;
    } catch (e) {
      console.log(e);
    } finally {
      setImdbID(result);
    }
  }
  useEffect(() => {
    getPersonData(cast.id);
  }, []);
  return (
    <CastContent>
      <CastInfoLink
        target={"_blank"}
        href={imdbID ? `https://www.imdb.com/name/${imdbID}` : ""}
      >
        <CastProfileImg
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
              : require("../Assets/noPosterSmall.png")
          }
        />
      </CastInfoLink>
      <CastName>{cast.name}</CastName>
      <CastNameInAct>{cast.character}</CastNameInAct>
    </CastContent>
  );
};
export default CastTabLink;
