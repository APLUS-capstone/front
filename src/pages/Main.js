import React, { useState } from "react";
import styled from "styled-components";
import Checklist from "../components/main/Checklist";
import PdfString from "../components/main/Pdfstring";
import axios from "axios";
import { useEffect } from "react";
const Main = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "http://3.35.98.162:8080";
  const handleFileUpload = () => {
    setFileUploaded(true);
  };

  useEffect(() => {
    const fetchTest = async () => {
      const url = `${BASE_URL}/chatroom/history`;
      try {
        const response = await axios.get(
          `${url}/1/1`
          // headers: {
          //   accept: "application/json",
          // },
        );
        // const url = `${BASE_URL}/chatroom/uid`;
        // try {
        //   const response = await axios.get(
        //     `${url}/1`
        //     // headers: {
        //     //   accept: "application/json",
        //     // },
        //   );

        console.log(response.data.list);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTest();
  }, []);

  return (
    <MainContainer>
      <PdfString onFileUpload={handleFileUpload} />
      <Checklist fileUploaded={fileUploaded} />
    </MainContainer>
  );
};
export default Main;
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10rem;
  width: 60rem;
  //객관식일때는 선지 개수 옵션이 늘어나니까, 화면 크기를 늘린다
  height: ${(props) => (props.isMultipleChoice ? "50rem" : "45rem")};
  padding: 10px 50px;
  border-radius: 20px;
  position: absolute;
  top: 2rem;
  left: 25rem;
  /* border: 1px solid rgb(159, 159, 160); */
`;
