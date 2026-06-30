import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

function Test() {
	const [imageUrl, setImageUrl] = useState("");

	const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Mock in-memory : encodage du fichier en data URL côté client,
		// pas de stockage externe (Supabase) nécessaire.
		const reader = new FileReader();
		reader.onload = () => setImageUrl(reader.result as string);
		reader.onerror = (err) => console.log(err);
		reader.readAsDataURL(file);
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
