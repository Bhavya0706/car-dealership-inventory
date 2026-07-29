require("dotenv").config();

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app");
const Car = require("../src/models/car");

const sampleCars = [
    {
        make: "Tata",
        model: "Nexon",
        category: "SUV",
        year: 2025,
        price: 899000,
        quantity: 4,
        fuelType: "Petrol"
    },
    {
        make: "Honda",
        model: "City",
        category: "Sedan",
        year: 2025,
        price: 1199000,
        quantity: 2,
        fuelType: "Petrol"
    }
];

const createToken = (role) => jwt.sign(
    { id: new mongoose.Types.ObjectId().toString(), role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
});

beforeEach(async () => {
    await Car.deleteMany({});
    await Car.insertMany(sampleCars);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Car API", () => {

    test("should return all cars", async () => {
        const response = await request(app).get("/api/cars");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Cars retrieved successfully");
        expect(response.body.cars).toHaveLength(2);
    });

    test("should return a car by its ID", async () => {
        const car = await Car.findOne({ model: "Nexon" });
        const response = await request(app).get(`/api/cars/${car._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.car.model).toBe("Nexon");
    });

    test("should return 404 when the car does not exist", async () => {
        const missingId = new mongoose.Types.ObjectId();
        const response = await request(app).get(`/api/cars/${missingId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Car not found");
    });

    test("should return cars matching a search query", async () => {
        const response = await request(app).get("/api/cars/search?search=nexon");

        expect(response.statusCode).toBe(200);
        expect(response.body.cars).toHaveLength(1);
        expect(response.body.cars[0].model).toBe("Nexon");
    });

    test("should filter cars by category", async () => {
        const response = await request(app).get("/api/cars/search?category=Sedan");

        expect(response.statusCode).toBe(200);
        expect(response.body.cars).toHaveLength(1);
        expect(response.body.cars[0].make).toBe("Honda");
    });

    test("should filter cars within a price range", async () => {
        const response = await request(app)
            .get("/api/cars/search?minPrice=800000&maxPrice=1000000");

        expect(response.statusCode).toBe(200);
        expect(response.body.cars).toHaveLength(1);
        expect(response.body.cars[0].model).toBe("Nexon");
    });

    test("should reject an invalid price range", async () => {
        const response = await request(app)
            .get("/api/cars/search?minPrice=1000000&maxPrice=500000");

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");
    });

    test("should reject adding a car without an authentication token", async () => {
        const response = await request(app)
            .post("/api/cars")
            .send(sampleCars[0]);

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Authentication required");
    });

    test("should reject a customer trying to add a car", async () => {
        const customerToken = createToken("customer");

        const response = await request(app)
            .post("/api/cars")
            .set("Authorization", `Bearer ${customerToken}`)
            .send(sampleCars[0]);

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe(
            "You are not authorized to perform this action"
        );
    });

    test("should allow an admin to add a valid car", async () => {
        const adminToken = createToken("admin");

        const newCar = {
            make: "Mahindra",
            model: "XUV700",
            category: "SUV",
            year: 2025,
            price: 1499000,
            quantity: 3,
            fuelType: "Diesel"
        };

        const response = await request(app)
            .post("/api/cars")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(newCar);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Car added successfully");
        expect(response.body.car.model).toBe("XUV700");
    });

    test("admin should not be able to add a car with negative quantity", async()=>{
        const adminToken = createToken('admin');
        const newcar = {
            make: "Mahindra",
            model: "XUV700",
            category: "SUV",
            year: 2025,
            price: 1499000,
            quantity: -3,
            fuelType: "Diesel"
        };

        const response = await request(app)
        .post("/api/cars")
        .set("Authorization",`Bearer ${adminToken}` )
        .send(newcar);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Validation failed");


    })
});