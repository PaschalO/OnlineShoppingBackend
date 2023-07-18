import { Request, Response } from "express";
import { Product } from "../utilities/types";
import { ProductStore } from "../models/product";

const store: ProductStore = new ProductStore();

/**
 * creates a product from the req.body object. A status code of 200, and the newly created product will be sent to the client
 *             if the creation was successful or a status code of 400 if not successful
 * @async
 * @function createProduct
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const createProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product: Product = {
			name: req.body.name,
			price: req.body.price,
			category: req.body.category.toLowerCase(),
			description: req.body.description,
			image: req.body.image,
			in_stock: req.body.in_stock
		};

		const newProduct: Product | null = await store.createProduct(product);
		res.status(200).json(newProduct);
	} catch (error) {
		res.status(400).json({
			message: `unable to create a product: ${error}`
		});
	}
};

/**
 * shows a list of all products from the product db - A json object of all products will be sent to the client if successful
 * @async
 * @function showAllProducts
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showAllProducts = async (req: Request, res: Response): Promise<void> => {
	const products: Product[] | null = await store.getAllProducts();
	res.status(200).json(products);
};

/**
 * shows a single product from the product db -  A json object of the queried product will be sent to the client if successful
 * @async
 * @function showSingleProduct
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showSingleProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	const productId: number = parseInt(req.params.id);
	const product: Product | null = await store.getProductById(productId);
	res.status(200).json(product);
};

/**
 * Shows a list of products that matches the category. A json object containing a list of products by the category will be sent to the client
 * @async
 * @function showProductsByCategory
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showProductsByCategory = async (
	req: Request,
	res: Response
): Promise<void> => {
	const productCategory: string = req.params.category;
	// console.log(productCategory, 'line 40 from controller');
	const product: Product[] | null = await store.getProductByCategory(
		productCategory
	);
	// console.log(product, 'line 42 from controller');
	res.status(200).json(product);
};

/**
 * Shows a list of top 5 popular products. A json object containing a list of top 5 popular products will be sent to the client
 * @async
 * @function showTopFivePopularProducts
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showTopFivePopularProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	const product: Product[] | null = await store.getTopFivePopularProducts();
	res.status(200).json(product);
};

/**
 * delete a single product from the product db
 * @async
 * @function removeProduct
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const removeProduct = async (req: Request, res: Response): Promise<void> => {
	const productId: number = parseInt(req.params.id);
	await store.deleteProduct(productId);
	res.status(200).send("success");
};

/**
 * delete all products from the product db
 * @async
 * @function removeAllProducts
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const removeAllProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	await store.deleteProducts();
	res.status(200).send("success");
};

export {
	showAllProducts,
	showSingleProduct,
	showProductsByCategory,
	showTopFivePopularProducts,
	removeProduct,
	createProduct,
	removeAllProducts
};
