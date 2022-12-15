import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import logger from 'morgan';
import SQliteStore from 'connect-sqlite3';

import mainRouter from './routes/main.route.js';
import reviewRouter from "./routes/review.route.js";
import authRouter from "./routes/auth.route.js";
import commentRouter from "./routes/comment.route.js";
import adminRouter from "./routes/admin.route.js";
import authorRouter from "./routes/author.route.js";
import workRouter from "./routes/work.route.js";

import mustAuthenticated from './middleware/authMiddleware.js';
import mustBeAdmin from './middleware/adminMiddleware.js';

import {db, Author, ReviewTag, Review, Comments, Work} from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const sessionStore = SQliteStore(session);

app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(session({
    secret:'review-website',
    resave: false,
    saveUninitialized: false,
    store: new sessionStore({db: 'sessions.db', dir: './'})
}));
app.use(passport.authenticate('session'));
app.use(logger('dev'));

// app.use('/', mainRouter);
app.use('/', (req, res) => {
    console.log('user: ', req.user);
    res.end()
});
app.get('/123', (req, res) => {
    //res.send(Object.keys(req));
    res.send({session: req.session, id: req.sessionID, user: req.user})
})
app.use('/api/auth', authRouter);
app.use('/api/review', mustAuthenticated, reviewRouter);
app.use('/api/comment', commentRouter);
app.use('/api/admin',mustAuthenticated, mustBeAdmin, adminRouter);
app.use('/api/author', mustAuthenticated, authorRouter);
app.use('/api/work', mustAuthenticated, workRouter);

// const {Author, Review, Comments, Work, ReviewTag, Tag} = models;

async function sync() {
    try {
        await db.sync({alter:true})
        console.log('All models have been synchronized');
    } catch(e) {
        console.log(e);
    }
}

async function start() {
    try {

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

// sync();

async function select() {
    
    // const authors = await  Author.findAll({
    //     where: {
    //     email: 'alexskv529@gmail.com'
    //     },
    //     raw: true
    // });
    // const data = JSON.parse(JSON.stringify(authors))
    // console.log(authors);
    // const reviewTags = await ReviewTag.findAll();
    // console.log(JSON.stringify(reviewTags, null, 2));
    
    // await Work.create({
    //     work_name: 'Новый фильм',
    //     category: 'фильмы'
    // });
    // await Review.create({
    //     work_name: 'Новый фильм',
    //     email: 'alexskv529@gmail.com',
    //     review_title: 'Ужасно',
    //     content: 'sdfsddsggsfd',
    //     rate: 3
    // })
    
    // const works = await Work.findAll();
    // const reviews = await Review.findAll();
    // console.log(JSON.stringify(works));
    // console.log('all reviews: ', JSON.stringify(reviews, null, 2));

    // await Comments.create({
    //     comment: 'fsafdsfs',
    //     email: 'alexskv529@gmail.com',
    //     review_id: 1
    // })
    // const comments = await Comments.findAll();
    // console.log(JSON.stringify(comments, null, 2));
}

start();
// select()