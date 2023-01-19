import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Router from "next/router";

function Profil() {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			// Router.push("/connexion");
		}
	}, [status]);

	if (status === "authenticated") {
		return (
			<div>
				<p>{JSON.stringify(data.user, null, 2)}</p>
				<button onClick={() => signOut()}>Se déconnecter</button>
			</div>
		);
	}

	return <div>Loading...</div>;
}

export default Profil;
