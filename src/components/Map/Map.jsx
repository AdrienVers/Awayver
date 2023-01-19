import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { EUROPE_DATA } from "./mapData";

function Map() {
	// const [showName, setShowName] = useState(false);
	// const [currentCountry, setCurrentCountry] = useState("");
	const [hoveredCountry, setHoveredCountry] = useState("");

	const cursorRef = useRef(null);
	const followMouse = (e) => {
		const x = e.clientX;
		const y = e.clientY;

		cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
	};

	useEffect(() => {
		window.addEventListener("mousemove", followMouse);

		return () => {
			window.removeEventListener("mousemove", followMouse);
		};
	}, []);

	return (
		<MapGlobal>
			<div className="MapOfEurope">
				<i id="refresh" className="fa-solid fa-arrows-rotate" />
				<svg
					id="svgmap"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="25 -180 500 500"
					width="98%"
					height="98%"
				>
					{EUROPE_DATA.map((item, index) => {
						return (
							<a key={index} className="map-link" href="#">
								<path
									onMouseOver={() => {
										setHoveredCountry(item.name);
									}}
									onMouseOut={() => {
										setHoveredCountry("");
									}}
									className="st1"
									d={item.d}
									transform={item.transform}
									strokeWidth="1.1119186046511627"
									fillOpacity="1"
									fill={
										hoveredCountry === item.name
											? "rgb(62,185,127)"
											: "rgb(250,250,250)"
									}
									stroke="rgb(0,0,0)"
									strokeOpacity="1"
									role="menuitem"
									aria-label={item.ariaLabel}
								/>
							</a>
						);
					})}
				</svg>
			</div>
			<div className="MapDescription">
				<h1>{"Carte de l'Europe"}</h1>
				<div
					className="cursor"
					ref={cursorRef}
					style={{ display: hoveredCountry ? "flex" : "none" }}
				>
					{hoveredCountry ? hoveredCountry : null}
				</div>
				<p>
					{
						"Pour compléter ta carte de l'Europe, tu peux cocher le pays que tu as déjà visité ou tu peux le chercher dans la barre de recherche :"
					}
				</p>
				<br />
				<input placeholder="Rechercher un pays" />
				<br />
				<p>
					{
						" Si tu veux sauvegarder ta propre carte de l'Europe, tu peux te connecter !"
					}
				</p>
				<br />
				<p>Si tu ne possède pas encore de compte, pas de soucis.</p>
				<br />
				<p>
					Visite des pays, prends des photos souvenirs, partage tes aventures et
					gagne des récompenses !
				</p>
			</div>
		</MapGlobal>
	);
}

export default Map;

const MapGlobal = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	//   height: 100vh;
	height: calc(100vh - 70px);
	width: 100%;

	@media (max-width: 600px) {
		flex-direction: column;
	}

	.MapOfEurope {
		width: 50%;
		height: 100%;
		background-color: rgb(240, 240, 240);
		// background-color: rgb(0, 21, 29);
		position: relative;

		@media (max-width: 600px) {
			width: 100%;
			height: 50%;
		}

		#refresh {
			position: absolute;
			top: 20px;
			left: 25px;
			font-size: 1.5rem;
			border-radius: 50px;
			background-color: white;
			padding: 10px;
			z-index: 1;

			@media (max-width: 600px) {
				top: 10px;
				left: 15px;
				font-size: 1rem;
			}

			&:hover {
				cursor: pointer;
			}
		}
	}

	.MapDescription {
		background-color: white;
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0px 15px;

		@media (max-width: 600px) {
			width: 100%;
			height: 50%;
		}

		h1 {
			font-size: 1.7rem;
			font-weight: 500;
			width: 100%;
			text-align: center;
		}

		p {
			margin: 0;
		}

		input {
			padding: 10px;
			font-size: 1.025rem;
			border-radius: 40px;
			border: none;
			box-shadow: inset 0px 0px 0px 1px black;
		}
	}

	svg {
		display: block;
		margin: 0 0 0 auto;
		filter: drop-shadow(5px 5px 3px rgba(40, 40, 40, 0.7));
	}

	.cursor {
		position: fixed;
		top: -25px;
		left: 10px;
		padding: 4px 8px;
		background-color: black;
		color: white;
		border-radius: 5px;
	}
`;
