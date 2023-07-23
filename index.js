import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
    .connect(
        'mongodb+srv://cocobohd:wwwwww@cluster0.1cvuhkq.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => console.log('DB: OK!'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    const token = jwt.sign(
        {
            email: req.body.email,
            fullName: 'Bohdan Hora',
        },
        'hash123'
    );

    res.json({
        success: true,
        token,
    });
});

app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server: OK!');
});
