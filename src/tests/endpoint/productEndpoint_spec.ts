import app from "../../index";
import { Product, User } from "../../utilities/types";
import { productsData } from "../../Data/productData";
import { usersData } from "../../Data/userData";
import { TOKEN_SECRET } from "../../config";
const jwt = require("jsonwebtoken");

const request = require("supertest");

describe("Product endpoint tests", function (): void {
	let id: number;
	let category: string;
	let decoded;
	let token: string;
	let userId: number

	beforeEach(async (): Promise<void> => {
		const user: User = usersData[0];
		const response = await request(app)
			.post("/users")
			.send(user)
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);

		decoded = await jwt.verify(response.body, TOKEN_SECRET);
		userId = decoded.id;
		token = response.body;
	});

	afterEach(async (): Promise<void> => {
		const response = await request(app)
			.delete(`/users/${userId}`)
			.auth(token, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	describe('POST /products', () => {
		const product: Product = productsData[0];
		it("should create a product. If successful returns a status code of 200", async (): Promise<void> => {

			const response = await request(app)
				.post("/products")
				.auth(token, { type: "bearer" })
				.send(product)
				.set("Accept", "application/json");
			expect(response.status).toEqual(200);

			id = response.body.id;
			category = response.body.category;
		});

		it("should try to create a product without jwt token return a status code of 403", async (): Promise<void> => {
			const response = await request(app)
				.post("/products")
				.send(product)
				.set("Accept", "application/json");
			expect(response.status).toEqual(403);
		});
	})



	it("GET /products - should show all products. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.get("/products")
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("GET /products/:id - should show a single product. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.get(`/products/${id}`)
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("GET /products/category/:category - should return products that match the category. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.get(`/products/category/${category}`)
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("DELETE /products/:id - should remove a single product. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.delete(`/products/${id}`)
			.auth(token, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});
});
