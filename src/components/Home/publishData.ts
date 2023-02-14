import { StaticImageData } from "next/image";
import Athenes from "../../assets/Athenes.png";
import Budapest from "../../assets/Budapest.png";
import Munich from "../../assets/Munich.png";
import Varsovie from "../../assets/Varsovie.png";
import Vasa from "../../assets/Vasa.png";
import Orne from "../../assets/Kayak.png";
import Salade from "../../assets/SaladeGrecque.png";
import Cyberdog from "../../assets/Cyber.png";
import User from "../../assets/UserGreen.png";
import Nathan from "../../assets/Nathan.png";
import Tom from "../../assets/Tom.png";
import Julie from "../../assets/Julie.png";
import Angélique from "../../assets/Angélique.png";
import Alex from "../../assets/Alex.png";

interface PublishData {
	id: number;
	name: string;
	icon: string;
}

interface Tag {
	id: number;
	name: string;
}

interface PublicationsData {
	id: number;
	owner: string;
	ownerPicture: StaticImageData;
	category: string;
	icon: string;
	content: string;
	image: StaticImageData;
	tags: Array<Tag>;
	likes: number;
	commentsNumber: number;
	comments: Array<string>;
}

export const PUBLISH_DATA: PublishData[] = [
	{
		id: 101,
		name: "Expérience",
		icon: "fa-solid fa-compass",
	},
	{
		id: 102,
		name: "Adresse",
		icon: "fa-solid fa-star",
	},
	{
		id: 103,
		name: "Activité",
		icon: "fa-solid fa-person-hiking",
	},
	{
		id: 104,
		name: "Événement",
		icon: "fa-solid fa-calendar-days",
	},
	{
		id: 105,
		name: "Insolite",
		icon: "fa-solid fa-fire",
	},
];

//Cela signifie que c'est un lieu recommandé, populaire et apprécié par les locaux et les visiteurs.

export const POSTS_DATA: PublishData[] = [
	{
		id: 201,
		name: "J'aime",
		icon: "fa-solid fa-thumbs-up",
	},
	{
		id: 202,
		name: "Commenter",
		icon: "fa-solid fa-comment",
	},
	{
		id: 203,
		name: "Partager",
		icon: "fa-solid fa-share",
	},
];

export const PUBLICATIONS_DATA: PublicationsData[] = [
	{
		id: 301,
		owner: "Nathan",
		ownerPicture: Nathan,
		category: "Expérience",
		icon: "fa-solid fa-compass",
		content:
			"Sejour à Budapest, de nombreux sites touristiques à ne pas manquer dont le Palais de Budavar, la Statue de la Liberté et l'incontournable Bastion des pêcheurs (côté Buda), ainsi que la Basilique Saint-Étienne, Place des Héros et Place Vörösmarty (côté Pest). Les promenades sur le Danube au coucher du Soleil sont également à ne pas manquer ! Prévoir 4 bonnes journées de marche soutenue pour en voir un maximum !",
		image: Budapest,
		tags: [
			{ id: 3011, name: "Budapest" },
			{ id: 3012, name: "Week-end" },
			{ id: 3013, name: "Incontournable" },
		],
		likes: 341,
		commentsNumber: 4,
		comments: ["Super !", "Merci pour l'info !"],
	},
	{
		id: 302,
		owner: "Julie",
		ownerPicture: Julie,
		category: "Activité",
		icon: "fa-solid fa-person-hiking",
		content:
			"Week-end en Suisse Normande, avec une randonnée et kayak au niveau de la boucle de l'Orne. Panorma exceptionnel surplombant la vallée de l'Orne et ses méandres, navigation sportive, mais paysages magnifiques !",
		image: Orne,
		tags: [
			{ id: 3021, name: "Normandie" },
			{ id: 3022, name: "France" },
			{ id: 3023, name: "Kayak" },
		],
		likes: 22,
		commentsNumber: 1,
		comments: ["Super !", "Merci pour l'info !"],
	},
	{
		id: 303,
		owner: "Tom",
		ownerPicture: Tom,
		category: "Adresse de choix",
		icon: "fa-solid fa-star",
		content:
			"Si vous passez à Athènes, vous devez obligatoirement manger au moins une fois dans l'une des nombreuses tarvernes du quartier Plaka, un quartier pittoresque d'Athènes situé juste au pied de l'Acropole, c'est le coeur historique et touristique de la capitale.",
		image: Salade,
		tags: [
			{ id: 3031, name: "Athènes" },
			{ id: 3032, name: "Grece" },
			{ id: 3033, name: "Acropole" },
		],
		likes: 203,
		commentsNumber: 5,
		comments: ["Super !", "Merci pour l'info !"],
	},
	{
		id: 304,
		owner: "Angélique",
		ownerPicture: Angélique,
		category: "Insolite",
		icon: "fa-solid fa-fire",
		content:
			"Assez insolite, le Cyberdog, un magasin situé dans Camden Town, quartier réputé pour ses nombreux marchés aux puces colorés et animés, ainsi que pour être associé à de nombreuses cultures (punks, gothiques, disco, etc).",
		image: Cyberdog,
		tags: [
			{ id: 3041, name: "Londres" },
			{ id: 3042, name: "Angleterre" },
			{ id: 3043, name: "Camden Town" },
		],
		likes: 201,
		commentsNumber: 11,
		comments: ["Super !", "Merci pour l'info !"],
	},
	{
		id: 305,
		owner: "Alex",
		ownerPicture: Alex,
		category: "Évenement",
		icon: "fa-solid fa-calendar-days",
		content:
			"Pour ceux qui le souhaitent, nous serons à la 188ème édition de l'Oktoberfest, du 22 au 25 Septembre 2023. Et pour ceux qui ne le connaissent pas encore, c'est l'un des plus grands festivals publics du monde, se déroulant près du centre de Munich (sur la Theresienwiese) en Allemagne, sur près de 42 hectares. On y retrouve plus de 200 attractions, de la bière de Munich, ainsi que de délicieux mets bavarois.",
		image: Munich,
		tags: [
			{ id: 3051, name: "Munich" },
			{ id: 3052, name: "Allemagne" },
			{ id: 3053, name: "Oktoberfest" },
		],
		likes: 406,
		commentsNumber: 6,
		comments: ["Super !", "Merci pour l'info !"],
	},
	{
		id: 306,
		owner: "Tom",
		ownerPicture: Tom,
		category: "Expérience",
		icon: "fa-solid fa-compass",
		content:
			"Voyage riche, rempli d'histoire et de culture à Athènes. Visite de l'Acropole, l'un des plus grands sites historiques de la ville, comprenant des ruines de bâtiments tels que le Parthénon, l'Erechthéion et le temple de Athéna Niké. En bas de l'Acropole, n'hesitez pas à vous promener dans le quartier Plaka, vous y trouverez des nombreux cafés et tavernes pour déguster de la cuisine grecque traditionnelle ! ",
		image: Athenes,
		tags: [
			{ id: 3061, name: "Athènes" },
			{ id: 3062, name: "Grece" },
			{ id: 3063, name: "Acropole" },
		],
		likes: 442,
		commentsNumber: 15,
		comments: ["Super !", "Merci pour l'info !"],
	},
	{
		id: 307,
		owner: "Nathan",
		ownerPicture: Nathan,
		category: "Expérience",
		icon: "fa-solid fa-compass",
		content:
			"Varsovie est un lieu incroyablement charmant à visiter pendant la période de Noël. La vieille ville de Varsovie, inscrite au patrimoine mondial de l'UNESCO, est magnifique avec ses bâtiments historiques et ses rues pavées. Les illuminations de Noël et les décorations de Noël ajoutent une touche supplémentaire de magie à l'atmosphère déjà féerique de cette partie de la ville.",
		image: Varsovie,
		tags: [
			{ id: 3071, name: "Varsovie" },
			{ id: 3072, name: "Pologne" },
		],
		likes: 306,
		commentsNumber: 9,
		comments: ["Super !", "Merci pour l'info !"],
	},
	{
		id: 308,
		owner: "Alex",
		ownerPicture: Alex,
		category: "Expérience",
		icon: "fa-solid fa-compass",
		content:
			"Sans doute l'un des quelques musées à faire au moins dans sa vie, le Vasa Museum, abritant un navire de guerre suédois appelé Vasa, naufragé lors de sa toute première mise en service en 1628 (guerre de Trente Ans), qui coula jusqu'à une trentaine de metre de profondeur, et qui fut récupéré en 1961 en grande partie conservé et intact après plus de trois siècles dans la mer Baltique !",
		image: Vasa,
		tags: [
			{ id: 3081, name: "Vasa" },
			{ id: 3082, name: "Suède" },
			{ id: 3083, name: "Musée" },
		],
		likes: 389,
		commentsNumber: 4,
		comments: ["Super !", "Merci pour l'info !"],
	},
];
