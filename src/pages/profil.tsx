import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import UserPicture from "../assets/user.png";
import styled from "@emotion/styled";

function Profil() {
	return (
		<ProfilGlobal>
			<div className="ProfilIcons">
				<i className="fa-solid fa-gear" />
				<i className="fa-solid fa-map-location-dot" />
				<i
					onClick={() => signOut()}
					className="fa-solid fa-arrow-right-from-bracket"
				/>
			</div>
			<div className="ProfilContent">
				<Image className="ProfilPicture" src={UserPicture} alt="Profil" />
				<p>{"Nom d'utilisateur"}</p>
				<p>Description personnelle</p>
				<p>Pays visités</p>
				<p>Mes récompenses</p>
				<p>Dernières activités</p>
			</div>
		</ProfilGlobal>
	);
}

export default Profil;

const ProfilGlobal = styled.div`
	.ProfilIcons {
		display: flex;
		justify-content: flex-end;
		padding: 20px;

		i {
			padding: 0 15px;
			font-size: 1.15rem;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.ProfilContent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.ProfilPicture {
			width: 100px;
			height: 100px;
			border-radius: 100px;
		}
	}
`;

/*
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import UserPicture from "../assets/user.png";

function Profil() {
	const { status, data } = useSession();

	if (status === "authenticated") {
		return (
			<div>
				<p>{JSON.stringify(data.user, null, 2)}</p>
				<button onClick={() => signOut()}>Se déconnecter</button>
				<p>Barre de navigation (carte, roue de paramètres, se déconnecter) </p>
				<Image src={UserPicture} alt="Profil" />
				<p>Nom</p>
				<p>Pays visités</p>
			</div>
		);
	}

	return <div>Loading...</div>;
}

export default Profil;
*/
