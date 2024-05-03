import { User } from "../dataTypes/user";
import { Request, Response } from "express";
import { UserStore } from "../models/user";
import { Product } from "../dataTypes/product";
import { ProductStore } from "../models/product";
import { OrderStore } from "../models/order";
import { OrderProductStore } from "./orderProduct";
import { Order } from "../dataTypes/order";

type Cart = Product & { quantity: number };

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const orderProductStore = new OrderProductStore();

/**
 * Validates the purchase request, creates a new user if not existent, and processes the ordered items.
 *  If the user exists, it directly processes the items. On successful processing, it sends a success response;
 *  otherwise, it sends an error response.
 *
 * @async
 * @function validatePurchase
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const validatePurchase = async (req: Request, res: Response) => {
	const { id: auth0_userId, userInfo, orderedItems, userRole } = req.body;

	try {
		const userExist = await userStore.getUserByAuth0Id(auth0_userId);

		if (!userExist) {
			const user: User = {
				auth0_user_id: auth0_userId,
				firstname: userInfo.firstName,
				lastname: userInfo.lastName,
				email: userInfo.email,
				password: "NONE",
				role: userRole
			};

			const newUser = await userStore.createUser(user);

			if (newUser) {
				await processUserPurchaseItems(newUser, orderedItems);
				res.status(200).json({
					message: "An order has been successfully created"
				});
			}
		} else {
			await processUserPurchaseItems(userExist, orderedItems);
			res.status(200).json({
				message:
					"An order has been successfully created from the else clause"
			});
		}
	} catch (e) {
		res.status(400).json({ message: `product mismatch ${e}` });
	}
};

/**
 * Processes the purchase items for the given user. It handles both single and multiple product purchases.
 *  For multiple products, it iterates over each item and processes them individually.
 *
 * @async
 * @function processUserPurchaseItems
 * @param {User} user - The user object who is making the purchase
 * @param {Cart} itemsPurchase - The items to be purchased, which can be a single item or an array of items.
 * @returns {Promise}
 */

const processUserPurchaseItems = async (user: User, itemsPurchase: Cart) => {
	if (!Array.isArray(itemsPurchase)) {
		return await validateAndProcessProduct(itemsPurchase, user);
	} else {
		console.log(`We have reached the else clause for validateUserPurchase`);
		return await Promise.all(
			itemsPurchase.map((product) =>
				validateAndProcessProduct(product, user)
			)
		);
	}
};

/**
 * Validates and processes the purchase of a single product. It checks if the product exists,
 *  matches the product details with the provided cart item, creates an order, and associates the product
 *  with the order in the database.
 *
 * @async
 * @function validateAndProcessProduct
 * @param {User} user - The user object who is purchasing the product
 * @param {Cart} cart- The cart object containing the product and quantity details
 * @returns {Promise}
 */

const validateAndProcessProduct = async (cart: Cart, user: User) => {
	const { id, name, price, quantity } = cart;
	const clientAmount = price * quantity;

	if (!id) {
		throw new Error(`cart id mismatch`);
	} else {
		const productExists = await productStore.getProductById(id);
		if (!productExists) throw new Error("product mismatch");

		if (productExists.name !== name)
			throw new Error("product name mismatch");

		if (productExists.price !== price)
			throw new Error("product price mismatch");

		if (productExists.price * quantity !== clientAmount)
			throw new Error("product amount mismatch");
		else {
			if (!user.id) {
				throw new Error("user id does not exist");
			} else {
				const order: Order = {
					user_id: user.id,
					order_status: "completed"
				};
				const createdOrder = await orderStore.createOrder(order);

				if (!createdOrder || !createdOrder.id)
					throw new Error("Order creation failed");

				return await orderProductStore.addProductOrder({
					order_id: createdOrder.id,
					product_id: id,
					order_quantity: quantity
				});
			}
		}
	}
};

export { validatePurchase };
