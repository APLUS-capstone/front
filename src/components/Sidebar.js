import styled from "styled-components";
import { ReactComponent as PlusButton } from "../assets/images/plus.svg";
import { ReactComponent as ChatIcon } from "../assets/images/textballon.svg";
import { useNavigate } from "react-router-dom";
import  useStore  from "../store/store";
const Sidebar = () => {
  const navigate = useNavigate();
  const { chatRooms } = useStore(state => ({ chatRooms: state.chatRooms }));
  const { addNewChatRoom } = useStore(state => ({ addNewChatRoom: state.addNewChatRoom }));
  const handleNewChat = () => {
    navigate("/main");
  };

  const handleChatRoomClick = (chatId) => {
    navigate(`/chatRoom/${chatId}`);
  };
  return (
    <SidebarContainer>
      <NameContainer onClick={handleNewChat} >APLUS</NameContainer>
      <NewbuttonContainer onClick={handleNewChat}>
        <PlusButton /> 
        New chat
      </NewbuttonContainer>
      <ChatList>
        {chatRooms.map((chat) => (
          <ChatItem key={chat.id} onClick={() => handleChatRoomClick(chat.id)}>
            <Chaticon />
            {chat.name}
          </ChatItem>
        ))}
      </ChatList>
    </SidebarContainer>
  );
};

const NameContainer = styled.div`
  text-align: center;
  width: 17rem;
  height: 3rem;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const Chaticon = styled(ChatIcon)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 17rem;
  height: 100vh;
  background-color: #45504f;
  overflow: hidden;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const NewbuttonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  gap: 0.5rem;
  width: 17rem;
  background-color: #45504f;
  border-top: 0.125rem solid #ffffff;
  border-bottom: 0.125rem solid #ffffff;
  border-left: none;
  border-right: none;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #5c6867;
  }
  font-size: 1.5rem;
  color: #b3b3b3;
  margin-bottom: 1rem;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1rem;
  background: #45504f;
  border-radius: 0.5rem;
  font-size: 1rem;
  height: 5vh;
  color: #b3b3b3;
`;

export default Sidebar;
