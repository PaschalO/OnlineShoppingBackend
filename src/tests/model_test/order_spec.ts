import { Product } from "../../dataTypes/product";
import { OrderProduct } from "../../dataTypes/orderProduct";
import { Order } from "../../dataTypes/order";
import { OrderStore } from "../../models/order";
import { usersData } from "../../Data/userData";
import { productsData } from "../../Data/productData";
import { UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";
import { OrderProductStore } from "../../services/orderProduct";

const store: OrderStore = new OrderStore();
const userStore: UserStore = new UserStore();
const productStore: ProductStore = new ProductStore();
const orderProductStore: OrderProductStore = new OrderProductStore();

describe("Order Model", (): void => {
	let newOrder: Order | null;
	let addProductToOrder;
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
	let orders = {};

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
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user1.id,
				// @ts-ignore
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user3.id,
				// @ts-ignore
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user2.id,
				// @ts-ignore
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user2.id,
				// @ts-ignore
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user3.id,
				// @ts-ignore
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user3.id,
				// @ts-ignore
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user1.id,
				// @ts-ignore
				order_status: "Completed"
			},
			{
				// @ts-ignore
				user_id: user2.id,
				// @ts-ignore
				order_status: "Completed"
			}
		];

		// extracting the order id into orders variable object
		for (let i = 0; i < ordersData.length; i++) {
			newOrder = await store.createOrder(ordersData[i]);
			// @ts-ignore
			orders[`order${i}`] = newOrder?.id;
		}

		const addProductOrder: OrderProduct[] = [
			{
				// @ts-ignore
				order_id: orders.order1,
				// @ts-ignore
				product_id: product1.id,
				order_quantity: 3
			},
			{
				// @ts-ignore
				order_id: orders.order2,
				// @ts-ignore
				product_id: product2.id,
				order_quantity: 4
			},
			{
				// @ts-ignore
				order_id: orders.order3,
				// @ts-ignore
				product_id: product3.id,
				order_quantity: 1
			},
			{
				// @ts-ignore
				order_id: orders.order4,
				// @ts-ignore
				product_id: product6.id,
				order_quantity: 5
			},
			{
				// @ts-ignore
				order_id: orders.order5,
				// @ts-ignore
				product_id: product7.id,
				order_quantity: 1
			},
			{
				// @ts-ignore
				order_id: orders.order6,
				// @ts-ignore
				product_id: product8.id,
				order_quantity: 6
			}
		];

		for (const addProduct of addProductOrder) {
			addProductToOrder = await orderProductStore.addProductOrder(
				addProduct
			);
		}
	});

	afterAll(async (): Promise<void> => {
		// cleanup
		await orderProductStore.deleteAllOrderProduct();
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
			const result2: Product[] | null =
				await productStore.getTopFivePopularProducts();
			// The below console.log will print out the top 5 popular products. I am unsure how to test it
			//console.log(result2, 'line 189');
		});
		it("should have 5 products in the array", async (): Promise<void> => {
			const result: Product[] | null =
				await productStore.getTopFivePopularProducts();
			expect(result?.length).toEqual(5);
		});
	});
});
