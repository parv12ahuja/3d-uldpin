import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ulpinRoutes from './ulpinRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/ulpin', ulpinRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully");
        app.listen(3000, () => {
            console.log("API running on http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error("Atlas Connection Failed:", error.message);
        process.exit(1);
    });