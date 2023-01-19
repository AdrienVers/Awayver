import React from "react";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import ChatNavbar from "./ChatNavbar";
import styled from "@emotion/styled";

function ChatLayout() {
  return (
    <ChatLayoutGlobal>
      <ChatNavbar />
      <ChatList />
      <ChatInput />
    </ChatLayoutGlobal>
  );
}

export default ChatLayout;

const ChatLayoutGlobal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: white;

  @media (max-width: 600px) {
    height: calc(100vh - 120px);
  }
`;
