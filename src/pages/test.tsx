import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { supabase } from "../utils/supabase";

function Test() {
	const [imageUrl, setImageUrl] = useState("");

	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		let file;

		if (e.target.files) {
			file = e.target.files[0];
		}

		const { data, error } = await supabase.storage
			.from("images")
			.upload("public/" + file?.name, file as File);

		if (data) {
			const publicUrl = await supabase.storage
				.from("images")
				.getPublicUrl(data.path);
			console.log(publicUrl);
			setImageUrl(publicUrl.data.publicUrl);
		} else if (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<input
				type="file"
				id="file-input"
				accept="image/*"
				onChange={(e) => handleUpload(e)}
			/>
			{imageUrl && (
				<Image src={imageUrl} alt="uploaded image" width={300} height={300} />
			)}
		</div>
	);
}

export default Test;

/*
import React, { ChangeEvent } from "react";
import { supabase } from "../utils/supabase";

function Test() {
	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		let file;

		if (e.target.files) {
			file = e.target.files[0];
		}

		const { data, error } = await supabase.storage
			.from("images")
			.upload("public/" + file?.name, file as File);

		if (data) {
			const publicUrl = supabase.storage.from("images").getPublicUrl(data.path);
			console.log(publicUrl);
			// console.log(data);
		} else if (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<input
				type="file"
				id="file-input"
				accept="image/*"
				onChange={(e) => handleUpload(e)}
			/>
		</div>
	);
}

export default Test;
*/

/*
import React, { ChangeEvent, useState } from "react";
import { supabase } from "../utils/supabase";

function Test() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		let file;

		if (e.target.files) {
			file = e.target.files[0];
		}

		const { data, error } = await supabase.storage
			.from("images")
			.upload("public/" + file?.name, file as File);

		if (data) {
			setImageUrl(data.path);
		} else if (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<input
				type="file"
				id="file-input"
				accept="image/*"
				onChange={(e) => handleUpload(e)}
			/>
			{imageUrl && <p>{imageUrl}</p>}
		</div>
	);
}

export default Test;
*/

/*
import React, { ChangeEvent } from "react";
import { supabase } from "../utils/supabase";

function Test() {
	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		let file;

		if (e.target.files) {
			file = e.target.files[0];
		}

		const { data, error } = await supabase.storage
			.from("images")
			.upload("public/" + file?.name, file as File);

		if (data) {
			console.log(data);
		} else if (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<input
				type="file"
				id="file-input"
				accept="image/*"
				onChange={(e) => handleUpload(e)}
			/>
		</div>
	);
}

export default Test;
*/

/*
import React from "react";
import { supabase } from "../utils/supabase";

function Test({ data, error }) {
	console.log(data, error);

	return <div>Test</div>;
}

export default Test;

export async function getStaticProps(context) {
	const { data: posts, error } = await supabase.from("posts").select("*");

	return {
		props: {
			data: posts,
			error: error,
		},
	};
}
*/

/*
import { useState } from "react";

function Test() {
	const [file, setFile] = useState();
	const onFileChange = (event) => {
		// Updating the state
		setFile({ file: event.target.files[0] });
	};
	const onFileUpload = async () => {
		// Client ID
		const clientId = "c26a8b330562b71",
			auth = "Client-ID " + clientId;

		// Creating an object of formData
		const formData = new FormData();

		// Adding our image to formData
		formData.append("file", file);

		// Making the post request
		await fetch("https://api.imgur.com/3/image/", {
			// API Endpoint
			method: "POST", // HTTP Method
			body: formData, // Data to be sent
			headers: {
				// Setting header
				Authorization: auth,
				Accept: "application/json",
			},
		})
			// Handling success
			.then((res) => alert("image uploaded") && console.log(res))
			.catch((err) => alert("Failed") && console.log(err));
	};
	return (
		<>
			<input name="file" type="file" onChange={onFileChange} />
			<button onClick={onFileUpload}>Upload</button>
		</>
	);
}

export default Test;
*/
