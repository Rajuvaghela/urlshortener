
import path from 'path';

import express from 'express';
import {shortnerRoutes} from './routes/shortner.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';


const app = express()

const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
//app.set("views","")
app.use(cookieParser());



app.use(authRoutes);
app.use(shortnerRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});