import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import app from './app.js';

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
