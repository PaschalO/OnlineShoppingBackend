import { Product } from "../utilities/types";
import {ProductStore} from "../models/product";

const store: ProductStore = new ProductStore();

describe("Products Model", () => {

    // test to check the methods are defined
    it('should have a getAllProducts method', () => {
        expect(store.getAllProducts).toBeDefined();
    });

    it('should have a getProductById method', () => {
        expect(store.getProductById).toBeDefined();
    });

    it('should have a getProductByCategory method', () => {
        expect(store.getProductByCategory).toBeDefined();
    });

    it('should have a getTopFivePopularProduct method', () => {
        expect(store.getTopFivePopularProducts).toBeDefined();
    });

    it ('getAllProducts should return a list of all products or null', async () => {
        const result: Product[] | null = await store.getAllProducts();
        expect(result).toEqual(null);
    })
});




