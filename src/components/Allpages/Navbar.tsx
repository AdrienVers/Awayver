import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Logo from "../../assets/AwayverLogo.png";
import Link from "next/link";
import { NAVBAR_DATA_PHONE, NAVBAR_DATA_LAPTOP } from "./navbarData";
import { useSession, signOut } from "next-auth/react";
import UserImage from "../../assets/UserGreen.png";

function Navbar() {
	const { data: session } = useSession();

	console.log("la session :", session);

	return (
		<NavbarGlobal>
			<div className="LaptopNavbar">
				<Link href="/">
					<div className="Logo">
						<Image id="LogoImage" src={Logo} alt="logo" />
					</div>
				</Link>
				<div className="NavbarItems">
					{NAVBAR_DATA_LAPTOP.map((item: any) => {
						return (
							<Link key={item.id} href={item.path} legacyBehavior>
								<div className="LinkItem">
									<a>{item.name}</a>
								</div>
							</Link>
						);
					})}
				</div>
				<div className="NavbarButtons"></div>
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
								<Image
									style={{
										width: "45px",
										height: "45px",
										borderRadius: "50px",
									}}
									src={
										session &&
										session.user &&
										typeof session.user.image === "string"
											? session.user.image
											: UserImage
									}
									alt="user"
									width={300}
									height={300}
								/>
							</div>
						</Link>
					</div>
				) : (
					<div className="NavbarButtons">
						<Link href="/connexion" legacyBehavior>
							<div className="Login">
								<a>Se connecter</a>
							</div>
						</Link>
						<Link href="/inscription" legacyBehavior>
							<div className="Register">
								<a>{"S'inscrire"}</a>
							</div>
						</Link>
					</div>
				)}
			</div>
			<div className="MobileNavbar">
				<Link href="/">
					<div className="Logo">
						<Image id="LogoImage" src={Logo} alt="logo" />
					</div>
				</Link>
				{NAVBAR_DATA_PHONE.map((item: any) => {
					return (
						<Link key={item.id} href={item.path} legacyBehavior>
							<div
								className="NavbarIcon"
								style={{
									borderRadius: `${item.borderRadius}`,
									height: `${item.height}`,
									width: `${item.width}`,
								}}
							>
								<a>
									<i
										className={item.icon}
										style={{
											marginTop: `${item.marginTop}`,
										}}
									/>
								</a>
							</div>
						</Link>
					);
				})}
			</div>
		</NavbarGlobal>
	);
}

export default Navbar;

const NavbarGlobal = styled.div`
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	background: linear-gradient(90deg, rgb(51, 128, 109), rgb(63, 186, 128));
	font-size: 1.2rem;
	position: sticky;
	top: 0;
	z-index: 99;

	.LaptopNavbar {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;

		@media (max-width: 900px) {
			display: none;
		}

		.Logo {
			width: 50px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0px 30px 0px 50px;

			#LogoImage {
				width: 100%;
				height: 100%;
			}
		}

		.NavbarItems {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: calc(100% - 50px);
			color: white;

			.LinkItem {
				margin: 0px 20px;
				white-space: nowrap;

				&:hover {
					cursor: pointer;
				}
			}
		}

		.NavbarButtons {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-right: 50px;

			.Login {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 30px;
				color: white;
				text-shadow: 0px 0px 1px white;
				white-space: nowrap;

				a {
					margin: 0px 20px;
				}

				&:hover {
					cursor: pointer;
				}
			}
		}

		.Register {
			background-color: white;
			color: rgb(51, 128, 109);
			padding: 7px 17px;
			border-radius: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: box-shadow 0.8s, background-color 0.4s, color 0.8s;

			@media (max-width: 900px) {
				height: 45px;
				width: 45px;
			}

			i {
				padding-left: 8px;
				font-size: 1.25rem;

				@media (max-width: 900px) {
					padding-left: 0px;
				}
			}

			span {
				@media (max-width: 900px) {
					display: none;
				}
			}

			&:hover {
				background-color: rgb(84, 200, 130);
				cursor: pointer;
				box-shadow: 0px 0px 0px 1.7px white;

				a {
					color: white;
				}
			}
		}
	}

	.MobileNavbar {
		display: none;

		@media (max-width: 900px) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin: 0px 20px;

			.Logo {
				width: 50px;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;

				#LogoImage {
					width: 100%;
					height: 100%;
				}
			}

			.NavbarIcon {
				background-color: white;
				color: rgb(51, 128, 109);
				display: flex;
				justify-content: center;
				align-items: center;
				transition: box-shadow 0.8s, background-color 0.4s, color 0.8s;

				i {
					padding-left: 8px;
					font-size: 1.1rem;

					@media (max-width: 900px) {
						padding-left: 0px;
					}
				}

				span {
					@media (max-width: 900px) {
						display: none;
					}
				}

				&:hover {
					background-color: rgb(84, 200, 130);
					cursor: pointer;
					box-shadow: 0px 0px 0px 1.7px white;

					a {
						color: white;
					}
				}
			}
		}
	}
`;
