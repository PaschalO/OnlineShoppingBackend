import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
// import * as path from "path";
import helmet from "helmet";

import { PORT } from "./config";
const cors = require("cors");

const app: express.Application = express();
const port = PORT;

app.use(helmet());

app.use(bodyParser.json());
app.use(cors());

//app.use(express.static(path.join(__dirname, "..", "dist", "store-front-end")));

routes(app);

/*app.get("*", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "dist", "store-front-end", "index.html")
	);
});*/

app.get("/", (req, res) => {
	res.status(200).send({ message: "Hello World" });
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});

export default app;
