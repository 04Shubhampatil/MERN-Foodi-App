import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import connectDB from './db/db.js'
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({
        message:"hello"
    })
});

app.use('/api/user', userRoutes)


app.listen(PORT, () => {
    connectDB().then(() => console.log('Database connected'));
    console.log(`Server running on port port${PORT}`);
});