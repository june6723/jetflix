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
  console.log(content);

  return (
    <Container>
      <TitleList>
        {content &&
          content.map((item, index) => (
            <TabTitle>
              <TabButton onClick={() => setCurrent(index)}>
                {item.tabTitle}
              </TabButton>
            </TabTitle>
          ))}
      </TitleList>
      <ContentContainer>
        {/* {content[current] &&
          content[current].tabContent.map((item) => <span>{item.id}</span>)} */}
      </ContentContainer>
    </Container>
  );
};

export default DetailTabs;
