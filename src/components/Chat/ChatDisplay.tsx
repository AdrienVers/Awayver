import React from "react";
import styled from "@emotion/styled";
import User from "../../assets/user.png";
import Image from "next/image";

function ChatDisplay() {
	return (
		<ChatDisplayGlobal>
			<div className="ChatDisplayProfile">
				<Image id="userProfile" src={User} alt="Profil" />
				<span>16:22</span>
			</div>
			<div className="ChatDisplayContent">
				<div className="Message">Salut ! Comment vas-tu ?</div>
			</div>
		</ChatDisplayGlobal>
	);
}

export default ChatDisplay;

const ChatDisplayGlobal = styled.div`
	display: flex;
	width: 100%;
	padding: 5px 0px;

	.ChatDisplayProfile {
		display: flex;
		width: 20%;
		max-width: 80px;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		#userProfile {
			width: 60%;
			max-width: 40px;
			height: auto;
			border-radius: 50px;

			@media (max-width: 600px) {
				max-width: 30px;
			}
		}

		span {
			font-size: 0.9rem;
		}
	}

	.ChatDisplayContent {
		display: flex;
		width: calc(100% - 80px);
		align-items: start;
		padding-bottom: 10px;

		.Message {
			background-color: rgb(51, 128, 109);
			color: white;
			border-radius: 80px 80px 80px 0px;
			padding: 8px 15px;
		}
	}
`;
