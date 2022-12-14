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

app.use('/', mainRouter);
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

async function start() {
    try {

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();