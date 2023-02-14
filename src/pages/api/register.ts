import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../database/connectdb";
import User from "../../model/User";

interface ResponseData {
	error?: string;
	msg?: string;
}

const validateEmail = (email: string): boolean => {
	const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return regEx.test(email);
};

const validateForm = async (name: string, email: string, password: string, image: string) => {
	if (name.length < 2) {
		return { error: "Name must have 2 or more characters" };
	}

	if (!validateEmail(email)) {
		return { error: "Email is invalid" };
	}

	await connectDB();
	const emailUser = await User.findOne({ email: email });

	if (emailUser) {
		return { error: "Email already exists" };
	}

	if (password.length < 5) {
		return { error: "Password must have 5 or more characters" };
	}

	return null;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	if (req.method !== "POST") {
		return res
			.status(200)
			.json({ error: "This API call only accepts POST methods" });
	}

	const { name, email, password, image } = req.body;

	const errorMessage = await validateForm(name, email, password, image);
	if (errorMessage) {
		return res.status(400).json(errorMessage);
	}

	const newUser = new User({
		name,
		email,
		password,
		image,
	});

	newUser
		.save()
		.then(() =>
			res.redirect("/connexion"),
		)
		.catch((err: string) =>
			res.status(400).json({ error: "Error on '/api/register': " + err }),
		);
}

