import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { POSTS_DATA } from "./publishData";

function Post({
	owner,
	ownerPicture,
	category,
	icon,
	content,
	image,
	tags,
	likes,
	commentsNumber,
}: any) {
	return (
		<PostGlobal>
			<div className="PostHeader">
				<div className="PostProfil">
					<Image className="PostPicture" src={ownerPicture} alt="Utilisateur" />
					<p>{owner}</p>
					<p style={{ padding: "0px 15px" }}> | </p>
					<p style={{ color: "rgb(50, 130, 110)" }}>
						<i style={{ paddingRight: "5px" }} className={icon} />{" "}
						<span>{category}</span>
					</p>
				</div>
				<i className="fa-solid fa-xmark" />
			</div>
			<div className="PostSeparationHeader" />
			<div className="PostContent">
				<div className="PostText">
					<p>{content}</p>
					<p>
						{tags.map((item: any, index: any) => {
							return <button key={index}>{item.name}</button>;
						})}
					</p>
				</div>
				<div className="PostImage">
					<Image className="Image" src={image} alt="Budapest" />
				</div>
			</div>
			<div className="PostSeparationContent" />
			<div className="PostReaction">
				<span>
					<i className="fa-solid fa-thumbs-up" />
					{likes}
				</span>
				<span>{commentsNumber} commentaires</span>
			</div>
			<div className="PostSeparationFooter" />
			<div className="PostFooter">
				{POSTS_DATA.map((item: any) => {
					return (
						<p key={item.id}>
							<i className={item.icon} /> <span>{item.name}</span>
						</p>
					);
				})}
			</div>
		</PostGlobal>
	);
}

export default Post;

const PostGlobal = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	background-color: white;
	padding: 10px 40px 15px 40px;
	border-radius: 20px;
	box-shadow: inset 0px 0px 0px 1px rgb(190, 190, 190);
	margin-bottom: 30px;

	@media (max-width: 600px) {
		width: 90%;
		padding: 10px;
	}

	.PostHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.1rem;

		.PostProfil {
			display: flex;
			align-items: center;

			.PostPicture {
				width: 50px;
				height: 50px;
				background-size: contain;
				border-radius: 50px;
				margin: 10px 20px 10px 15px;

				@media (max-width: 600px) {
					width: 40px;
					height: 40px;
					border-radius: 40px;
				}
			}

			p {
				margin: 0;
			}

			span {
				@media (max-width: 600px) {
					display: none;
				}
			}
		}
	}

	.PostContent {
		display: flex;

		@media (max-width: 900px) {
			flex-direction: column;
		}

		.PostText {
			width: 50%;
			max-height: 100%;
			display: flex;
			padding: 10px;
			font-size: 1.1rem;
			flex-direction: column;
			justify-content: space-between;

			@media (max-width: 900px) {
				width: 100%;
			}

			p {
				line-height: 1.6rem;
				margin: 0;
			}

			button {
				border: none;
				color: black;
				background-color: rgb(240, 240, 240);
				margin: 5px 10px 0px 0px;
				font-size: 1rem;
				padding: 5px 10px;
				border-radius: 10px;

				@media (max-width: 600px) {
					margin: 5px 5px 0px 0px;
				}

				&:hover {
					cursor: pointer;
				}
			}
		}

		.PostImage {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;

			@media (max-width: 900px) {
				width: 100%;
			}

			.Image {
				width: 80%;
				height: auto;
			}
		}
	}

	.PostReaction {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.1rem;
		padding: 0px 10px;

		span {
			display: flex;
			align-items: center;

			i {
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				height: 25px;
				width: 25px;
				background-color: rgb(50, 130, 110);
				border-radius: 50px;
				font-size: 0.9rem;
				margin-right: 5px;
				padding-bottom: 2px;
			}
		}
	}

	.PostSeparationHeader,
	.PostSeparationContent,
	.PostSeparationFooter {
		height: 0.8px;
		widtht: 100%;
		border-radius: 2px;
		background-color: rgb(200, 200, 200);
	}

	.PostSeparationHeader {
		margin: 5px 0px 20px 0px;

		@media (max-width: 600px) {
			margin: 5px 0px 10px 0px;
		}
	}

	.PostSeparationContent {
		margin: 20px 0px 10px 0px;
	}

	.PostSeparationFooter {
		margin: 10px 0px 10px 0px;
	}

	.PostFooter {
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 1.1rem;

		&:hover {
			cursor: pointer;
		}

		p {
			margin: 0;
		}

		span {
			@media (max-width: 600px) {
				display: none;
			}
		}

		i {
			margin-right: 5px;
			color: rgb(50, 130, 110);
		}
	}
`;
