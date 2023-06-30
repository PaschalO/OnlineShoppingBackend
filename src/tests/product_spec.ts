import {Product} from "../utilities/types";
import {ProductStore} from "../models/product";

const store: ProductStore = new ProductStore();

describe("Products Model", () => {

    let products: Product[];
    let newProduct: Product | null;
    beforeEach(async (): Promise<void> => {

        products = [
            {
                id: 1,
                name: "Apple Laptop",
                price: 2499.99,
                category: "Electronics",
                description: "A brown laptop with 512GB, 16 RAM etc.",
                image: "https://www.apple.com/ca/shop/buy-mac/macbook-pro/14-inch",
                in_stock: false
            },
            {
                id: 2,
                name: "Microsoft Laptop",
                price: 1999.99,
                category: "Electronics",
                description: "A black laptop with 512GB, 16 RAM etc.",
                image: "https://www.apple.com/ca/shop/buy-mac/macbook-pro/14-inch",
                in_stock: true
            },
        ]

        for (const product of products) {
            newProduct = await store.createProduct(product);
        }
    });

    afterEach(async (): Promise<void> => {
        //console.log('line 27 --  afterEach')
        await store.deleteProducts();
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
            expect(result?.length).toBeGreaterThan(0);
        });
    });

    describe('should check if a product was returned from the database with the given product id', () => {

        it('checks that the requested product that exist in the db is not null', async () => {
            const result: Product | null = await store.getProductById(1);
            expect(result).not.toBeNull();
        });

        it('checks for a product that does not exist in the database, returns null', async () => {
            const result: Product | null = await store.getProductById(5);
            expect(result).toBeNull();
        });

        it('checking if the object value matches', async () => {
            const result: Product | null = await store.getProductById(1);
            expect(result?.id).toEqual(products[0]?.id);
            expect(result?.name).toEqual(products[0]?.name);
            expect(result?.price).toEqual(products[0]?.price);
            expect(result?.category).toEqual(products[0]?.category);
            expect(result?.description).toEqual(products[0]?.description);
            expect(result?.image).toEqual(products[0]?.image);
            expect(result?.in_stock).toEqual(products[0]?.in_stock);
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




