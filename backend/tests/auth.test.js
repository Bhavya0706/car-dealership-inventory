require("dotenv").config();

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
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
});