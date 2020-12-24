import styled from "styled-components";
import React from "react";
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 25px;
  justify-content: center;
`;
const SeasonContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const SeasonPoster = styled.img`
  margin-bottom: 5px;
`;
const SeasonText = styled.span`
  font-size: 16px;
`;

const TVSeasonTab = ({ seasons }) => {
  return (
    <Container>
      {seasons.map((season) => (
        <SeasonContent>
          <SeasonPoster
            src={
              season.poster_path
                ? `https://image.tmdb.org/t/p/w200${season.poster_path}`
                : require("../Assets/noPosterSmall.png")
            }
          />
          <SeasonText>Season {season.season_number}</SeasonText>
        </SeasonContent>
      ))}
    </Container>
  );
};

export default TVSeasonTab;
