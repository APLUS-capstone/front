import React, { useState } from "react";
import styled from "styled-components";
import WrongIcon from "../../assets/images/wrongIcon.png"; //wrongIcon은 svg 변환 안돼서 그냥 png로
import { ReactComponent as CorrectIcon } from "../../assets/images/answerGrade.svg";
import { CustomBtn } from "../../components/CustomButtons";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Chatroom = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const location = useLocation();
  const chatId = location.pathname.split("/")[2];
  const [isDataFetched, setIsDataFetched] = useState(false);
  const BASE_URL = "http://3.35.98.162:8080";

  console.log(chatId); //chatID 받아오는 부분

  // useEffect(() => {
  //   const fetchTest = async () => {
  //     const url = `${BASE_URL}/chatroom/history`;
  //     try {
  //       const response = await axios.get(`${url}/1/${chatId}`);
  //       console.log("Server response:", response.data.list); // 서버 응답 로깅
  //       setQuestions(response.data.list); // 서버 응답을 questions 상태에 저장

  //       const loadedAnswers = loadFromLocalStorage(`${chatId}-answers`) || {};
  //       setAnswers(loadedAnswers);
  //       const loadedResults = loadFromLocalStorage(`${chatId}-results`) || null;
  //       setResults(loadedResults);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   if (!isDataFetched) {
  //     fetchTest();
  //     setIsDataFetched(true);
  //   }
  // }, [isDataFetched]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/chatroom/history/1/${chatId}`
        );
        setQuestions(response.data.list || []); // 서버로부터 받은 질문 목록 또는 빈 배열 설정
      } catch (error) {
        console.error("Error loading chat data:", error);
      }
    };

    // chatId가 변경되면 데이터를 다시 로드
    fetchChatData();
    const loadedAnswers = loadFromLocalStorage(`${chatId}-answers`) || {};
    setAnswers(loadedAnswers);
    const loadedResults = loadFromLocalStorage(`${chatId}-results`) || null;
    setResults(loadedResults);
  }, [chatId]); // chatId가 변경될 때마다 실행

  useEffect(() => {
    saveToLocalStorage(`${chatId}-answers`, answers);
  }, [answers, chatId]);

  useEffect(() => {
    saveToLocalStorage(`${chatId}-results`, results);
  }, [results, chatId]);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };

  useEffect(() => {
    const storedAnswers = loadFromLocalStorage(`${chatId}-answers`);
    const storedResults = loadFromLocalStorage(`${chatId}-results`);

    // 로컬 스토리지에 데이터가 존재하는 경우 상태 업데이트
    if (storedAnswers !== null) {
      setAnswers(storedAnswers);
    } else {
      setAnswers({});
    }

    if (storedResults !== null) {
      setResults(storedResults);
    } else {
      setResults(null);
    }
  }, [chatId]); // chatId가 변경되면 재실행

  // 사용자가 답변을 변경할 때마다 로컬 스토리지에 저장
  useEffect(() => {
    saveToLocalStorage(`${chatId}-answers`, answers);
  }, [answers, chatId]);

  // 결과가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    saveToLocalStorage(`${chatId}-results`, results);
  }, [results, chatId]);

  //객관식 문제가 오면 a,b,c,d 기준으로 띄어쓰기 해줘야함
  const formatQuestionText = (text, questionIndex) => {
    // 객관식 문제 선택지를 분리하기 위한 정규 표현식
    const regex = /([A-E]\)) [^A-E]+/g;
    const matches = text.match(regex); // 정규 표현식을 사용하여 선택지 분리

    // 문제 설명 부분 추출 (선택지 이전의 텍스트)
    const questionText = text.split(regex)[0];

    const choiceElements = matches
      ? matches.map((line, index) => {
          const option = line.substring(0, 1); // 선택지 문자 추출
          const isCorrect = questions[questionIndex].answer === option;
          const isSelected = answers[questionIndex] === option;
          const isWrongAnswered = results && !results[questionIndex].isCorrect;

          return (
            <div key={index}>
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option}
                onChange={() => handleAnswerChange(questionIndex, option)}
                disabled={results != null}
                checked={isSelected}
              />
              <span
                style={{
                  fontWeight: isSelected ? "bold" : "normal",
                  color: isWrongAnswered && isCorrect ? "red" : "black",
                }}
              >
                {line.substring(2)}{" "}
                {/* 선택지 문자와 공백 제외한 나머지 텍스트 */}
              </span>
            </div>
          );
        })
      : [];

    return (
      <div>
        <p>{questionText}</p> {/* 문제 설명 부분 렌더링 */}
        {choiceElements}
      </div>
    );
  };

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers({ ...answers, [questionIndex]: selectedAnswer });
  };

  const handleSubmit = () => {
    const evaluatedResults = questions.map((q, index) => ({
      ...q,
      userAnswer: answers[index],
      isCorrect: answers[index] === q.answer,
    }));
    setResults(evaluatedResults);
  };

  const handleClear = () => {
    //다시 푸는 부분
    setAnswers({});
    setResults("");
    setResults(null);
  };

  return (
    <ChatroomContainer>
      {questions.map((q, index) => (
        <QuestionContainer key={index}>
          <QuestionHeader>
            {results && (
              <IconContainer>
                {results[index].isCorrect ? (
                  <CorrectIcon />
                ) : (
                  <img
                    src={WrongIcon}
                    width="30px"
                    height="40px"
                    alt="Wrong Icon"
                  />
                )}
              </IconContainer>
            )}
            <h3> 문제 {index + 1}번 </h3>
          </QuestionHeader>

          <div>{formatQuestionText(q.question, index)}</div>

          {results && (
            <SolutionBox>
              <p> {index + 1}번 상세 설명:</p>
              <p>{q.solution}</p>
            </SolutionBox>
          )}
        </QuestionContainer>
      ))}
      <ButtonContainer>
        <CustomBtn onClick={handleSubmit} text="채점하기" />
        <CustomBtn onClick={handleClear} text="다시풀기" />
      </ButtonContainer>
    </ChatroomContainer>
  );
};
const ChatroomContainer = styled.div`
  position: fixed;
  width: 75vw;
  height: 90vh;
  left: 20rem;
  top: 3rem;
  overflow-y: auto;
`;
const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;
const IconContainer = styled.div`
  position: absolute;
  left: -5px;
  top: 0px;
`;

const SolutionBox = styled.div`
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
`;

export default Chatroom;
