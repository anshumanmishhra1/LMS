import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { connectDb } from './config/db.js';
import jwt from 'jsonwebtoken'; // ✅ Correct import
import User from './models/userSchema.js';

configDotenv(); // ✅ Load env variables

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Connect to DB
connectDb();

app.post('/user/signup', async (req, res) => {
    try {
        const user = req.body;

        if (!user.email || !user.name.firstName || !user.phone || !user.password || !user.age) {
            return res.status(400).send('Something is missing');
        }

        //checking before signup that there is exist a user with the same email?
       
        
        user.password = jwt.sign(
            { data: 'foobar' }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );

        const newUser = new User(user);
        await newUser.save(); 


        res.status(200).send("Signup Successfull");
        console.log(user);

    } catch (error) {
        res.status(500).send(error.message); 
    }
});

app.get('/login', (req, res) => {
    res.status(200).send("hello user");
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
