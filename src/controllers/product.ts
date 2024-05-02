import { Request, Response } from "express";
import { Product } from "../dataTypes/product";
import { ProductStore } from "../models/product";

const store: ProductStore = new ProductStore();

/**
 * creates an array of products or single product from the req.body object. A status code of 200, and the newly created
 * product will be sent to the client if the creation was successful or a status code of 400 if not successful
 * @async
 * @function createProduct
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const createProduct = async (req: Request, res: Response): Promise<void> => {
	const handleSingleProduct = async (
		productData: Product
	): Promise<Product | null> => {
		try {
			return await store.createProduct({
				name: productData.name,
				price: productData.price,
				category: productData.category,
				description: productData.description,
				image: productData.image,
				in_stock: productData.in_stock
			});
		} catch (error) {
			throw new Error(`unable to create product: ${error}`);
		}
	};

	try {
		// Check if the request body is an array
		if (Array.isArray(req.body)) {
			// Process each product in the array
			await Promise.all(req.body.map(handleSingleProduct));
			res.status(200).json({
				message: "Products have been added successfully"
			});
		} else {
			// Handle a single product
			await handleSingleProduct(req.body);
			res.status(200).json({
				message: "Product has been added successfully"
			});
		}
	} catch (error) {
		res.status(400).json({
			message: `Error processing request: ${error}`
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
	try {
		const products: Product[] | null = await store.getAllProducts();
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({
			message: `unable to show all products ${error}`
		});
	}
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
	try {
		const productId: number = parseInt(req.params.id);
		const product: Product | null = await store.getProductById(productId);
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: `unable to show product ${error}` });
	}
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
	try {
		const productCategory: string = req.params.category.toLowerCase();
		const product: Product[] | null = await store.getProductByCategory(
			productCategory
		);
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({
			message: `unable to filter products by category ${error}`
		});
	}
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
	try {
		const product: Product[] | null =
			await store.getTopFivePopularProducts();
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({
			message: `unable to display the top 5 popular products ${error}`
		});
	}
};

/**
 * delete a single product from the product db
 * @async
 * @function removeProduct
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const removeProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const productId: number = parseInt(req.params.id);
		await store.deleteProduct(productId);
		res.status(200).send("success");
	} catch (error) {
		res.status(400).json({
			message: `unable to delete the product ${error}`
		});
	}
};

const editProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		console.log(req.body, "from the editProduct");
		const { id, name, price, description, category, image, in_stock } =
			req.body;
		const productDetails = await store.updateProduct(id, {
			name,
			price,
			category,
			description,
			image,
			in_stock
		});
		res.status(201).json({ productDetails, message: "success" });
	} catch (error) {
		res.status(400).json({
			message: `unable to delete the product ${error}`
		});
	}
};

export {
	showAllProducts,
	showSingleProduct,
	showProductsByCategory,
	showTopFivePopularProducts,
	removeProduct,
	createProduct,
	editProduct
};
