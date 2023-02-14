import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import User from "../../assets/John.png";
import { PUBLISH_DATA } from "./publishData";

function Publish() {
	return (
		<PublishGlobal>
			<div className="ShareInput">
				<Image className="SharePicture" src={User} alt="Utilisateur" />
				<input type="text" placeholder="Envie de partager, John ?" />
			</div>
			<div className="ShareIllustrations">
				{PUBLISH_DATA.map((item: any) => {
					return (
						<p key={item.id} className="ShareEvent">
							<i className={item.icon} /> <span>{item.name}</span>
						</p>
					);
				})}
				<button>Publier</button>
			</div>
		</PublishGlobal>
	);
}

export default Publish;

const PublishGlobal = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	// background-color: rgb(240, 240, 240);
	background-color: white;
	box-shadow: inset 0px 0px 0px 1px rgb(190, 190, 190);
	padding: 30px 40px 25px 40px;
	border-radius: 20px;

	@media (max-width: 600px) {
		width: 90%;
		padding: 10px;
	}

	.ShareInput {
		width: 100%;
		display: flex;
		align-items: center;

		.SharePicture {
			width: 50px;
			height: 50px;
			border-radius: 50px;
			margin: 10px 20px 10px 15px;

			@media (max-width: 600px) {
				width: 40px;
				height: 40px;
				border-radius: 40px;
			}
		}

		input {
			height: 50px;
			width: calc(100% - 110px);
			border-radius: 50px;
			padding-left: 15px;
			font-size: 1.05rem;
			border: none;
			box-shadow: inset 0px 0px 0px 0.5px black;

			@media (max-width: 600px) {
				width: calc(100% - 90px);
				height: 40px;
			}
		}
	}

	.ShareIllustrations {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 1.1rem;
		margin-top: 10px;
		padding: 10px 0px;

		.ShareEvent {
			margin: 0;
			i {
				color: rgb(50, 130, 110);
				padding-right: 8px;
			}

			&:hover {
				cursor: pointer;
			}

			span {
				@media (max-width: 1000px) {
					display: none;
				}
			}
		}

		button {
			border: none;
			box-shadow: inset 0px 0px 0px 1px white;
			// background-color: rgb(60, 175, 125);
			background-color: rgb(50, 130, 110);
			color: white;
			border-radius: 50px;
			padding: 8px 15px;
			font-size: 1.2rem;

			&:hover {
				cursor: pointer;
			}

			@media (max-width: 600px) {
				font-size: 1rem;
				padding: 8px 10px;
			}
		}
	}
`;
