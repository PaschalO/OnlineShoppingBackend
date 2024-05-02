import { Product } from "../../dataTypes/product";
import { ProductStore } from "../../models/product";
import { productsData } from "../../Data/productData";
import { usersData } from "../../Data/userData";

const store: ProductStore = new ProductStore();

describe("Products Model", (): void => {
	let newProduct: Product | null;
	let productId: number;
	beforeEach(async (): Promise<void> => {
		for (const product of productsData) {
			newProduct = await store.createProduct(product);
		}
	});

	afterEach(async (): Promise<void> => {
		await store.deleteProducts();
		productId = 0;
		newProduct = null;
	});

	describe("should check if the product methods are defined", (): void => {
		// test to check the methods are defined
		it("should have a getAllProducts method", (): void => {
			expect(store.getAllProducts).toBeDefined();
		});

		it("should have a getProductById method", (): void => {
			expect(store.getProductById).toBeDefined();
		});

		it("should have a getProductByCategory method", (): void => {
			expect(store.getProductByCategory).toBeDefined();
		});

		it("should have a getTopFivePopularProduct method", (): void => {
			expect(store.getTopFivePopularProducts).toBeDefined();
		});

		it("should have a create product method", (): void => {
			expect(store.createProduct).toBeDefined();
		});
	});

	describe("should check if there a product exist in the database", (): void => {
		it("should check if the product array is not empty", async (): Promise<void> => {
			const result: Product[] | null = await store.getAllProducts();
			expect(result).not.toBeNull();
			expect(result?.length).toEqual(productsData.length);
		});
	});

	describe("should return a product with a given ID", (): void => {
		it("should check that the requested product that exist in the db is not null", async (): Promise<void> => {
			// @ts-ignore
			productId = newProduct.id;
			const result: Product | null = await store.getProductById(
				productId
			);
			expect(result).not.toBeNull();
		});

		it("it should check if the product properties matches", async (): Promise<void> => {
			// @ts-ignore
			productId = newProduct.id;
			const productArrayLength = productsData.length - 1;
			const result: Product | null = await store.getProductById(
				productId
			);
			if (result) {
				expect(result.name).toEqual(
					productsData[productArrayLength]?.name
				);
				expect(result.price).toEqual(
					productsData[productArrayLength]?.price
				);
				expect(result.category).toEqual(
					productsData[productArrayLength]?.category
				);
				expect(result.description).toEqual(
					productsData[productArrayLength]?.description
				);
				expect(result.image).toEqual(
					productsData[productArrayLength]?.image
				);
				expect(result.in_stock).toEqual(
					productsData[productArrayLength]?.in_stock
				);
			}
		});
	});

	describe("should return products by category", (): void => {
		it("should return product a product in the db with given category", async (): Promise<void> => {
			const category: string = "Electronics";
			const result: Product[] | null = await store.getProductByCategory(
				category
			);
			if (result) {
				for (const product of result) {
					expect(product.category).toEqual(category);
				}
			}
		});

		it("should return null if the category is not in db", async (): Promise<void> => {
			const category: string = "Flectronics";
			const result: Product[] | null = await store.getProductByCategory(
				category
			);
			if (result) {
				for (const product of result) {
					expect(product.category).toBeNull();
				}
			}
		});
	});
});
