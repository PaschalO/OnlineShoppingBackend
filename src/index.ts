import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import * as path from "path";
import helmet from "helmet";
const cors = require("cors");

const app: express.Application = express();
const port = 3000;

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, '..', 'dist', 'store-front-end')));
routes(app);

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '..', 'dist', 'store-front-end', 'index.html'))
// })
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});

export default app;
