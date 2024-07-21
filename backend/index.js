import express from 'express';
import dotenv from 'dotenv';
import dbConnect from "./configuration/dbConnectMongo.js"
import userRoutes from "./routes/userRoutes.js"
dotenv.config();
const app = express();

const PORT = process.env.PORT || 9001;

dbConnect();

app.use(express.json());

app.use('/api/', userRoutes);

app.get('/',(req, res) => {
    res.send({
        message: 'Welcome to the app - MERN e-commerce website'
    });
});

app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}!`);
});

