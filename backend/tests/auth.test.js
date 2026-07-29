require("dotenv").config();

const app = require("../src/app");
const mongoose = require("mongoose");
const request = require("supertest");
const User = require('../src/models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
});
beforeEach(async () => {
    await User.deleteMany({});
});
afterAll(async () => {
    await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
    test("should register a new user successfully", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Bhavya",
                email: "bhavya@example.com",
                password: "Password123"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe(
            "User registered successfully"
        );
    });

    test("should reject a duplicate email", async () => {
        const userData = {
            name: "Bhavya",
            email: "bhavya@example.com",
            password: "Password123"
        };

        await request(app)
            .post("/api/auth/register")
            .send(userData);

        const response = await request(app)
            .post("/api/auth/register")
            .send(userData);

        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe(
            "Email is already registered"
        );
    });
});

describe("POST /api/auth/login", () => {
    const userData = {
        name: "Bhavya",
        email: "bhavya@example.com",
        password: "Password123"
    };

    beforeEach(async () => {
        await request(app)
            .post("/api/auth/register")
            .send(userData);
    });

    test("should log in with valid credentials and return a JWT", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: userData.email,
                password: userData.password
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Login successful");
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe(userData.email);
    });

    test("should reject login with an incorrect password", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: userData.email,
                password: "WrongPassword123"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Invalid email or password");
    });
});