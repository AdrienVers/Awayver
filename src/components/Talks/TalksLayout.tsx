import React from "react";
import TalksList from "./TalksList";
import TalksNavbar from "./TalksNavbar";
import TalksSearch from "./TalksSearch";

function TalksLayout() {
  return (
    <div>
      <TalksNavbar />
      <TalksSearch />
      <TalksList />
    </div>
  );
}

export default TalksLayout;
