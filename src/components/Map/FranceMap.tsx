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
const STORAGE_KEY_CUSTOM = "france-map-custom-colors";

// Convertit une couleur HSV (teinte 0-360, saturation/valeur 0-1) en hex.
// HSV permet de couvrir toute la gamme via un carré S/V + un curseur de teinte.
function hsvToHex(h: number, s: number, v: number): string {
	const f = (n: number) => {
		const k = (n + h / 60) % 6;
		const c = v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
		return Math.round(255 * c)
			.toString(16)
			.padStart(2, "0");
	};
	return `#${f(5)}${f(3)}${f(1)}`.toUpperCase();
}

// Convertit un hex (#RRGGBB) en HSV, pour recharger une couleur dans le picker (pipette).
function hexToHsv(hex: string): { h: number; s: number; v: number } {
	const clean = hex.replace("#", "");
	const r = parseInt(clean.slice(0, 2), 16) / 255;
	const g = parseInt(clean.slice(2, 4), 16) / 255;
	const b = parseInt(clean.slice(4, 6), 16) / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	let h = 0;
	if (d !== 0) {
		if (max === r) h = ((g - b) / d) % 6;
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
		h = h * 60;
		if (h < 0) h += 360;
	}
	const s = max === 0 ? 0 : d / max;
	const v = max;
	return { h: Math.round(h), s, v };
}

function FranceMap() {
	const [activeColor, setActiveColor] = useState<string>(PALETTE[0]);
	const [isEraser, setIsEraser] = useState<boolean>(false);
	// code du département -> couleur appliquée
	const [colors, setColors] = useState<Record<string, string>>({});
	const [hovered, setHovered] = useState<string>("");
	// couleurs personnalisées ajoutées par l'utilisateur (persistées)
	const [customColors, setCustomColors] = useState<string[]>([]);
	// état du picker : teinte (0-360), saturation et valeur (0-1)
	const [hue, setHue] = useState<number>(0);
	const [sat, setSat] = useState<number>(1);
	const [val, setVal] = useState<number>(1);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	// mode pipette : un clic sur une couleur la recharge dans le picker au lieu de la sélectionner
	const [isPicking, setIsPicking] = useState<boolean>(false);
	const squareRef = useRef<HTMLDivElement>(null);

	// Restaure le coloriage sauvegardé au montage (côté client uniquement,
	// pour éviter un mismatch d'hydratation SSR).
	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				setColors(JSON.parse(saved));
			}
			const savedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM);
			if (savedCustom) {
				setCustomColors(JSON.parse(savedCustom));
			}
		} catch {
			// localStorage indisponible ou JSON corrompu : on ignore.
		}
	}, []);

	// Persiste la liste des couleurs personnalisées.
	const persistCustom = (next: string[]) => {
		try {
			localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(next));
		} catch {
			// localStorage indisponible (mode privé, quota...) : on ignore.
		}
	};

	// Met à jour saturation/valeur d'après la position du pointeur dans le carré.
	const updateSquare = (clientX: number, clientY: number) => {
		const rect = squareRef.current?.getBoundingClientRect();
		if (!rect || !rect.width || !rect.height) return;
		const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
		const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
		setSat(x / rect.width);
		setVal(1 - y / rect.height);
	};

	const handleSquarePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		setIsDragging(true);
		updateSquare(e.clientX, e.clientY);
	};

	const handleSquarePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		updateSquare(e.clientX, e.clientY);
	};

	const handleSquarePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
		setIsDragging(false);
		e.currentTarget.releasePointerCapture(e.pointerId);
	};

	// Ajoute la couleur du picker à la liste, puis la sélectionne.
	const handleAddColor = () => {
		const color = hsvToHex(hue, sat, val);
		// Doublon (couleur de base ou déjà ajoutée) : on la sélectionne sans l'ajouter.
		if (!PALETTE.includes(color) && !customColors.includes(color)) {
			const next = [...customColors, color];
			setCustomColors(next);
			persistCustom(next);
		}
		setActiveColor(color);
		setIsEraser(false);
	};

	// Retire une couleur personnalisée de la liste.
	const handleRemoveColor = (color: string) => {
		const next = customColors.filter((c) => c !== color);
		setCustomColors(next);
		persistCustom(next);
		if (activeColor === color) {
			setActiveColor(PALETTE[0]);
		}
	};

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

	// Recharge une couleur dans le picker (teinte + zone S/V) et désarme la pipette.
	const loadColorIntoPicker = (color: string) => {
		const { h, s, v } = hexToHsv(color);
		setHue(h);
		setSat(s);
		setVal(v);
		setIsPicking(false);
	};

	// Clic sur une couleur de la grille : pipette = on la charge ; sinon on la sélectionne.
	const handleSwatchClick = (color: string) => {
		if (isPicking) {
			loadColorIntoPicker(color);
			return;
		}
		setActiveColor(color);
		setIsEraser(false);
	};

	const handleDepClick = (code: string) => {
		// Pipette active : on récupère la couleur du département au lieu de peindre.
		if (isPicking) {
			if (colors[code]) {
				loadColorIntoPicker(colors[code]);
			}
			return;
		}
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
	const pickedColor = hsvToHex(hue, sat, val);

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
							onClick={() => handleSwatchClick(color)}
							aria-label={`Couleur ${color}`}
						/>
					))}
					{customColors.map((color) => (
						<div className="swatch-wrap" key={color}>
							<button
								type="button"
								className={
									!isEraser && activeColor === color ? "swatch active" : "swatch"
								}
								style={{ backgroundColor: color }}
								onClick={() => handleSwatchClick(color)}
								aria-label={`Couleur personnalisée ${color}`}
							/>
							<button
								type="button"
								className="swatch-remove"
								onClick={() => handleRemoveColor(color)}
								aria-label={`Supprimer la couleur ${color}`}
							>
								×
							</button>
						</div>
					))}
				</div>

				<div className="picker">
					<div
						ref={squareRef}
						className="sl-square"
						style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
						onPointerDown={handleSquarePointerDown}
						onPointerMove={handleSquarePointerMove}
						onPointerUp={handleSquarePointerUp}
						role="slider"
						aria-label="Saturation et luminosité"
						aria-valuetext={pickedColor}
					>
						<div
							className="sl-thumb"
							style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%` }}
						/>
					</div>
					<input
						type="range"
						min={0}
						max={360}
						value={hue}
						onChange={(e) => setHue(Number(e.target.value))}
						className="hue-slider"
						aria-label="Teinte de la couleur personnalisée"
					/>
					<div className="picker-add">
						<span
							className="preview"
							style={{ backgroundColor: pickedColor }}
							aria-hidden="true"
						/>
						<code className="hex">{pickedColor}</code>
						<button type="button" className="tool add-color" onClick={handleAddColor}>
							+ Ajouter
						</button>
					</div>
				</div>

				<div className="tools">
					<button
						type="button"
						className={isPicking ? "tool active" : "tool"}
						onClick={() => {
							setIsPicking((p) => !p);
							setIsEraser(false);
						}}
					>
						💧 Pipette
					</button>
					<button
						type="button"
						className={isEraser ? "tool active" : "tool"}
						onClick={() => {
							setIsEraser(true);
							setIsPicking(false);
						}}
					>
						🧽 Gomme
					</button>
					<button type="button" className="tool" onClick={handleReset}>
						🔄 Tout effacer
					</button>
				</div>

				{isPicking && (
					<p className="hint">
						Pipette active : clique une couleur (palette ou département colorié) pour
						la charger dans le picker.
					</p>
				)}

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

	.swatch-wrap {
		position: relative;
		aspect-ratio: 1 / 1;
	}

	.swatch-wrap .swatch {
		width: 100%;
		height: 100%;
	}

	.swatch-remove {
		position: absolute;
		top: -6px;
		right: -6px;
		width: 18px;
		height: 18px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background-color: #333;
		color: white;
		font-size: 13px;
		line-height: 1;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.1s ease;
	}

	.swatch-wrap:hover .swatch-remove,
	.swatch-remove:focus-visible {
		opacity: 1;
	}

	.picker {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.sl-square {
		position: relative;
		width: 100%;
		height: 150px;
		border-radius: 8px;
		cursor: crosshair;
		touch-action: none;
		background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
			linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
	}

	.sl-thumb {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.hue-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 14px;
		border-radius: 7px;
		cursor: pointer;
		outline: none;
		background: linear-gradient(
			to right,
			hsl(0, 100%, 50%),
			hsl(60, 100%, 50%),
			hsl(120, 100%, 50%),
			hsl(180, 100%, 50%),
			hsl(240, 100%, 50%),
			hsl(300, 100%, 50%),
			hsl(360, 100%, 50%)
		);
	}

	.hue-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: white;
		border: 2px solid #333;
		cursor: pointer;
	}

	.hue-slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: white;
		border: 2px solid #333;
		cursor: pointer;
	}

	.picker-add {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.preview {
		width: 36px;
		height: 36px;
		flex-shrink: 0;
		border-radius: 8px;
		border: 2px solid rgba(0, 0, 0, 0.1);
	}

	.hex {
		font-family: monospace;
		font-size: 0.85rem;
		color: #333;
		min-width: 70px;
	}

	.add-color {
		flex: 1;
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
