import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import UserDao from './daos/UserDao';
const mongoose = require('mongoose'); // load the mongoose library

import bodyParser from 'body-parser';
import TuitController from './controllers/TuitController';
import TuitDao from './daos/TuitDao';
import LikeController from './controllers/LikeController';
import MessageController from './controllers/MessageController';

require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if(process.env.IS_HEROKU != "true") {
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    const userController = UserController.getInstance(app);
    const tuitController = TuitController.getInstance(app);
    const likeController = LikeController.getInstance(app);
    const messageController = MessageController.getInstance(app);
}

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const PORT = 4000;
app.listen(process.env.PORT || PORT);