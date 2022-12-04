import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT =process.env.PORT || 5000;

app.use(cors({
    origin: "*"
}));

app.use(express.json({extended: true}));

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