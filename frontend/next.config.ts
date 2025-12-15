import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {},
	webpack(config) {
		// Ignore any .mjs test files in thread-stream
		config.module.rules.push({
			test: /thread-stream\/test\/.*\.mjs$/,
			loader: "ignore-loader"
		});

		return config;
	}
};

export default nextConfig;
