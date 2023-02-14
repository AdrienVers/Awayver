import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

function TalkDisplay({ name, picture, content, hour, date, owner }: any) {
	return (
		<TalkDisplayGlobal>
			<div className="TalkDisplayProfile">
				<Image id="userProfile" src={picture} alt="Profil" />
			</div>
			<div className="TalkDisplayName">
				<h2>{name}</h2>
				<p>
					{owner}{" "}
					<span>
						{content.length > 28 ? content.slice(0, 28) + "..." : content}
					</span>
				</p>
			</div>
			<div className="TalkDisplayDate">
				<div>
					<span>{date}</span>
				</div>
				<div>
					<span style={{ marginRight: "5px" }}>{hour}</span>
					<i className="fa-solid fa-circle-check" />
				</div>
			</div>
			{/*  
			<div className="TalkDisplayStatus">
				<i className="fa-solid fa-circle-check" />
			</div>
			*/}
		</TalkDisplayGlobal>
	);
}

export default TalkDisplay;

const TalkDisplayGlobal = styled.div`
	display: flex;
	width: 100%;
	padding: 5px;
	border-bottom: 1px rgb(190, 190, 190) solid;

	@media (max-width: 900px) {
		padding: 2px;
	}

	.TalkDisplayProfile {
		width: 30%;
		max-width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		@media (max-width: 600px) {
			max-width: 70px;
			padding: 3px 0px;
		}

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

			span {
				color: rgb(100, 100, 100);
			}
		}
	}

	.TalkDisplayDate {
		display: flex;
		align-items: end;
		flex-direction: column;
		padding: 5px 10px 5px 10px;

		span {
			padding: 2px 0px;

			@media (max-width: 900px) {
				font-size: 0.9rem;
			}
		}

		i {
			color: rgb(51, 128, 109);
			padding: 2px 0px;
		}
	}

	.TalkDisplayStatus {
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(51, 128, 109);
		padding: 0px 8px 0px 8px;

		@media (max-width: 900px) {
			padding: 0px 0px 0px 0px;
		}
	}
`;
