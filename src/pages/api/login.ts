import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../database/connectdb";
import User from "../../model/User";

type Data = {
	name: string;
};

type Error = {
	status: string;
};

connectDB();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | Error>,
) {
	const { email, password } = req.body;
	const user = await User.findOne({ email, password });
	if (!user) {
		return res.json({ status: "Not able to find the user" });
	}

	res.redirect("/profil");
}

//res.redirect("/profil");
//res.status(200).json({ status: "Successfuly login with user: " + email });
