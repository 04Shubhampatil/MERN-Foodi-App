# 🍳 FooRecipe - MERN Stack Recipe Application

A modern, full-stack recipe sharing platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring AI-powered recipe generation using Google Gemini API.

![FooRecipe MERN Stack](https://img.shields.io/badge/FooRecipe-MERN%2520Stack-green)
![React 18.2](https://img.shields.io/badge/React-18.2-blue)
![Express 4.18](https://img.shields.io/badge/Express-4.18-lightgrey)
![MongoDB 7.5](https://img.shields.io/badge/MongoDB-7.5-green)
![Auth JWT](https://img.shields.io/badge/Auth-JWT-orange)

---

## ✨ Features

### 🔐 Authentication & User Management
- Secure JWT-based login/signup
- Protected routes for authenticated users
- User profile management with personalized recipe collections
- Session persistence across browser refreshes

### 🍽️ Recipe Management
- Create & edit recipes with rich text editor
- Image upload via Cloudinary
- Recipe categories & difficulty levels
- Search & filter recipes by ingredients, categories, etc.
- Favorite recipes system for quick access

### 🤖 AI-Powered Features
- Gemini AI integration for smart recipe generation
- Ingredient-based recipe suggestions
- Dietary preference customization
- Automated cooking instructions

### 🎨 Modern UI/UX
- Material-UI components for consistent design
- Tailwind CSS for custom styling
- Fully responsive design
- Dark/light theme support
- Interactive recipe cards with hover effects

### ⚡ Performance & Security
- RESTful API architecture
- Secure password hashing with bcrypt
- Input validation & error handling
- Optimized image loading
- Efficient state management with Redux

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- Redux Toolkit
- React Router
- Material-UI (MUI)
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

**External Services**
- Google Gemini API (AI recipe generation)
- Cloudinary (image storage)
- Multer (file upload handling)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Google Gemini API Key
- Cloudinary Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foorecipe-mern-app.git
   cd foorecipe-mern-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file:
   ```
   PORT=5500
   MONGODB_URI=mongodb://localhost:27017/foorecipe
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   CLIENT_URL=http://localhost:3000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5500
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the Application**
   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory, new terminal)
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```
foorecipe-mern-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── recipeController.js
│   │   └── geminiController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Recipe.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── recipes.js
│   │   └── gemini.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## 🔧 API Endpoints

**Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

**Recipes**
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/recipes/user/:userId` - Get user's recipes

**AI Features**
- `POST /api/gemini/generate` - Generate recipe using AI
- `POST /api/gemini/suggest` - Get recipe suggestions

---

## 🎯 Key Features in Detail

### AI Recipe Generation
- Input ingredients you have
- Specify dietary preferences
- Set cooking time constraints
- Get complete recipes with instructions

### Smart Search
- Search by recipe name
- Filter by ingredients
- Sort by cooking time, difficulty
- Category-based filtering

### User Experience
- Save favorite recipes
- Create personal recipe collections
- Rate and review recipes
- Social sharing capabilities

---

## 🤝 Contributing

We welcome contributions!  
**Steps:**
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🙏 Acknowledgments

- Google Gemini AI for recipe generation
- Material-UI for beautiful components
- Tailwind CSS for utility classes
- Cloudinary for image management

---

## 📞 Support

- Open an issue 
- Contact us at [shubhammanilal204@gmail.com](mailto:support@foorecipe.com)

---

## 🌟 Show your support

Give a ⭐️ if this project helped you!