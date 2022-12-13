import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import db from './db.js';
import authRouter from "./routes/auth.route.js";
import reviewRouter from "./routes/review.route.js";
import commentRouter from "./routes/comment.route.js";
import adminRouter from "./routes/admin.route.js";
import authorRouter from "./routes/author.route.js";
import workRouter from "./routes/work.route.js";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*"
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json());
app.use(session({
    secret:'review-website',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.authenticate('session'));
app.use(logger('dev'));
app.use('/api/auth', authRouter);
app.use('/api/review', function(req, res, next) {
    //console.log(req)
    console.log(req.isAuthenticated());
    
    if (req.user) {
        const user = req.user;
        console.log({user});
    }
    const {socket, baseUrl, params, sessionID, login,
        isAuthenticated, cookies, session, logOut, isUnauthenticated,
        signedCookies, sessionStore, logIn, logout} = req;
    //console.log({baseUrl, params, sessionID, login, isAuthenticated, cookies, session, logOut, isUnauthenticated, signedCookies, sessionStore, logIn, logout})
    //console.log(Object.keys(req))
    next()
}, reviewRouter);
app.use('/api/comment', commentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/author', authorRouter);
app.use('/api/work', workRouter);

app.get('/', async (req,res) => {
    res.send(req.user)
})

app.post('/author', async (req,res) => {
    const {name, likes} = req.body;
    const newAuthor = await db.query(`INSERT INTO author (author_name, likes) VALUES ($1, $2) RETURNING *`, [name, likes]);
    res.json(newAuthor.rows[0]);
})

app.post('/work', async(req,res) => {
    const {work} = req.body;
    const newWork = await db.query(`INSERT INTO work (work_name) VALUES ($1) RETURNING *`, [work]);
    res.json(newWork.rows[0])
})

app.post('/review', async(req,res) => {
    const {work, author, title, content, group} = req.body;
    const newReview = await db.query(`INSERT INTO review (work_name, author_name, review_title, content) VALUES ($1, $2, $3, $4) RETURNING *`, [work, author, title, content]);
    res.json(newReview.rows[0]);
})

app.delete('/review/:id', async(req,res) => {
    const id = req.params.id
    const review = await db.query(`DELETE FROM review where review_id = $1`, [id]);
    res.json(review.rows[0]);
})

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