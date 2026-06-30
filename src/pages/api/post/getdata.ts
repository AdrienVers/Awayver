import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/memoryDb";

type Data = {
	title: string;
	content: string;
	image: string;
	ownerName: string;
	ownerPicture: string;
	tags: string[];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data[]>,
) {
	const posts = await db.post.findMany();
	res.status(200).json(posts);
}
