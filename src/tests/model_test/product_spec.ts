import {Product} from "../../utilities/types";
import {ProductStore} from "../../models/product";
import {productsData} from "../../Data/productData";

const store: ProductStore = new ProductStore();

describe("Products Model", () => {

    let newProduct: Product | null;
    let productId: number;
    beforeEach(async (): Promise<void> => {
        for (const product of productsData) {
            newProduct = await store.createProduct(product);
        }
    });

    afterEach(async (): Promise<void> => {
        //console.log('line 27 --  afterEach')
        await store.deleteProducts();
        productId = 0;
        newProduct = null;
    });


    describe("should check if the product methods are defined", () => {
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

        it("should have a create product method", () => {
            expect(store.createProduct).toBeDefined();
        })
    });

    describe("should check if there a product exist in the database", () => {
        it('checks if the product array is not empty', async (): Promise<void> => {
            const result: Product[] | null = await store.getAllProducts();
            expect(result).not.toBeNull();
            expect(result?.length).toBeGreaterThan(1);
        });
    });

    describe('should check if a product was returned from the database with the given product id', () => {

        it('checks that the requested product that exist in the db is not null', async () => {
            // @ts-ignore
            productId = newProduct.id
            const result: Product | null = await store.getProductById(productId);
            expect(result).not.toBeNull();
        });

        it('checking if the object value matches', async () => {
            // @ts-ignore
            productId = newProduct.id
            const result: Product | null = await store.getProductById(productId);
            expect(result?.name).toEqual(productsData[2]?.name);
            expect(result?.price).toEqual(productsData[2]?.price);
            expect(result?.category).toEqual(productsData[2]?.category);
            expect(result?.description).toEqual(productsData[2]?.description);
            expect(result?.image).toEqual(productsData[2]?.image);
            expect(result?.in_stock).toEqual(productsData[2]?.in_stock);
        });
    });

    describe('it should return products by category', () => {
        it('should return product a product in the db with given category', async () => {
            const category: string = 'Electronics'
            const pattern: RegExp = /electronics/i;
            const result: Product[] | null =  await store.getProductByCategory(category);
            if (result) {
                for (const product of result) {
                    expect(product.category).toMatch(pattern);
                }
            }

            else {
                expect(result).toBeNull()
            }
        });

        it('should return null if the category is not in db', async () => {
            const category: string = 'Flectronics'
            const result: Product[] | null =  await store.getProductByCategory(category);
            if (result) {
                for (const product of result) {
                    expect(product.category).toBeNull();
                }
            }
        });
    });
});




