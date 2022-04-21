const http = require("http");
require("dotenv").config();
const app = require("./app");

const { mongoConnect } = require("./utils/mongo");

const PORT = process.env.PORT || 8005;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

startServer();