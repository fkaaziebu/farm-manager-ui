// get-schema.js
const { exec } = require("child_process");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.GRAPHQL_BASE_URL;

if (!url) {
  console.error("Please provide a GraphQL URL");
}

exec(`npx get-graphql-schema ${url}`, (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error);
    return;
  }

  if (stderr) {
    console.error("stderr:", stderr);
    return;
  }

  console.log(stdout);
});
