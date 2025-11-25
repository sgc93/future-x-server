import dotenv from "dotenv";
import { createServer } from "./server";

dotenv.config();

const app = createServer();
const port = process.env.PORT ?? 5000;

app.listen(port, async () => {
  console.log(`Runing on port ${port}`);
});
