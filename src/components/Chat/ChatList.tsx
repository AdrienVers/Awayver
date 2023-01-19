import React from "react";
import ChatDisplay from "./ChatDisplay";
import styled from "@emotion/styled";

function ChatList() {
  return (
    <ChatListGlobal>
      {[...Array(5)].map((item, index) => {
        return <ChatDisplay key={index} />;
      })}
    </ChatListGlobal>
  );
}

export default ChatList;

const ChatListGlobal = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: calc(100% - 120px);
  overflow-y: scroll;
  flex-direction: column-reverse;
`;
