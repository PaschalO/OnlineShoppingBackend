import app from "../../index";
import { Order, OrderProduct, Product, User } from "../../utilities/types";
import { usersData } from "../../Data/userData";
import { TOKEN_SECRET } from "../../config";
import { productsData } from "../../Data/productData";
import { UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";
import { OrderStore } from "../../models/order";
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("Order endpoint tests", function (): void {
	//save the variables to be shared across suites
	let user: User = usersData[0];
	let product: Product = productsData[0];
	let decoded;
	let token: string;
	let userId: number;
	let productId: number;
	let orderId: number;
	let status: string;

	beforeAll(async (): Promise<void> => {
		// create a user first since order table references user
		const response = await request(app)
			.post("/users")
			.send(user)
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);

		decoded = await jwt.verify(response.body, TOKEN_SECRET);
		//save the variables to be shared across suites
		token = response.body;
		userId = decoded.id;

		// create a product since order table references product
		const response2 = await request(app)
			.post("/products")
			.auth(token, { type: "bearer" })
			.send(product)
			.set("Accept", "application/json");
		expect(response2.status).toEqual(200);

		//save the variables to be shared across suites
		productId = response2.body.id;
	});

	afterAll(async (): Promise<void> => {
		const userStore: UserStore = new UserStore();
		const productStore: ProductStore = new ProductStore();
		const store: OrderStore = new OrderStore();
		await store.deleteAllOrderProduct();
		await store.deleteOrders();
		await userStore.deleteUsers();
		await productStore.deleteProducts();
	});

	it("POST /order - should create an order. If successful returns a status code of 200", async function (): Promise<void> {
		const order: Order = {
			user_id: userId,
			order_status: "complete"
		};

		const response = await request(app)
			.post("/orders")
			.send(order)
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
		orderId = response.body.id;
		status = response.body.order_status;
	});

	it("GET /orders - should show all orders. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.get("/orders")
			.auth(token, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("GET /orders/:id - should show a single order. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.get(`/orders/${userId}`)
			.auth(token, { type: "bearer" })
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("GET /orders/users/:id/:status - should show the status of an order. If successful returns a status code of 200", async (): Promise<void> => {
		const response = await request(app)
			.get(`/orders/users/${userId}/${status}`)
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});

	it("POST /orders/quantity - should create a product order If successful returns a status code of 200 ", async (): Promise<void> => {
		const addProductOrder: OrderProduct = {
			order_id: orderId,
			product_id: productId,
			order_quantity: 3
		};
		const response = await request(app)
			.post("/orders/quantity")
			.send(addProductOrder)
			.set("Accept", "application/json");
		expect(response.status).toEqual(200);
	});
});
