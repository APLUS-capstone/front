//문제 유형 선택하는 부분
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import RadioGroup from "../RadioGroup";
import { CustomBtnText } from "../CustomButtons";
import styled from "styled-components";
import FormSection from "./FormSection";

const Checklist = ({ fileUploaded, setIsLoading }) => {
  const [questionTypeRadio, setQuestionTypeRadio] = useState("multipleChoice");
  const [languageType, setLanguageType] = useState("1");
  const [optionsCount, setOptionsCount] = useState(0);
  const [questionsCount, setQuestionsCount] = useState("");
  const navigate = useNavigate();

  const handleQuestionTypeChange = (e) => {
    setQuestionTypeRadio(e.target.value);
  };
  const handleLanguageTypeChange = (e) => {
    setLanguageType(e.target.value);
  };
  const handleOptionsCountChange = (e) => {
    setOptionsCount(e.target.value);
  };

  const handleQuestionsCountChange = (e) => {
    setQuestionsCount(e.target.value);
  };

  // 문제 유형을 숫자로 변환
  let questionTypeValue;
  switch (questionTypeRadio) {
    //객관식 = 1
    case "multipleChoice":
      questionTypeValue = 1;
      break;
    //주관식 = 2
    case "essayQuestion":
      questionTypeValue = 2;
      break;
    //서술형 = 3
    case "shortAnswer":
      questionTypeValue = 3;
      break;
    default:
      questionTypeValue = 0; // 기본값 혹은 오류 처리
  }
  const { chatId, addNewChatRoom, pdfName } = useStore((state) => ({
    chatId: state.chatId,
    addNewChatRoom: state.addNewChatRoom,
    pdfName: state.pdfName,
  }));
  //각각 입력받은 문제입력 form 을 확인하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const QuestionData = {
      roomUid: 1,
      type: questionTypeValue,
      number:
        questionTypeRadio === "multipleChoice" ? parseInt(optionsCount, 10) : 0,
      choice: parseInt(questionsCount, 10) || 0, //정수값
      language: parseInt(languageType, 10), //정수값
    };

    //나중에 DB에 보내야하는 부분 (사용자가 입력한 문제 폼)
    fetch("http://3.35.98.162:8080/pdf/option", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(QuestionData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false); // 로딩 상태 업데이트

        // 서버 응답에서 list 배열 -> 여기에 질문 & 답 & 해설
        const questionsList = data.list || [];
        console.log(questionsList); // list 배열을 콘솔에 출력

        questionsList.forEach((question) => {
          console.log(question.question); // 각 질문 내용 출력
          console.log(question.answer); // 각 질문의 답변 출력
          console.log(question.solution); // 각 질문의 해설 출력
        });

        navigate(`/chatroom/${1}`); // chatroom으로 이동 - 일단 1
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // 에러 발생 시 로딩 상태 업데이트
      });

    //일단 임시로 loader 에 5초 있다가, chatroom으로 이동하게
    // if (chatId) {
    //   navigate(`/chatroom/${chatId}`);
    //   addNewChatRoom(chatId);
    // }
    // navigate("/loader");

    // setTimeout(() => {
    //   addNewChatRoom(chatId, pdfName);
    //   navigate(`/chatRoom/${chatId}`);
    // }, 5000);
  };

  return (
    fileUploaded && (
      <ChecklistItem>
        <FormSection title="문제 유형 선택">
          <RadioGroup
            name="questionType"
            options={[
              { value: "multipleChoice", label: "객관식" },
              { value: "essayQuestion", label: "주관식" },
              { value: "shortAnswer", label: "단답형" },
            ]}
            selectedValue={questionTypeRadio}
            onChange={handleQuestionTypeChange}
          />
        </FormSection>

        {questionTypeRadio === "multipleChoice" && (
          <FormSection title="보기 개수">
            <InputText
              type="number"
              placeholder="선지 개수 입력"
              value={optionsCount}
              onChange={handleOptionsCountChange}
            />
          </FormSection>
        )}

        <FormSection title="문제수 입력">
          <InputText
            type="text"
            placeholder="10"
            value={questionsCount}
            onChange={handleQuestionsCountChange}
          />
        </FormSection>

        <FormSection title="언어 선택">
          <RadioGroup
            name="languageType"
            options={[
              { value: "1", label: "한국어" },
              { value: "2", label: "영어" },
            ]}
            selectedValue={languageType}
            onChange={handleLanguageTypeChange}
          />
        </FormSection>
        <CustomBtnText
          text="Create Question"
          textAfter="✔️"
          onClick={handleSubmit}
        />
      </ChecklistItem>
    )
  );
};

const ChecklistItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputText = styled.input`
  max-width: 190px;
  background-color: #f5f5f5;
  color: #242424;
  padding: 0.15rem 0.5rem;
  min-height: 40px;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
  border-radius: 0.5rem;
  input:focus {
    border-bottom: 2px solid #5b5fc7;
    border-radius: 4px 4px 2px 2px;
  }

  input:hover {
    outline: 1px solid lightgrey;
  }
`;

export default Checklist;
