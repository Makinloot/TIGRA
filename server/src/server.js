import http from "http";
import { app } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

connectDB();
startServer();

function startServer() {
  server.listen(PORT, () => {
    console.log(`Running at ${PORT}`);
  });
}
