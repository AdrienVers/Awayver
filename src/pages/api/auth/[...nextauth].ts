import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../database/connectdb";
import User from "../../../model/User";

const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			type: "credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "Adresse E-mail" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await connectDB();

				const user = await User.findOne({
					email: credentials?.email,
				});

				if (!user) {
					throw new Error("Email is not registered");
				}

				if (!(credentials?.password === user.password)) {
					throw new Error("Password is incorrect");
				}

				return user;
			},
		}),
	],
};

export default NextAuth(authOptions);
