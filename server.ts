import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method);
  console.log(req.body);
  next();
});

app.post('/users', (req: Request, res: Response) => {
  res.send({name: req.body.name, id: 1});
});

app.listen(3000, () => {
  console.log('Server running');
});
