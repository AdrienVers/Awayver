import React from "react";
import TalkDisplay from "./TalkDisplay";
import styled from "@emotion/styled";
import Link from "next/link";

function TalksList() {
  return (
    <TalksListGlobal>
      {[...Array(5)].map((item, index) => {
        return (
          <Link key={index} href="/messages">
            <TalkDisplay />
          </Link>
        );
      })}
    </TalksListGlobal>
  );
}

export default TalksList;

const TalksListGlobal = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
