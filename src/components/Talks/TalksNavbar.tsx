import React from "react";
import styled from "@emotion/styled";
import UserPicture from "../../assets/John.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

function TalksNavbar() {
	const { data: session } = useSession();

	return (
		<TalksNavbarGlobal>
			<div className="TalksNavbarProfile">
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
	padding: 10px 0px 5px 0px;

	.TalksNavbarProfile {
		width: 30%;
		max-width: 110px;
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

	.TalksNavbarName {
		width: calc(100% - 100px);
		font-size: 1.25rem;

		@media (max-width: 600px) {
			width: calc(100% - 130px);
		}
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
