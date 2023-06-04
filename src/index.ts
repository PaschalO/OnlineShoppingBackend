import express, { Request, Response } from 'express';
import bodyParser from 'body-parser'

const app = express();
//const address: string = "0.0.0.0:3000"
const port = 3000;

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Testing')
})

app.get('/hello', function (req: Request, res: Response) {
    res.send('Testing hello path, it does not refresheee and see again')
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

