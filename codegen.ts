import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://tg61sa9cbd.execute-api.eu-north-1.amazonaws.com/graphql",
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
