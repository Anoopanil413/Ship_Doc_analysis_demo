// config/app.config.js
import express from 'express';
import shipRoutes from '../routes/ship.routes.js';

const configureApp = (app) => {
    // Middleware setup
    app.use(express.json()); // Parses JSON requests

    // Route setup
    app.use('/api/ships', shipRoutes);

    // Any additional route or middleware configurations can go here
    // For example, if you want to add error handling or logging
};

export default configureApp;
