import "./loader.element.css";
import styled from "styled-components";
const Loader = () => {
  return (
    <LoaderConatiner>
      <div class="loader">
        <div class="pencil">
          <p>Loading...</p>
          <div class="top"></div>
        </div>
        <div class="stroke"></div>
      </div>
      <TextContainer>
        <p>문제를 생성중입니다.</p>
        <p>조금만 기다려주세요</p>
      </TextContainer>
    </LoaderConatiner>
  );
};

const LoaderConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TextContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 30%;
`;
export default Loader;
