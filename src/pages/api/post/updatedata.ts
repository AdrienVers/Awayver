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
	res: NextApiResponse<Data>,
) {
	if (req.method === "PUT") {
		const { id, title, content, image, ownerName, ownerPicture, tags } =
			req.body;
		const post = await db.post.update({
			where: {
				id,
			},
			data: {
				title,
				content,
				image,
				ownerName,
				ownerPicture,
				tags,
			},
		});
		res.status(200).json(post);
	}
}
