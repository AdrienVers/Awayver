import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const { connection } = await mongoose.connect(
			process.env.MONGODB_URI as string,
		);

		if (connection.readyState == 1) {
			console.log("Database Connected");
			return { name: "Data connectée !" };
		}
	} catch (errors) {
		return Promise.reject(errors);
	}
};

export default connectDB;
