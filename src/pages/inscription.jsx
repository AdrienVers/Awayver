import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import SignUpPicture from "../assets/SignInForm.png";
import UserPicture from "../assets/UserGreen.png";
import Image from "next/image";
import Link from "next/link";
import { PickerOverlay } from "filestack-react";

function Inscription() {
	const [isPicker, setIsPicker] = useState(false);
	const [image, setImage] = useState("");

	return (
		<InscriptionGlobal>
			<div className="SignUpFormContainer">
				<div className="titleBox">
					<h1 className="formTitle">Inscription</h1>
				</div>
				<form action="/api/register" method="post">
					{image ? (
						<div className="SampleProfile">
							<Image
								className="ProfilePicture"
								src={image && image.filesUploaded[0].url}
								alt="imageUploded"
								width={300}
								height={300}
							/>
							<button className="AddPicture">
								<i
									className="fa-solid fa-circle-plus"
									onClick={() => setIsPicker(true)}
								/>
							</button>
							<input
								type="text"
								name="image"
								value={image.filesUploaded[0].url}
								onChange={(e) => setImage(e.target.value)}
								style={{ display: "none" }}
							/>
						</div>
					) : (
						<div className="SampleProfile">
							<Image
								className="ProfilePicture"
								src={UserPicture}
								alt="Utilisateur"
							/>
							<button className="AddPicture">
								<i
									className="fa-solid fa-circle-plus"
									onClick={() => setIsPicker(true)}
								/>
							</button>
						</div>
					)}
					<div className="mt-4 relative">
						{isPicker && (
							<PickerOverlay
								apikey={process.env.NEXT_PUBLIC_API_KEY}
								onSuccess={(res) => {
									setImage(res);
									setIsPicker(false);
								}}
								onError={(res) => {
									alert(res);
								}}
								pickerOptions={{
									maxFiles: 1,
									accept: ["image/*"],
									errorsTimeout: 2000,
									maxSize: 1 * 1000 * 1000,
									onClose: () => setIsPicker(false),
								}}
							/>
						)}
					</div>
					<div className="inputcontainer">
						<input type="text" name="name" required />
						<label htmlFor="name">{"Nom d'utilisateur"}</label>
					</div>
					<div className="inputcontainer">
						<input type="email" name="email" required />
						<label>Adresse e-mail</label>
					</div>
					<div className="inputcontainer">
						<input type="password" name="password" required />
						<label>Mot de passe</label>
						<button className="passwordVisibleButton">
							<i className="fa-solid fa-eye" />
						</button>
					</div>
					{/*  
					<div className="inputcontainer">
						<input type="password" name="password" required />
						<label>Confirmer</label>
						<button className="passwordVisibleButton">
							<i className="fa-solid fa-eye" />
						</button>
					</div>
					*/}
					<button className="submitButton" type="submit">
						{"S'inscrire"}
					</button>
				</form>
				<div className="GoToSignIn">
					Vous possédez déjà une compte ?{" "}
					<Link
						style={{ color: "rgb(51, 128, 109)", fontWeight: "620" }}
						href="/connexion"
					>
						Se connecter.
					</Link>
				</div>
			</div>
			<div className="SignUpIllustration">
				<Image className="Picture" src={SignUpPicture} alt="SignUp Picture" />
			</div>
		</InscriptionGlobal>
	);
}

export default Inscription;

const InscriptionGlobal = styled.div`
	display: flex;
	height: calc(100vh - 70px);

	.SignUpFormContainer {
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

		.titleBox {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.formTitle {
				font-size: 2.2rem;
				font-weight: normal;
				margin: 0px 0px 25px 0px;
				padding: 0;
				color: rgb(51, 128, 109);
			}
		}

		.SampleProfile {
			position: relative;

			.ProfilePicture {
				width: 60px;
				height: 60px;
				border-radius: 50px;
				object-fit: cover;
			}

			.AddPicture {
				position: absolute;
				top: -10px;
				right: -5px;
				background-color: white;
				// color: rgb(63, 185, 128);
				color: rgb(51, 128, 109);
				border: none;
				border-radius: 50px;
				height: 30px;
				width: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1rem;
				box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

				&:hover {
					cursor: pointer;
				}
			}
		}

		form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20px 0px;
			gap: 20px;

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

		.GoToSignIn {
			text-align: center;
			color: black;
		}
	}

	.SignUpIllustration {
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

/*
<button
    onChange={setURL}
    onClick={(event) => {
        event.preventDefault();
        fileInputRef.current.click();
        }}
    >
    Ajouter un fichier
</button>
    {image ? (
        <p>
        <br />
        <img
        	src={preview}
            style={{ objectFit: 'cover', height: '80px' }}
            alt=""
        />
        <a href={URL}>{URL}</a>
    	</p>
        ) : null}
*/
