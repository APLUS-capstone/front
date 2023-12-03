import styled from "styled-components";

// 공통으로 사용되는 StyledButton 정의
const StyledButton = styled.button`
  margin-top: 1rem;
  left: 30%;
  display: inline-block;
  border-radius: 7px;
  border: none;
  background: #1875ff;
  color: white;
  font-family: inherit;
  text-align: center;
  font-size: 13px;
  box-shadow: 0px 14px 56px -11px #1875ff;
  width: 13rem;
  padding: 1em;
  transition: all 0.4s;
  cursor: pointer;
  &:hover span {
    padding-right: 3.55em;
  }

  &:hover span:after {
    opacity: 1; // 수정: 0에서 1로 변경
    right: 0;
  }
`;
const StyledButton1 = styled.button`
  margin-top: 1rem;
  left: 30%;
  display: inline-block;
  border-radius: 7px;
  border: none;
  background: #1875ff;
  color: white;
  font-family: inherit;
  text-align: center;
  font-size: 13px;
  box-shadow: 0px 14px 56px -11px #1875ff;
  width: 11.4375rem;
  height: 2.8125rem;
  padding: 1em;
  transition: all 0.4s;
  cursor: pointer;
`;

// 첫 번째 컴포넌트
export const CustomBtn = ({ text, onClick }) => {
  return (
    <StyledButton1
      type="button"
      style={{ verticalAlign: "middle" }}
      onClick={onClick}
    >
      <span>{text}</span>
    </StyledButton1>
  );
};

// 두 번째 컴포넌트
export const CustomBtnText = ({ text, textAfter, onClick }) => {
  return (
    <StyledButton
      type="button"
      style={{ verticalAlign: "middle" }}
      onClick={onClick}
    >
      <ButtonSpan textAfter={textAfter}>{text}</ButtonSpan>
    </StyledButton>
  );
};

// ButtonSpan 스타일드 컴포넌트 (CustomBtnText에만 사용됨)
const ButtonSpan = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;

  &:after {
    content: "${(props) => props.textAfter || ""}";
    position: absolute;
    opacity: 0;
    top: 0;
    right: -50px;
    transition: 0.7s;
  }
`;

StyledButton.defaultProps = {
  onClick: () => {},
};
