import React, { useState } from "react";
import styled from "styled-components";
import WrongIcon from "../../assets/images/wrongIcon.png"; //wrongIcon은 svg 변환 안돼서 그냥 png로
import { ReactComponent as CorrectIcon } from "../../assets/images/answerGrade.svg";
import { CustomBtn } from "../../components/CustomButtons";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const dummy_questions = [
  {
    question:
      "1. Which of the following statements about static typing is correct?\nA) Static typing means type errors are detected after the program has executed.\nB) Static typing can still sometimes allow for type errors at runtime due to unsafe type conversions.\nC) Static typing guarantees no type errors will occur, regardless of the language's type system.\nD) In static typing, type errors are typically caught during the lexical analysis phase.\nE) Static typing is a feature where types are determined and fixed at runtime.",
    answer: "B",
    solution:
      "Static typing aims to detect type errors before runtime, usually at compile time. However, certain languages, like C, allow for unsafe type conversions (e.g., pointer casting), which means that type errors can still occur at runtime. Therefore, option B is correct.",
  },
  {
    question:
      "2. Which of the following best describes the difference between implicit and explicit typing?\nA) Implicit typing occurs at compile-time, whereas explicit typing occurs at runtime.\nB) Explicit typing requires types to be explicitly declared, like in C.\nC) Implicit typing allows for more type errors than explicit typing.\nD) Explicit typing refers to automatic type inference, whereas implicit typing requires manual type specification.\nE) Implicit typing is another term for dynamic typing.",
    answer: "B",
    solution:
      "Explicit typing requires that the type of each variable or function is explicitly declared by the programmer. This is contrasted with implicit typing, where the types are inferred by the compiler or interpreter. Thus, option B is the correct choice.",
  },
  {
    question:
      "3. In Prof. Jaeseung Choi's lecture notes, which of the following is mentioned as an advantage of static typing?\nA) Programs with static typing are always error-free.\nB) Static typing allows a program to be more flexible and less restrictive.\nC) Static typing eliminates the need for a symbol table in the compilation process.\nD) A program that passes static type checking is safe from type errors if the language has a sound and strong type system.\nE) Explicitly typed languages are inherently slower due to the overhead of type checking.",
    answer: "D",
    solution:
      "One of the advantages of static typing is that it can guarantee safety from type errors if a program passes type checking, assuming that the language in question has a sound and strong type system. This is not to say that the program will be entirely error-free, but rather that type errors, specifically, are less likely to occur. This is detailed in option D.",
  },
  {
    question:
      "4. In the context of the lecture notes, which of the following would be flagged as a type mismatch error?\nA) 'int x; x = true;'\nB) 'bool flag = false; flag = 0;'\nC) 'int sum = 0; sum = sum + 1;'\nD) 'float pi = 3.14; pi = pi + 0.0016;'\nE) 'char letter = 'a'; letter = 'b';'",
    answer: "A",
    solution:
      "In the lecture notes, we know that types should match between variable declarations and assignments. Since 'int x' declares 'x' to be an integer, assigning it a boolean value 'true' is a type mismatch error. Therefore, option A is correct.",
  },
  {
    question:
      "5. What does the scope of an identifier refer to?\nA) The scope is the part of the program where its value is retained.\nB) The scope of an identifier indicates its lifetime in memory.\nC) The scope is the range in which an identifier's type can be inferred.\nD) The scope signifies the portions of a program where the identifier is valid and accessible.\nE) The scope outlines the functions where the identifier can be redeclared without errors.",
    answer: "D",
    solution:
      "The scope of an identifier refers to the portions of a program where that particular name is valid and can be used to refer to the variable or function it represents. This is outlined in option D of the multiple-choice question.",
  },
];

const Chatroom = () => {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const location = useLocation();
  const chatId = location.pathname.split("/")[2];
  console.log(chatId); //chatID 받아오는 부분

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };

  useEffect(() => {
    const storedAnswers = loadFromLocalStorage(`${chatId}-answers`);
    let storedResults = loadFromLocalStorage(`${chatId}-results`);

    if (storedAnswers) {
      setAnswers(storedAnswers);
      setResults(storedResults);
    } else {
      //아직 answer 에 아무것도 안들어왔으면,
      setAnswers({});
      setResults(null);
    }
  }, [chatId]);

  useEffect(() => {
    saveToLocalStorage(`${chatId}-answers`, answers);
  }, [answers, chatId]);

  useEffect(() => {
    saveToLocalStorage(`${chatId}-results`, results);
  }, [results, chatId]);

  //객관식 문제가 오면 a,b,c,d 기준으로 띄어쓰기 해줘야함
  const formatQuestionText = (text, questionIndex) => {
    return text.split("\n").map((line, index) => {
      if (
        ["A)", "B)", "C)", "D)", "E)"].includes(line.trim().substring(0, 2))
      ) {
        const isCorrect = dummy_questions[questionIndex].answer === line[0];
        const isSelected = answers[questionIndex] === line[0];
        const isWrongAnswered = results && !results[questionIndex].isCorrect;

        return (
          <div key={index}>
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={line[0]}
              onChange={() => handleAnswerChange(questionIndex, line[0])}
              disabled={results != null}
            />
            <span
              style={{
                fontWeight: isSelected ? "bold" : "normal",
                color: isWrongAnswered && isCorrect ? "red" : "black",
              }}
            >
              {" " + line.substring()}
            </span>
          </div>
        );
      } else {
        return <div key={index}>{line}</div>;
      }
    });
  };

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers({ ...answers, [questionIndex]: selectedAnswer });
  };

  const handleSubmit = () => {
    const evaluatedResults = dummy_questions.map((q, index) => ({
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
      {dummy_questions.map((q, index) => (
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
