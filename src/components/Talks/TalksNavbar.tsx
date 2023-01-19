import React from "react";
import styled from "@emotion/styled";
import User from "../../assets/user.png";
import Image from "next/image";

function TalksNavbar() {
  return (
    <TalksNavbarGlobal>
      <div className="TalksNavbarProfile">
        <Image id="userProfile" src={User} alt="Profil" />
      </div>
      <div className="TalksNavbarName">
        <span>Discussions</span>
      </div>
      <div className="TalksNavbarActions">
        <i className="fa-solid fa-user-group" />
        <i className="fa-regular fa-pen-to-square" />
        <i className="fa-solid fa-ellipsis-vertical" />
      </div>
    </TalksNavbarGlobal>
  );
}

export default TalksNavbar;

const TalksNavbarGlobal = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 5px 0px;

  .TalksNavbarProfile {
    width: 30%;
    max-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    #userProfile {
      width: 100%;
      max-width: 50px;
      height: auto;
    }
  }

  .TalksNavbarName {
    width: calc(100% - 100px);
    font-size: 1.25rem;
  }

  .TalksNavbarActions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 5px 0px 0px;

    i {
      padding: 0px 13px;
      font-size: 1.15rem;
    }
  }
`;
