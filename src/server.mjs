import express from 'express'
import session from "express-session";
import RedisStore from "connect-redis";
import 'dotenv/config'
import { createClient } from 'redis';
import passport from "passport";
import { passportConfig } from './utils/passport.mjs';
import { router } from './routes/index.mjs';

const app = express();
const PORT = 4300;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let redisClient = createClient()
redisClient.connect().catch(console.error)
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
})

const SESSION_SECRET = process.env.SESSION_SECRET;
app.use(
    session({
        store: redisStore,
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 1000 * 60 * 10,
        },
    })
);
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})