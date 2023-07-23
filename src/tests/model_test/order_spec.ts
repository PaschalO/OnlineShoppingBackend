import { Order, Product, User } from "../../utilities/types";
import { OrderStore } from "../../models/order";
import { usersData } from "../../Data/userData";
import { productsData } from "../../Data/productData";
import { UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";

const store: OrderStore = new OrderStore();
const userStore: UserStore = new UserStore();
const productStore: ProductStore = new ProductStore();

describe("Order Model", (): void => {
	let newOrder: Order | null;
	// @ts-ignore
	let user1, user2, user3;
	let product1,
		product2,
		product3,
		product4,
		product5,
		product6,
		product7,
		product8;

	beforeAll(async (): Promise<void> => {
		// creating the 3 users
		user1 = await userStore.createUser(usersData[0]);
		user2 = await userStore.createUser(usersData[1]);
		user3 = await userStore.createUser(usersData[2]);

		// creating 3 products
		product1 = await productStore.createProduct(productsData[0]);
		product2 = await productStore.createProduct(productsData[1]);
		product3 = await productStore.createProduct(productsData[2]);
		product4 = await productStore.createProduct(productsData[4]);
		product5 = await productStore.createProduct(productsData[5]);
		product6 = await productStore.createProduct(productsData[6]);
		product7 = await productStore.createProduct(productsData[7]);
		product8 = await productStore.createProduct(productsData[8]);

		// order data
		const ordersData: Order[] = [
			{
				// @ts-ignore
				user_id: user1.id,
				// @ts-ignore
				product_id: product1.id,
				order_status: "Completed",
				order_quantity: 3
			},
			{
				// @ts-ignore
				user_id: user1.id,
				// @ts-ignore
				product_id: product2.id,
				order_status: "Completed",
				order_quantity: 4
			},
			{
				// @ts-ignore
				user_id: user3.id,
				// @ts-ignore
				product_id: product3.id,
				order_status: "Completed",
				order_quantity: 1
			},
			{
				// @ts-ignore
				user_id: user2.id,
				// @ts-ignore
				product_id: product1.id,
				order_status: "Completed",
				order_quantity: 2
			},
			{
				// @ts-ignore
				user_id: user2.id,
				// @ts-ignore
				product_id: product4.id,
				order_status: "Completed",
				order_quantity: 10
			},
			{
				// @ts-ignore
				user_id: user3.id,
				// @ts-ignore
				product_id: product5.id,
				order_status: "Complete",
				order_quantity: 1
			},
			{
				// @ts-ignore
				user_id: user3.id,
				// @ts-ignore
				product_id: product6.id,
				order_status: "Completed",
				order_quantity: 5
			},
			{
				// @ts-ignore
				user_id: user1.id,
				// @ts-ignore
				product_id: product7.id,
				order_status: "Completed",
				order_quantity: 1
			},
			{
				// @ts-ignore
				user_id: user2.id,
				// @ts-ignore
				product_id: product8.id,
				order_status: "Completed",
				order_quantity: 6
			}
		];

		for (const order of ordersData) {
			newOrder = await store.createOrder(order);
		}
	});

	afterAll(async (): Promise<void> => {
		await store.deleteOrders();
		await userStore.deleteUsers();
		await productStore.deleteProducts();

		//resetting all the variables
		user1 = null;
		user2 = null;
		user3 = null;
		product1 = null;
		product2 = null;
		product3 = null;
		newOrder = null;
	});

	describe("should check that Order Model methods are defined", (): void => {
		it("should have a getAllOrders method", (): void => {
			expect(store.getAllOrders).toBeDefined();
		});

		it("should have a getProductById method", (): void => {
			expect(store.getOrderByUserId).toBeDefined();
		});

		it("should have a getAllOrderByStatus method", (): void => {
			expect(store.getAllOrderByStatus).toBeDefined();
		});
	});

	describe("should return a list of all orders", (): void => {
		it("should check if the order array is not empty", async (): Promise<void> => {
			const result: Order[] | null = await store.getAllOrders();
			expect(result).not.toBeNull();
			expect(result?.length).toBeGreaterThan(2);
		});
	});

	describe("should check if a order was returned from the database with the given order id", (): void => {
		it("should checks that the returned order by ID is not null", async (): Promise<void> => {
			// @ts-ignore
			const userId: number = user1.id;
			const result: Order | null = await store.getOrderByUserId(userId);
			expect(result).not.toBeNull();
		});

		it("should check for an order that was never made, returns null", async (): Promise<void> => {
			const userId: number = 5;
			const result: Order | null = await store.getOrderByUserId(userId);
			expect(result).toBeNull();
		});
	});

	describe("should return a list of orders by status", () => {
		it("should return an array of user orders by status", async (): Promise<void> => {
			const status: string = "Completed";
			const pattern: RegExp = /completed/i;
			// @ts-ignore
			const userId: number = user1.id;
			const result: Order[] | null = await store.getAllOrderByStatus(
				userId,
				status
			);

			if (result) {
				for (const order of result) {
					expect(order.order_status).toMatch(pattern);
				}
			}
		});
	});

	describe("should test for 5 popular products", () => {
		it("should return an array of top 5 popular products", async (): Promise<void> => {
			const result: Product[] | null =
				await productStore.getTopFivePopularProducts();
			// The below console.log will print out the top 5 popular products. I am unsure how to test it
			//console.log(result);
		});
		it("should have 5 products in the array", async (): Promise<void> => {
			const result: Product[] | null =
				await productStore.getTopFivePopularProducts();
			expect(result?.length).toEqual(5);
		});
	});
});
