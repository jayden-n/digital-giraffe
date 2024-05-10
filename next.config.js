/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "localhost",
				pathname: "**",
				protocol: "http",
				port: "3000",
			},
			{
				hostname: "digital-giraffe.onrender.com",
				protocol: "https",
			},
		],
	},
};

module.exports = nextConfig;
