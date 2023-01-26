interface NavbarDataLaptop {
	id: number;
	name: string;
	path: string;
}

interface NavbarDataPhone {
	id: number;
	name: string;
	path: string;
	icon: string;
	marginTop: string;
	borderRadius: string;
	height: string;
	width: string;
}

export const NAVBAR_DATA_LAPTOP: NavbarDataLaptop[] = [
	{
		id: 1,
		name: "Explorer",
		path: "/",
	},
	{
		id: 2,
		name: "Messages",
		path: "/conversations",
	},
	{
		id: 3,
		name: "Mes destinations",
		path: "/carte",
	},
];

export const NAVBAR_DATA_PHONE: NavbarDataPhone[] = [
	{
		id: 1,
		name: "Explorer",
		path: "/",
		icon: "fa-solid fa-earth-americas",
		marginTop: "3px",
		borderRadius: "5px",
		height: "35px",
		width: "35px",
	},
	{
		id: 2,
		name: "Messages",
		path: "/conversations",
		icon: "fa-solid fa-comments",
		marginTop: "0px",
		borderRadius: "5px",
		height: "35px",
		width: "35px",
	},
	{
		id: 3,
		name: "Mes destinations",
		path: "/carte",
		icon: "fa-solid fa-map-location-dot",
		marginTop: "0px",
		borderRadius: "5px",
		height: "35px",
		width: "35px",
	},
	{
		id: 4,
		name: "Mon profil",
		path: "/profil",
		icon: "fa-solid fa-user",
		marginTop: "0px",
		borderRadius: "50px",
		height: "40px",
		width: "40px",
	},
];

/*
	{
		id: 1,
		name: "Actualités",
		path: "/",
		icon: "fa-solid fa-bell",
	},
*/
