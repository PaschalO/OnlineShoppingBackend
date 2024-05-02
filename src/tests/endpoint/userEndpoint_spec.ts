import app from "../../index";
import { User } from "../../dataTypes/user";
import { usersData } from "../../Data/userData";
import { TOKEN_SECRET } from "../../config";
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("User endpoint tests", function (): void {
	let user: User;
	let user2: User;
	let id: number, id2: number;
	let adminDecoded, userDecoded;
	let adminToken: string, userToken: string;

	describe("", () => {
		it("POST /users - should create a user with role - admin. If successful returns a status code of 200", async function (): Promise<void> {
			// user variable has role admin
			user = usersData[0];
			const response = await request(app)
				.post("/users")
				.send(user)
				.set("Accept", "application/json");

			adminDecoded = await jwt.verify(response.body, TOKEN_SECRET);
			adminToken = response.body;

			expect(response.status).toEqual(200);
			expect(adminDecoded.email).toEqual(user.email);
			expect(adminDecoded.firstname).toEqual(user.firstname);
			expect(adminDecoded.lastname).toEqual(user.lastname);
			expect(adminDecoded.role).toEqual("admin");

			id = adminDecoded.id;
		});

		it("POST /users - should create a user with role - user. If successful returns a status code of 200", async function (): Promise<void> {
			// user variable has role admin
			user2 = usersData[2];
			const response2 = await request(app)
				.post("/users")
				.send(user2)
				.set("Accept", "application/json");

			userDecoded = await jwt.verify(response2.body, TOKEN_SECRET);
			userToken = response2.body;

			expect(response2.status).toEqual(200);
			expect(userDecoded.role).toEqual("user");

			id2 = userDecoded.id;
		});
	});

	describe("GET /users - ", () => {
		it("should show all users. If successful returns a status code of 200", async (): Promise<void> => {
			const response = await request(app)
				.get("/users")
				.auth(adminToken, { type: "bearer" })
				.set("Accept", "application/json");
			expect(response.status).toEqual(200);
		});

		it("should try to show all users without jwt token and return a status code of 403", async (): Promise<void> => {
			const response = await request(app)
				.get("/users")
				.set("Accept", "application/json");
			expect(response.status).toEqual(403);
		});
	});

	it("GET /user/:id - should show a user. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.get(`/users/${id}`)
			.auth(adminToken, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("DELETE /user/:id - should delete a user. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.delete(`/users/${id}`)
			.auth(adminToken, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("DELETE /user/:id - should try to delete a user without admin permissions. Should return 401", async (): Promise<void> => {
		const response = await request(app)
			.delete(`/users/${id2}`)
			.auth(userToken, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(401);
	});
});
