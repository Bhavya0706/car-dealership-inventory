# 🚘 Car Dealership Inventory System

<p align="center">
  <strong>A full-stack platform for browsing, purchasing, and managing dealership vehicle inventory.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js and Express">
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" alt="MongoDB and Mongoose">
  <img src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Status-Completed-2E8B57" alt="Completed">
</p>

## 📖 About the Project

The **Car Dealership Inventory System** is a full-stack web application that allows customers to browse, search, filter, and purchase available vehicles.

It also provides a protected administrator dashboard through which administrators can add, edit, delete, and restock vehicles.

The application includes JWT authentication, role-based authorization, inventory management, stock control, validation, and a responsive React interface.

---

## ✨ Features

### 👤 Customer Features

- Register a new customer account.
- Log in securely using email and password.
- Browse all available vehicles.
- Search vehicles by make or model.
- Filter vehicles by category.
- Filter vehicles using minimum and maximum prices.
- View complete details of an individual vehicle.
- Purchase an available vehicle.
- Automatically reduce stock after a successful purchase.
- Prevent purchases when a vehicle is out of stock.
- Log out from the application.

### 🛠️ Administrator Features

- Access a protected administrator dashboard.
- Add new vehicles to the inventory.
- Edit existing vehicle information.
- Delete vehicles from the inventory.
- Restock vehicles.
- View the available quantity of every vehicle.
- Restrict administrator pages and APIs to users with the `admin` role.

---

## 🧰 Technologies Used

### 🎨 Frontend

- React
- React Router
- JavaScript
- HTML5
- CSS3
- Vite

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt
- express-validator

### 🛠️ Development Tools

- Git
- GitHub
- Visual Studio Code
- Postman
- MongoDB Compass

---

## 🔄 Application Flow

1. A visitor registers a new account or logs in.
2. The backend verifies the credentials and generates a JWT.
3. The frontend stores the token and authenticated user information.
4. Customers can browse, search, filter, and view vehicles.
5. An authenticated customer can purchase an available vehicle.
6. A successful purchase decreases the vehicle quantity by one.
7. Administrators can access the protected dashboard.
8. Administrators can add, edit, delete, and restock vehicles.
9. Backend middleware protects authenticated and administrator-only operations.

---

## 📁 Project Structure

```text
car-dealership-inventory/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
├── PROMPTS.md
└── README.md
```

> The `.env` files are shown only to explain their required location. They should not be uploaded to GitHub.

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB](https://www.mongodb.com/) or MongoDB Atlas
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bhavya0706/car-dealership-inventory.git
cd car-dealership-inventory
```

### 2️⃣ Install and Run the Backend

Move into the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The backend will normally run at:

```text
http://localhost:5000
```

### 3️⃣ Install and Run the Frontend

Open another terminal and move into the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend application:

```bash
npm run dev
```

Open the URL displayed by Vite. It will normally be:

```text
http://localhost:5173
```

---
## 🔑 Test Administrator Credentials

Use the following account to test administrator features:

```text
Email: bhavya@example.com
Password: Password123
```
```
## 🔐 Administrator Setup

Public registration creates a normal customer account. Follow these steps to create an administrator account:

1. Register a user through the application.
2. Open the users collection in MongoDB Compass or MongoDB Atlas.
3. Find the registered user.
4. Change the user's role to:

```json
{
  "role": "admin"
}
```

5. Log out from the application.
6. Log in again so a new JWT is generated with the updated role.
7. The **Admin Dashboard** option will appear in the navigation bar.



> Frontend route protection controls the user interface, while backend authentication and authorization provide the actual security.

---

## 🌐 API Endpoints

### 🔑 Authentication APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Log in and receive a JWT |

### 🚗 Vehicle APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/cars` | Public | Get all vehicles |
| `GET` | `/api/cars/search` | Public | Search and filter vehicles |
| `GET` | `/api/cars/:id` | Public | Get a vehicle by ID |
| `POST` | `/api/cars` | Admin | Add a new vehicle |
| `PUT` | `/api/cars/:id` | Admin | Update a vehicle |
| `DELETE` | `/api/cars/:id` | Admin | Delete a vehicle |
| `POST` | `/api/cars/:id/purchase` | Authenticated | Purchase a vehicle |
| `PATCH` | `/api/cars/:id/restock` | Admin | Restock a vehicle |

Protected API requests require the following header:

```http
Authorization: Bearer <token>
```

### 🔍 Search and Filter Example

```http
GET /api/cars/search?search=tata&category=SUV&minPrice=500000&maxPrice=1500000
```

The search and filter options can be used separately or together.

---

## 🛡️ Security and Validation

- Passwords are securely hashed using bcrypt.
- JWTs are used for authentication.
- Role-based middleware protects administrator APIs.
- Authentication middleware protects purchase operations.
- User and vehicle input is validated.
- Customers cannot purchase out-of-stock vehicles.
- Stock quantity cannot decrease below zero.
- Restock quantity must be a positive value.
- Secrets and database credentials are stored using environment variables.
- `.env` and `node_modules` are excluded through `.gitignore`.


---

## 🤖 My AI Usage

- **AI tool used:** ChatGPT
- **Purpose:** AI was primarily used to accelerate development within a limited timeframe. It assisted with debugging errors, improving code structure, implementing filters, and creating most of the frontend interface, allowing me to focus more on backend development, authentication, authorization, and core business logic. All AI-generated code was reviewed, tested, and adapted before integration.
  
See [`PROMPTS.md`](./PROMPTS.md) for the session-by-session AI usage history.

---

## ⚠️ Current Limitations

- Public registration only creates customer accounts.
- Administrator roles must currently be assigned directly through the database.
- The application does not use vehicle images.
- Customer purchase history is not currently available.
- The application is not currently deployed.



---

## 👨‍💻 Author

**Bhavya Suthar**

- GitHub: [Bhavya0706](https://github.com/Bhavya0706)
- Repository: [car-dealership-inventory](https://github.com/Bhavya0706/car-dealership-inventory)

---



---

<p align="center">
  Made with 💚 by <strong>Bhavya Suthar</strong>
</p>
