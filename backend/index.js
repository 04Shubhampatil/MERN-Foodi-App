import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import connectDB from './db/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRoutes from './Routes/userRoutes.js'
import recipeRoutes from './Routes/recipeRoute.js'

const app = express();
const PORT = process.env.PORT || 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",   // your React app’s dev server
  credentials: true                  // allow cookies / auth headers
}));

app.get('/', (req, res) => {
    res.json({
        message:"hello"
    })
});

app.use('/api/user', userRoutes)
app.use('/api/recipe', recipeRoutes)


app.listen(PORT, () => {
    connectDB().then(() => console.log('Database connected'));
    console.log(`Server running on port port${PORT}`);
});