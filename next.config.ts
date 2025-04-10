import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    REST_BASE_URL: process.env.REST_BASE_URL,
    GRAPHQL_BASE_URL: process.env.GRAPHQL_BASE_URL,
    GRAPGQL_WS_BASE_URL: process.env.GRAPGQL_WS_BASE_URL,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.graphql": {
          loaders: ["graphql-tag/loader"],
          as: "*.js", // Change to *.js to properly transform GraphQL files
        },
      },
    },
  },
};

export default nextConfig;
