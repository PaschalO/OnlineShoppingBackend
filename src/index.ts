import express from 'express';
import bodyParser from 'body-parser'
import routes from "./routes/routes";
//const cors = require('cors')

const app: express.Application = express();
const port = 3000;

// review the corsOptions for changes
/*
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}

 */

//app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

