import app from "../../index";
import { User } from "../../utilities/types";
import { usersData } from "../../Data/userData";
import { TOKEN_SECRET } from "../../config";
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("User endpoint tests", function () {
	let user: User;
	let id: number;
	let decoded;
	let token: string;

	it("POST /users - should create a user", async function () {
		user = usersData[0];
		const response = await request(app)
			.post("/users")
			.send(user)
			.set("Accept", "application/json");

		decoded = await jwt.verify(response.body, TOKEN_SECRET);
		token = response.body;

		expect(response.status).toEqual(200);
		expect(decoded.email).toEqual(user.email);
		expect(decoded.firstname).toEqual(user.firstname);
		expect(decoded.lastname).toEqual(user.lastname);

		id = decoded.id;
	});

	it("GET /users - should show all users", async () => {
		const response = await request(app)
			.get("/users")
			.auth(token, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("GET /user/:id - should show a user", async () => {
		const response = await request(app)
			.get(`/users/${id}`)
			.auth(token, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("DELETE /user/:id - should delete a user", async () => {
		const response = await request(app)
			.delete(`/users/${id}`)
			.auth(token, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});
});
