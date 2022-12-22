import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
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

import { sync, select } from './void.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const redirectURL = process.env.FRONT_END_URL || 'http://localhost:3000';
const domain = process.env.DOMAIN;
const sessionStore = SQliteStore(session);

app.set('trust proxy', 1)

app.use(cors({
    origin:[redirectURL, 'http://localhost:5000'], 
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
}));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', redirectURL);
    next();
})

let cookiesConfigs = {}
app.use(express.json());
if (domain) cookiesConfigs = {
        sameSite: 'none', 
        secure: true,
        httpOnly: true
    }

app.use(cookieParser())    
app.use(session({
    secret:'review-website',
    resave: false,
    saveUninitialized: false,
    store: new sessionStore({db: 'sessions.db', dir: './'}),
    cookie: cookiesConfigs
}));

app.use(passport.initialize())
app.use(passport.authenticate('session'));
app.use(logger('dev'));

app.use('/', mainRouter);
app.use('/api/auth', authRouter);
app.use('/api/review', mustAuthenticated, reviewRouter);
app.use('/api/comment', commentRouter);
app.use('/api/admin',mustAuthenticated, mustBeAdmin, adminRouter);
app.use('/api/author', mustAuthenticated, authorRouter);
app.use('/api/work', mustAuthenticated, workRouter);

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
            console.log('redirectURL: ', redirectURL);
        })
    } catch (e) {
        console.log(e)
    }
}

start();
