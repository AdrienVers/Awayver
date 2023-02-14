import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import UserPicture from "../../assets/UserGreen.png";
import { useSession, signOut } from "next-auth/react";

function ChatNavbar() {
	const { data: session } = useSession();

	return (
		<ChatNavbarGlobal>
			<div className="ChatNavbarProfile">
				<Link href="/conversations">
					<i className="fa-solid fa-arrow-left" />
				</Link>
				{session ? (
					<Image
						id="userProfile"
						alt="imageUploded"
						src={
							session && session.user && typeof session.user.image === "string"
								? session.user.image
								: UserPicture
						}
						width={300}
						height={300}
					/>
				) : (
					<Image id="userProfile" alt="Utilisateur" src={UserPicture} />
				)}
			</div>
			<div className="ChatNavbarName">
				<h2>Nom</h2>
				<span>26/12/2022 à 14:33</span>
			</div>
			<div className="ChatNavbarActions">
				<i className="fa-solid fa-video" />
				<i className="fa-solid fa-phone" />
				<i className="fa-solid fa-ellipsis-vertical" />
			</div>
		</ChatNavbarGlobal>
	);
}

export default ChatNavbar;

const ChatNavbarGlobal = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	padding: 5px 0px;
	border-bottom: 1px rgb(190, 190, 190) solid;
	margin: 0px 0px 10px 0px;
	height: 60px;
	position: sticky;
	top: 70px;
	z-index: 1;
	background-color: white;

	.ChatNavbarProfile {
		width: 40%;
		max-width: 100px;
		display: flex;
		justify-content: space-around;
		align-items: center;

		i {
			padding-left: 10px;
		}

		#userProfile {
			width: 90%;
			max-width: 50px;
			height: auto;
			border-radius: 50px;
		}
	}

	.ChatNavbarName {
		width: calc(100% - 100px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 2px;

		h2 {
			margin: 0;
			font-weight: 600;
			font-size: 1.25rem;
		}
	}

	.ChatNavbarActions {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 8px 5px 0px 0px;

		i {
			padding: 0px 11px;
			font-size: 1.15rem;
		}
	}
`;
