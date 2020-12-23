import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CastTabLink from "./CastTabLink";

const Container = styled.div`
  margin-top: 20px;
  height: 55%;
`;
const TitleList = styled.ul`
  display: flex;
  align-items: center;
`;
const TabTitle = styled.li`
  height: 50px;
  width: 100px;
`;
const TabButton = styled.button`
  height: 100%;
  width: 100%;
  background: ${(props) => (props.current ? "#3498db" : "rgba(20, 20, 20, 1)")};
  color: #ecf0f1;
  border: none;
  cursor: ${(props) => (props.current ? "default" : "pointer")};
`;
const ContentContainer = styled.div`
  overflow: auto;
  height: 100%;
  background-color: rgba(20, 20, 20, 1);
  padding: 10px 0;
`;

const DetailTabs = ({ tabTitleList, ...tabContentDatas }) => {
  const [current, setCurrent] = useState(0);
  const [content, setContent] = useState([]);

  const FillContent = () => {
    let count = 0;
    let mergedContents = [];
    for (const data in tabContentDatas) {
      const newContent = [
        { tabTitle: tabTitleList[count], tabContent: tabContentDatas[data] },
      ];
      mergedContents = mergedContents.concat(newContent);
      count++;
    }
    setContent(mergedContents);
  };

  useEffect(() => {
    FillContent();
  }, []);

  return (
    <Container>
      <TitleList>
        {content &&
          content.map((item, index) => (
            <TabTitle key={index}>
              <TabButton
                current={index === current ? true : false}
                onClick={() => setCurrent(index)}
              >
                {item.tabTitle}
              </TabButton>
            </TabTitle>
          ))}
      </TitleList>
      <ContentContainer>
        {content[current] && content[current].tabTitle === "Videos" && (
          <VideosTab videos={content[current].tabContent} />
        )}
        {content[current] && content[current].tabTitle === "Cast" && (
          <CastTab casts={content[current].tabContent} />
        )}
      </ContentContainer>
    </Container>
  );
};
const VideoTemplate = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 420px);
  grid-gap: 25px;
  justify-content: center;
`;
const YTVideo = styled.iframe`
  width: 420px;
  height: 240px;
`;
const VideosTab = ({ videos }) => {
  return (
    <VideoTemplate>
      {videos &&
        videos.map((video) => (
          <YTVideo
            key={video.id}
            src={`https://www.youtube.com/embed/${video.key}`}
          ></YTVideo>
        ))}
    </VideoTemplate>
  );
};
const CastTemplate = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-gap: 25px;
  justify-content: center;
`;

const CastTab = ({ casts }) => {
  return (
    <CastTemplate>
      {casts && casts.map((cast) => <CastTabLink key={cast.id} cast={cast} />)}
    </CastTemplate>
  );
};

export default DetailTabs;
