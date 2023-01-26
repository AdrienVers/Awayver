import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import User from "../../assets/user.png";

function TalkDisplay() {
	return (
		<TalkDisplayGlobal>
			<div className="TalkDisplayProfile">
				<Image id="userProfile" src={User} alt="Profil" />
			</div>
			<div className="TalkDisplayName">
				<h2>Nom</h2>
				<p>Vous : Message</p>
			</div>
			<div className="TalkDisplayDate">
				<p style={{ margin: "0px 0px 3px 0px" }}>01/01/2023</p>
				<p>12:11</p>
			</div>
			<div className="TalkDisplayStatus">
				<i className="fa-solid fa-circle-check" />
			</div>
		</TalkDisplayGlobal>
	);
}

export default TalkDisplay;

const TalkDisplayGlobal = styled.div`
	display: flex;
	width: 100%;
	border-bottom: 1px rgb(190, 190, 190) solid;

	.TalkDisplayProfile {
		width: 30%;
		max-width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		#userProfile {
			width: 100%;
			max-width: 50px;
			height: auto;
			border-radius: 50px;
		}
	}

	.TalkDisplayName {
		width: calc(100% - 100px);
		display: flex;
		flex-direction: column;
		padding: 5px 0px 5px 0px;

		h2 {
			margin: 0px 0px 3px 0px;
			font-size: 1rem;
			font-weight: 600;
			color: rgb(51, 128, 109);
		}

		p {
			margin: 0;
		}
	}

	.TalkDisplayDate {
		display: flex;
		align-items: end;
		flex-direction: column;
		padding: 5px 10px 5px 5px;

		p {
			margin: 0;
		}
	}

	.TalkDisplayStatus {
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(51, 128, 109);
		// padding: 8px 10px 0px 0px;
		padding: 0px 10px 0px 0px;
	}
`;
