import React from "react";
import styled from "@emotion/styled";

function ChatInput() {
	return (
		<ChatInputGlobal>
			<i id="attachment" className="fa-solid fa-paperclip" />
			<input placeholder="Écrivez un message" />
			<i style={{ fontSize: "1.2rem" }} className="fa-regular fa-face-smile" />
			{/* <button>ENVOI</button> */}
			<button>
				<i className="fa-regular fa-paper-plane" />
			</button>
			<i style={{ fontSize: "1.2rem" }} className="fa-solid fa-thumbs-up" />
		</ChatInputGlobal>
	);
}

export default ChatInput;

const ChatInputGlobal = styled.form`
	display: flex;
	width: 100%;
	// height: 60px;
	height: 70px;
	background-color: rgb(240, 240, 240);
	align-items: center;

	i {
		padding: 0px 15px;
	}

	#attachment {
		transform: rotate(180deg);

		@media (max-width: 600px) {
			padding: 0px 15px 0px 5px;
		}
	}

	input {
		width: 100%;
		border: none;
		background-color: rgb(240, 240, 240);
		font-size: 1.05rem;
		padding: 10px 8px;
	}

	button {
		border-radius: 20px;
		border: none;
		background-color: rgb(51, 128, 109);
		color: white;
		padding: 8px 2px;

		i {
			transform: rotate(45deg);
			font-size: 1rem;
		}
	}
`;
