// app.js
import express from 'express';
import configureApp from './config/app.config.js';

const app = express();
configureApp(app); 

export default app;
