import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3007/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/generated/": {
      preset: "client",
    },
    "src/graphql.d.ts": {
      plugins: ["typescript-graphql-files-modules"],
    },
  },
};

export default config;
