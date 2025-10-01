import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import connectDB from './db/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRoutes from './Routes/userRoutes.js'
import recipeRoutes from './Routes/recipeRoute.js'
import path from 'path';
const app = express();
const PORT = process.env.PORT || 5500;
const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: "https://mern-foodi-app.onrender.com/",   // your React app’s dev server
  credentials: true                  // allow cookies / auth headers
}));






app.use('/api/user', userRoutes)
app.use('/api/recipe', recipeRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')));
// Fix: Use '*' for catch-all, not '/:path(*)'
app.use((req, res, next) => {
  // if the request is for API, skip
  if (req.path.startsWith('/api')) return next();

  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    connectDB().then(() => console.log('Database connected'));
    console.log(`Server running on port port${PORT}`);
});