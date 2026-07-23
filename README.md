🚘 Car Dealership Inventory System

<p align="center">
  <strong>A secure full-stack platform for browsing, purchasing, and managing dealership inventory.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js and Express">
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" alt="MongoDB and Mongoose">
  <img src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white" alt="JWT authentication">
  <img src="https://img.shields.io/badge/Status-Completed-2E8B57" alt="Project status">
</p>

A full-stack car dealership inventory application that allows customers to browse, search, filter, and purchase vehicles while providing administrators with secure inventory-management tools.

The project was developed as part of the TDD Kata: Car Dealership Inventory System. It demonstrates REST API development, MongoDB integration, JWT authentication, role-based authorization, responsive React interfaces, inventory operations, and responsible use of AI-assisted development.

✨ Features

👤 Customer Features

Register and log in securely.

Browse the complete vehicle inventory.

Search vehicles by make or model.

Filter vehicles by category and minimum/maximum price.

View detailed information about an individual vehicle.

Purchase an available vehicle.

Automatically reduce stock after a successful purchase.

Prevent purchases when a vehicle is out of stock.

Log out and clear the authenticated session.

🛠️ Administrator Features

Access a protected admin dashboard.

Add new vehicles to the inventory.

Update existing vehicle information.

Delete vehicles.

Restock vehicles with quantity validation.

View current stock levels.

Restrict admin pages and APIs to users with the admin role.

🧰 Tech Stack

🎨 Frontend

React

React Router

JavaScript

HTML5

CSS3

Vite

⚙️ Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Tokens (JWT)

bcrypt

express-validator

🔄 Application Flow

A visitor creates an account or logs in.

The backend verifies the credentials and returns a JWT.

The frontend stores the authenticated user information and token.

Customers can browse, search, filter, view, and purchase vehicles.

A successful purchase decreases the selected vehicle's quantity.

Administrators can access the protected dashboard to manage inventory.

Backend authentication and role middleware protect sensitive operations.

📁 Project Structure

car-dealership-inventory/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── app.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── PROMPTS.md
└── README.md

🚀 Getting Started

✅ Prerequisites

Install the following before running the project:

Node.js (version 18 or later recommended)

npm

MongoDB locally or a MongoDB Atlas connection

Git

1️⃣ Clone the Repository

git clone https://github.com/Bhavya0706/car-dealership-inventory.git
cd car-dealership-inventory

2️⃣ Configure and Run the Backend

cd backend
npm install

Create a .env file inside the backend directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_TEST_URI=your_test_database_connection_string
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173

Use the environment-variable names already referenced by your backend configuration if they differ from the example above.

Start the backend:

npm run dev

The API will normally run at:

http://localhost:5000

3️⃣ Configure and Run the Frontend

Open another terminal:

cd frontend
npm install

Create a .env file inside the frontend directory:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

Open the local URL displayed by Vite, normally:

http://localhost:5173

🔐 Admin Setup

Public registration creates a normal user account. To test administrator functionality:

Register a user through the application.

Open the users collection in MongoDB Compass or MongoDB Atlas.

Change that user's role to:

{
  "role": "admin"
}

Log out and log in again so the newly issued JWT contains the updated role.

Open the Admin Dashboard from the navigation bar.

Frontend route protection improves the user experience, while backend authentication and role authorization provide the actual security.

🌐 API Overview

The exact base URL is:

http://localhost:5000/api

🔑 Authentication

Method

Endpoint

Access

Description

POST

/auth/register

Public

Register a user

POST

/auth/login

Public

Log in and receive a JWT

🚗 Vehicles and Inventory

Method

Endpoint

Access

Description

GET

/cars

Public

Get all vehicles

GET

/cars/search

Public

Search and filter vehicles

GET

/cars/:id

Public

Get one vehicle

POST

/cars

Admin

Add a vehicle

PUT

/cars/:id

Admin

Update a vehicle

DELETE

/cars/:id

Admin

Delete a vehicle

POST

/cars/:id/purchase

Authenticated user

Purchase a vehicle

PATCH

/cars/:id/restock

Admin

Increase vehicle stock

Protected requests must include:

Authorization: Bearer <token>

🔍 Search and Filter Example

GET /api/cars/search?search=tata&category=SUV&minPrice=500000&maxPrice=1500000

Filters may be used separately or together.

🛡️ Validation and Security

Passwords are hashed using bcrypt.

JWTs are used for token-based authentication.

Role middleware protects administrator endpoints.

Vehicle and authentication inputs are validated.

Invalid identifiers and unavailable vehicles return appropriate errors.

Purchase requests cannot reduce stock below zero.

Restock quantities must be positive whole numbers.

Secrets and database credentials are stored in environment variables.


🧪 Testing

Test Command

Run the backend test suite from the backend directory using the test script configured in backend/package.json:

cd backend
npm test



🤖 My AI Usage

- **AI tool used:** ChatGPT
- **Purpose:** Used for understanding requirements, debugging errors, improving code structure, and preparing documentation.
- **Review process:** All AI-generated suggestions were reviewed, tested, and modified before being added to the project.

See [`PROMPTS.md`](./PROMPTS.md) for the complete session-by-session history.

👨‍💻 My Responsibility

I reviewed the suggested code, adapted it to my project structure, connected the individual layers, tested the application, fixed integration problems, and made the final implementation decisions. AI output was treated as assistance rather than as a substitute for understanding the code.

📝 Reflection

AI reduced the time needed to investigate errors and compare implementation approaches. It was particularly useful for explaining unfamiliar behavior and identifying import/export, routing, validation, and frontend state-management problems. At the same time, the project showed that AI-generated suggestions still require manual verification because naming, folder structure, API behavior, and business rules differ between applications.



⚠️ Known Limitations

Public registration creates customer accounts; an administrator role must be assigned directly in the database.

The application currently uses vehicle information without uploaded vehicle images.

Deployment is not included.

Automated test coverage should only be reported after the test suite has been implemented and run.


🌍 Deployment

Live application: Not deployed

👨‍🎓 Author

Bhavya Suthar

GitHub: Bhavya0706

Repository: car-dealership-inventory

📜 Academic Integrity

This project is the author's own implementation, developed with transparent AI assistance. No code was intentionally copied from another developer's repository.

<p align="center">
  Made with 💚 by <strong>Bhavya Suthar</strong>
</p>
