import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import ChatRoom from "./pages/chatRoom/chatroom";
import Main from "./pages/Main";
// import Loader from "./pages/loader/Loader";
import Login from "./pages/Login";
import styled from "styled-components";
function App() {
  return (
    <Router>
      <MainContainer>
        <Sidebar />
        <ContentArea>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          </Routes>
        </ContentArea>
      </MainContainer>
    </Router>
  );
}


export default App;

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const ContentArea = styled.div`
  flex-grow: 1;
  overflow: auto;
`;