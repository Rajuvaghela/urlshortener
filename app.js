
import path from 'path';

import express from 'express';
import { shortnerRoutes } from './routes/shortner.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import { verifyAuthentication } from "./middlewares/verify-auth-middleware.js";


const app = express()

const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
//app.set("views","")
app.use(cookieParser());
app.use(
    session(
        { secret: 'my-secret', resave: true, saveUninitialized: false }
    )
);
app.use(flash());
app.use(verifyAuthentication);
app.use((req, res) => {
    res.locals.user = req.user;
    return req.next();
});

app.use(authRoutes);
app.use(shortnerRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});