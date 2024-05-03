/*
 *
 *  THIS FILE CONTAINS ALL THE API ROUTES FOR THE STOREFRONT BACKEND PROJECT
 *
 * */

import express from "express";
import {
	showAllUsers,
	showSingleUser,
	createUser,
	deleteUser
} from "../controllers/user";

import {
	createProduct,
	removeProduct,
	showAllProducts,
	showProductsByCategory,
	showSingleProduct,
	showTopFivePopularProducts,
	editProduct
} from "../controllers/product";

import {
	createOrder,
	showAllOrders,
	showOrderByStatus,
	showSingleOrder
} from "../controllers/order";

import { authenticate } from "../services/authentication";
import { verifyToken } from "../services/verfiyToken";
import { productPermission } from "../Enum/user-permission.enum";
import { admin } from "../services/admin";
import { addProduct } from "../services/orderProduct";
import {
	auth0ValidateToken,
	auth0VerifyPermissions
} from "../middlewares/validateTokenWithAuth0";
import { assignRolesToUser } from "../Auth0/assignRoles";
import { validatePurchase } from "../services/validatePurchase";

/**
 * Sets up the routes for the application.
 *
 * @param {express.Application} app - The Express application instance.
 * @returns {void}
 */
const routes = (app: express.Application): void => {
	// routes for order
	app.get(
		"/orders",
		auth0ValidateToken,
		auth0VerifyPermissions([
			productPermission.updatePermission,
			productPermission.readPermission,
			productPermission.deletePermission,
			productPermission.createPermission
		]),
		showAllOrders
	); // admin privileges
	app.get(
		"/orders/:id",
		auth0ValidateToken,
		auth0VerifyPermissions([
			productPermission.updatePermission,
			productPermission.readPermission,
			productPermission.deletePermission,
			productPermission.createPermission
		]),
		showSingleOrder
	);
	app.get("/orders/users/:id/:status", verifyToken, showOrderByStatus);
	app.post(
		"/orders",
		auth0ValidateToken,
		auth0VerifyPermissions([productPermission.readPermission]),
		createOrder
	); // admin privileges
	app.post(
		"/orders/quantity",
		auth0ValidateToken,
		auth0VerifyPermissions([
			productPermission.updatePermission,
			productPermission.readPermission,
			productPermission.deletePermission,
			productPermission.createPermission
		]),
		addProduct
	);

	//routes for products
	app.post("/products", createProduct);
	app.get("/products", showAllProducts);
	app.get("/products/:id", auth0ValidateToken, showSingleProduct);
	app.get("/products/category/:category", showProductsByCategory);
	app.get(
		"/products/product/top-five-popular-products",
		showTopFivePopularProducts
	);
	app.put(
		"/products",
		auth0ValidateToken,
		auth0VerifyPermissions(productPermission.updatePermission),
		editProduct
	);
	// admin privileges
	app.delete(
		"/products/:id",
		auth0ValidateToken,
		auth0VerifyPermissions([
			productPermission.updatePermission,
			productPermission.readPermission,
			productPermission.deletePermission,
			productPermission.createPermission
		]),
		removeProduct
	); // admin privileges

	//routers for users
	app.post("/users", createUser); // debatable - need to check if this is necessary
	app.get("/users", verifyToken, admin, showAllUsers); //admin privileges
	app.get("/users/:id", verifyToken, showSingleUser);
	app.delete("/users/:id", verifyToken, admin, deleteUser); // admin privileges
	app.post("/auth/users", authenticate);

	app.post("/auth/assign-roles", assignRolesToUser);

	// validate user purchase
	app.post(
		"/checkout/verify-purchase",
		auth0ValidateToken,
		auth0VerifyPermissions([productPermission.readPermission]),
		validatePurchase
	);
};

export default routes;
