import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  height: 55%;
`;
const TitleList = styled.ul`
  border: 1px solid blue;
  display: flex;
  align-items: center;
`;
const TabTitle = styled.li`
  margin-right: 10px;
  height: 50px;
  width: 100px;
`;
const TabButton = styled.button`
  height: 100%;
  width: 100%;
`;
const ContentContainer = styled.div`
  border: 1px solid orange;
  overflow: auto;
  height: 100%;
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
              <TabButton onClick={() => setCurrent(index)}>
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
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 25px;
  justify-content: center;
`;
const CastContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const CastProfileImg = styled.img`
  width: 150px;
`;
const CastName = styled.span``;
const CastNameInAct = styled.span``;
const CastTab = ({ casts }) => {
  console.log(casts);
  return (
    <CastTemplate>
      {casts &&
        casts.map((cast) => (
          <CastContent key={cast.id}>
            <CastProfileImg
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                  : require("../Assets/noPosterSmall.png")
              }
            />
            <CastName>{cast.name}</CastName>
            <CastNameInAct>{cast.character}</CastNameInAct>
          </CastContent>
        ))}
    </CastTemplate>
  );
};

export default DetailTabs;
