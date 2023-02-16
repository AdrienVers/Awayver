/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			"wvyzjjfwnpsmzhxhcaly.supabase.co",
			"cdn.filestackcontent.com",
			"res.cloudinary.com",
			"i.imgur.com",
		],
		// domains: ["i.imgur.com"],
	},
};

module.exports = nextConfig;
