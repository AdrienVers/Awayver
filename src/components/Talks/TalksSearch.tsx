import React from "react";
import styled from "@emotion/styled";

function TalksSearch() {
  return (
    <TalksSearchGlobal>
      <input placeholder="Rechercher" />
    </TalksSearchGlobal>
  );
}

export default TalksSearch;

const TalksSearchGlobal = styled.form`
  display: flex;
  width: 100%;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px rgb(190, 190, 190) solid;

  input {
    display: flex;
    width: 100%;
    height: 40px;
    border-radius: 40px;
    margin: 0px 10px;
    padding: 0px 0px 0px 15px;
    font-size: 1.05rem;
  }
`;
