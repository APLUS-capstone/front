import React, { useState } from "react";
import styled from "styled-components";
import KakaoLoginButton from "../assets/images/kakao_login_medium_narrow.png";
import { CustomBtn } from "../components/CustomButtons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    const REST_API_KEY = "01edef910fa2573903206bddf92be765";
    // const redirect_uri = "https://aplus-hsdd.netlify.app/main";
    const REDIRECT_URI =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/login"
        : "http://54.180.127.147:3000/login";

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <LoginContainer>
      <LoginForm>
        <LoginHeader>
          <h1>Login</h1>
        </LoginHeader>

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <LoginButton2>
          <CustomBtn text={"Login"} />
          <img
            src={KakaoLoginButton}
            alt="카카오 로그인"
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
          />
        </LoginButton2>
      </LoginForm>
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoginForm = styled.div`
  max-width: 400px;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginButton = styled.button`
  background-color: #fee500;
  color: #391b1b;
  font-size: 16px;
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  &:hover {
    background-color: #f7d600;
  }

  img {
    margin-right: 10px;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;
const LoginButton2 = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
