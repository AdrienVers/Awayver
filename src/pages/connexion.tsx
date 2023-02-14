import { signIn, useSession } from "next-auth/react";
import React, { FormEventHandler, useState } from "react";
import styled from "@emotion/styled";
import SignInPicture from "../assets/SignUpForm.png";
import Image from "next/image";
import Link from "next/link";

function Connexion() {
	const [userInfo, setUserInfo] = useState({ email: "", password: "" });
	const { data: session } = useSession();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const res = await signIn("credentials", {
			email: userInfo.email,
			password: userInfo.password,
			redirect: false,
		});

		console.log(res);
	};

	return (
		<>
			{session ? (
				<div className="NavbarButtons">
					<Link href="/profil" legacyBehavior>
						<div className="Login">
							<a>
								{session &&
								session.user &&
								typeof session.user.name === "string"
									? session.user.name.charAt(0).toUpperCase() +
									  session.user.name.slice(1)
									: null}
							</a>
						</div>
					</Link>
				</div>
			) : (
				<ConnexionGlobal>
					<div className="SignInIllustration">
						<Image
							className="Picture"
							src={SignInPicture}
							alt="SignIn Picture"
						/>
					</div>
					<div className="SignInFormContainer">
						<div className="titleBox">
							<h1 className="formTitle">Connexion</h1>
							<p className="formSubTitle">Accès à votre compte</p>
						</div>
						<form onSubmit={handleSubmit} action="/api/login" method="post">
							<div className="inputcontainer">
								<input
									type="email"
									name="email"
									required
									value={userInfo.email}
									onChange={(e) =>
										setUserInfo({ ...userInfo, email: e.target.value })
									}
								/>
								<label htmlFor="email">Adresse e-mail</label>
							</div>
							<div className="inputcontainer">
								<input
									type="password"
									name="password"
									required
									value={userInfo.password}
									onChange={(e) =>
										setUserInfo({ ...userInfo, password: e.target.value })
									}
								/>
								<label htmlFor="password">Mot de passe</label>
								<button className="passwordVisibleButton">
									<i className="fa-solid fa-eye" />
								</button>
							</div>
							<button className="submitButton" type="submit">
								Se connecter
							</button>
						</form>
						<div className="GoToSignUp">
							Pas encore de compte ?{" "}
							<Link
								style={{ color: "rgb(51, 128, 109)", fontWeight: "620" }}
								href="/inscription"
							>
								{"S'inscrire."}
							</Link>
						</div>
					</div>
				</ConnexionGlobal>
			)}
		</>
	);
}

export default Connexion;

const ConnexionGlobal = styled.div`
	display: flex;
	height: calc(100vh - 70px);

	.SignInFormContainer {
		background-color: rgb(240, 240, 240);
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		@media (max-width: 700px) {
			width: 100%;
		}

		form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 40px 0px;
			gap: 30px;

			.inputcontainer {
				position: relative;
				width: 250px;

				@media (max-width: 330px) {
					width: 200px;
				}

				input {
					width: 100%;
					padding: 10px 8px;
					margin-top: 3px;
					font-size: 1.1rem;
					border: 1px solid rgba(255, 255, 255, 0.25);
					border-radius: 5px;
					box-shadow: 0 0 5px 1px grey;
				}

				label {
					position: absolute;
					left: 0;
					padding: 13.5px 15px;
					font-size: 1rem;
					pointer-events: none;
					transition: 0.3s;
					color: rgb(120, 120, 120);
					color: grey;
				}

				input:valid ~ label,
				input:focus ~ label {
					transform: translateX(10px) translateY(-7px);
					font-size: 0.85rem;
					padding: 0 5px;
					background-color: white;
					border-radius: 5px;
				}

				p {
					margin: 5px 0px 0px 0px;
				}

				#passwordVisible {
					position: absolute;
					top: 18px;
					right: 12px;

					&:hover {
						cursor: pointer;
					}
				}

				.passwordVisibleButton {
					position: absolute;
					top: 17px;
					right: 12px;
					background-color: transparent;
					border: none;

					&:hover {
						cursor: pointer;
					}
				}
			}
		}

		.submitButton {
			margin-top: 10px;
			width: 125px;
			font-size: 1.05rem;
			padding: 6px 0px;

			&:hover {
				cursor: pointer;
			}

			&:disabled {
				cursor: not-allowed;
			}
		}

		.GoToSignUp {
			text-align: center;
			color: black;
		}

		.titleBox {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.formTitle {
				font-size: 2.2rem;
				font-weight: normal;
				margin: 0px 0px 10px 0px;
				padding: 0;
				color: rgb(51, 128, 109);
			}

			.formSubTitle {
				font-size: 1.3rem;
				margin: 0;
				padding: 10px 0px 0px 0px;
				color: black;
			}
		}
	}

	.SignInIllustration {
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		@media (max-width: 700px) {
			display: none;
		}

		.Picture {
			width: 70%;
			height: auto;
			max-width: 450px;
		}
	}
`;
