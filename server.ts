import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import UserDao from './daos/UserDao';
const mongoose = require('mongoose'); // load the mongoose library

import bodyParser from 'body-parser';
mongoose.connect('mongodb://localhost:27017/tuiter', {useNewUrlParser: true, useUnifiedTopology: true}); // connect to the tuiter database


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const userController = new UserController(app, new UserDao());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const PORT = 4000;
app.listen(process.env.PORT || PORT);