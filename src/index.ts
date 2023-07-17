import express from 'express';
import bodyParser from 'body-parser'
import routes from "./routes/routes";
const cors = require('cors');

const app: express.Application = express();
const port = 3000;

const corsOptions: {origin: string, optionsSuccessStatus: number} = {
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;
