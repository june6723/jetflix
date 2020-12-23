import React from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import ImdbLogo from "../Components/ImdbLogo";
import { Helmet } from "react-helmet-async";
import DetailTabs from "../Components/DetailTabs";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  /* padding-bottom: 0; */
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
  height: 100vh;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0px 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  width: 50%;
`;
const titles = ["Videos", "Cast"];
const v = [1, 2, 3, 4];
const c = ["a", "b", "c", "d"];

const ShowDetail = ({ result, videos, casts, error, loading }) => {
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Jetflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message color="#e74c3c" text={error} />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Jetflix
        </title>
      </Helmet>
      <Backdrop
        bgImg={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
      ></Backdrop>
      <Content>
        <Cover
          bgImg={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original/${result.poster_path}`
              : require("../Assets/noPosterSmall.png")
          }
        ></Cover>
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {(result.imdb_id || result.external_ids.imdb_id) && (
              <Divider>·</Divider>
            )}
            {(result.imdb_id || result.external_ids.imdb_id) && (
              <Item>
                <ImdbLogo imdb_id={result.imdb_id} />
              </Item>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <DetailTabs tabTitleList={titles} videos={videos} casts={casts} />
        </Data>
      </Content>
    </Container>
  );
};

export default ShowDetail;
