import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan, { Morgan } from 'morgan';
import helmet from 'helmet';
import Bluebird from 'bluebird';
import HttpStatus from 'http-status';
import dotenv from 'dotenv';
import { MerrorMiddleware, Merror } from 'express-merror';
import UsersRoutes from './routes/users.route';

dotenv.config();

const app = express();

let morganOption = 'dev';
if (process.env.NODE_ENV === 'production') {
    morganOption = 'combined';
}

const middleware = [
    cors(),
    helmet(),
    morgan(morganOption),
    compression(),
    express.json(),
    express.urlencoded({extended: true}),
];

app.use(...middleware);

// Disable powered by header
app.disable('x-powered-by');

// Routes
app.use('/api/users', UsersRoutes);

// Error response handler
app.use(MerrorMiddleware())

export = app;
