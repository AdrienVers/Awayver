import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { FRANCE_DATA } from "./franceData";

// 12 couleurs pâles disponibles pour colorier les départements
const PALETTE = [
	"#F8D6D4", // rose
	"#FAE3C9", // pêche
	"#FAF1C6", // jaune pâle
	"#E4F2C6", // vert tilleul
	"#C9F0D4", // menthe
	"#C7EFEA", // turquoise
	"#CBE5FA", // bleu ciel
	"#D2D6FA", // bleu lavande
	"#E2CFFA", // violet
	"#F6CFF6", // magenta
	"#FBD8E8", // rose poudré
	"#E7E0D5", // beige
];

const DEFAULT_FILL = "#EDEFF2"; // gris clair pour un département non colorié
const STORAGE_KEY = "france-map-colors";

function FranceMap() {
	const [activeColor, setActiveColor] = useState<string>(PALETTE[0]);
	const [isEraser, setIsEraser] = useState<boolean>(false);
	// code du département -> couleur appliquée
	const [colors, setColors] = useState<Record<string, string>>({});
	const [hovered, setHovered] = useState<string>("");

	// Restaure le coloriage sauvegardé au montage (côté client uniquement,
	// pour éviter un mismatch d'hydratation SSR).
	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				setColors(JSON.parse(saved));
			}
		} catch {
			// localStorage indisponible ou JSON corrompu : on ignore.
		}
	}, []);

	// Persiste le coloriage. Appelé uniquement sur action utilisateur, jamais
	// au montage : impossible d'écraser les données sauvegardées avec {}.
	const persist = (next: Record<string, string>) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		} catch {
			// localStorage indisponible (mode privé, quota...) : on ignore.
		}
	};

	const cursorRef = useRef<HTMLDivElement>(null);
	const followMouse = (e: MouseEvent) => {
		if (cursorRef.current) {
			cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
		}
	};

	useEffect(() => {
		window.addEventListener("mousemove", followMouse);
		return () => window.removeEventListener("mousemove", followMouse);
	}, []);

	const handleDepClick = (code: string) => {
		setColors((prev) => {
			const next = { ...prev };
			if (isEraser) {
				delete next[code];
			} else {
				next[code] = activeColor;
			}
			persist(next);
			return next;
		});
	};

	const handleReset = () => {
		setColors({});
		persist({});
	};

	const coloredCount = Object.keys(colors).length;
	const hoveredName = FRANCE_DATA.find((d) => d.code === hovered)?.name;

	return (
		<FranceGlobal>
			<div className="MapZone">
				<svg
					id="francemap"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 907 1000"
					width="95%"
					height="95%"
				>
					{FRANCE_DATA.map((dep) => (
						<path
							key={dep.code}
							className="dep"
							d={dep.d}
							fill={colors[dep.code] || DEFAULT_FILL}
							stroke="#ffffff"
							strokeWidth="1"
							onMouseOver={() => setHovered(dep.code)}
							onMouseOut={() => setHovered("")}
							onClick={() => handleDepClick(dep.code)}
							role="button"
							aria-label={`${dep.name} (${dep.code})`}
						/>
					))}
				</svg>
			</div>

			<div className="Panel">
				<h1>Carte de France</h1>
				<p className="hint">
					Choisis une couleur, puis clique sur un département pour le colorier.
				</p>

				<div className="palette">
					{PALETTE.map((color) => (
						<button
							key={color}
							type="button"
							className={
								!isEraser && activeColor === color ? "swatch active" : "swatch"
							}
							style={{ backgroundColor: color }}
							onClick={() => {
								setActiveColor(color);
								setIsEraser(false);
							}}
							aria-label={`Couleur ${color}`}
						/>
					))}
				</div>

				<div className="tools">
					<button
						type="button"
						className={isEraser ? "tool active" : "tool"}
						onClick={() => setIsEraser(true)}
					>
						🧽 Gomme
					</button>
					<button type="button" className="tool" onClick={handleReset}>
						🔄 Tout effacer
					</button>
				</div>

				<div className="count">
					Départements coloriés : <strong>{coloredCount}</strong> / {FRANCE_DATA.length}
				</div>
			</div>

			<div
				className="cursor"
				ref={cursorRef}
				style={{ display: hovered ? "flex" : "none" }}
			>
				{hoveredName ? `${hoveredName} (${hovered})` : null}
			</div>
		</FranceGlobal>
	);
}

export default FranceMap;

const FranceGlobal = styled.div`
	display: flex;
	height: calc(100vh - 70px);
	width: 100%;

	@media (max-width: 800px) {
		flex-direction: column;
		height: auto;
	}

	.MapZone {
		width: 60%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(255, 255, 255);

		@media (max-width: 800px) {
			width: 100%;
			height: 60vh;
		}
	}

	svg {
		display: block;
		max-height: 100%;
		filter: drop-shadow(4px 4px 4px rgba(40, 40, 40, 0.25));
	}

	.dep {
		transition: filter 0.1s ease;
		cursor: pointer;
	}

	.dep:hover {
		filter: brightness(0.9);
	}

	.Panel {
		width: 40%;
		height: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		padding: 24px 28px;
		gap: 16px;

		@media (max-width: 800px) {
			width: 100%;
			height: auto;
		}

		h1 {
			font-size: 1.7rem;
			font-weight: 500;
			margin: 0;
		}

		.hint {
			margin: 0;
			color: #555;
			font-size: 0.95rem;
		}
	}

	.palette {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 10px;
	}

	.swatch {
		aspect-ratio: 1 / 1;
		border-radius: 8px;
		border: 2px solid rgba(0, 0, 0, 0.1);
		cursor: pointer;
		padding: 0;
		transition: transform 0.1s ease, box-shadow 0.1s ease;
	}

	.swatch:hover {
		transform: scale(1.08);
	}

	.swatch.active {
		border-color: #333;
		box-shadow: 0 0 0 3px rgba(51, 51, 51, 0.25);
	}

	.tools {
		display: flex;
		gap: 10px;
	}

	.tool {
		flex: 1;
		padding: 10px;
		font-size: 0.95rem;
		border-radius: 8px;
		border: 1px solid #ccc;
		background-color: #fafafa;
		cursor: pointer;
		transition: background-color 0.1s ease;
	}

	.tool:hover {
		background-color: #f0f0f0;
	}

	.tool.active {
		border-color: #333;
		background-color: #eee;
	}

	.count {
		margin-top: auto;
		font-size: 1rem;
		color: #333;
	}

	.cursor {
		position: fixed;
		top: -30px;
		left: 14px;
		padding: 4px 10px;
		background-color: black;
		color: white;
		border-radius: 5px;
		font-size: 0.9rem;
		pointer-events: none;
		white-space: nowrap;
		z-index: 10;
	}
`;
