**Notes App - Full Stack MERN Application**  

A simple **Notes Management App** with user authentication (JWT), allowing users to create, edit, and delete their notes securely.  

**✨ Features**  
✅ **User Authentication** – Register & Login using JWT  
✅ **Create, Edit, Delete Notes** – Securely manage your notes  
✅ **Private Notes** – Only logged-in users can access their notes  
✅ **Responsive UI** – Built with React (Vite)  
🚧 **In Progress** – Profile & About pages  

**🛠️ Tech Stack**  
**Frontend:**  
- React (Vite)  
- CSS 
- Axios (for API calls)  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (local)  
- JWT (for authentication)  

## **⚙️ Setup Instructions**  

## ⚙️ Environment Variables

Create a `.env` file inside the **`server`** directory with the following content:

NODE_ENV=development
MONGO_URI=YOUR_LOCAL_MONGO_URI
HOST=localhost
PORT=3000
JWT_SECRET=your_jwt_secret_key

> Replace the placeholder values with your actual MongoDB URI and JWT secret.

---

## 🚀 Getting Started (Manual Setup)

### 1. Setup Frontend (React + Vite)

# Navigate to the frontend folder
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
This will start the frontend at: **http://localhost:5173**

**2. Setup Backend (Node.js + Express)**

# Go back to the root directory
cd ..

# Navigate to the backend folder
cd server
Create .env file inside server directory (refer above)

# Install backend dependencies
npm install

# Start the backend server
npm run dev
This will start the backend at: **http://localhost:3000**

✅ Now your full-stack application should be running successfully!
**Open your browser and go to http://localhost:5173 to access the app.**
