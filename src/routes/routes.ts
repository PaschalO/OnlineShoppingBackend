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
	deleteAllUsers,
	deleteUser
} from "../controllers/user";

import {
	createProduct,
	removeAllProducts,
	removeProduct,
	showAllProducts,
	showProductsByCategory,
	showSingleProduct,
	showTopFivePopularProducts
} from "../controllers/product";

import {
	addProduct,
	createOrder,
	deleteOrders,
	showAllOrders,
	showOrderByStatus,
	showSingleOrder
} from "../controllers/order";

import { authenticate } from "../services/authentication";
import { verifyAuthToken } from "../services/verfiyToken";
import { admin } from "../services/admin";

const routes = (app: express.Application): void => {
	// routes for order
	app.get("/orders", verifyAuthToken, showAllOrders);
	app.get("/orders/:id", verifyAuthToken, showSingleOrder);
	app.get("/orders/users/:id/:status", showOrderByStatus);
	app.post("/orders", createOrder);
	app.delete("/orders", deleteOrders);
	app.post("/orders/quantity", addProduct);
	//app.put('/orders/:id/status/');
	//app.put('/orders/:id/quantity');

	//routes for products
	app.post("/products", verifyAuthToken, createProduct);
	app.get("/products", showAllProducts);
	app.get("/products/:id", showSingleProduct);
	app.get("/products/category/:category", showProductsByCategory);
	app.get(
		"/products/product/top-five-popular-products",
		showTopFivePopularProducts
	);
	app.delete("/products/:id", verifyAuthToken, admin, removeProduct); // admin privileges
	app.delete("/products", verifyAuthToken, admin, removeAllProducts); // admin privileges

	//routers for users
	app.post("/users", createUser); // debatable - need to check if this is necessary
	app.get("/users", verifyAuthToken, admin, showAllUsers); //admin privileges
	app.get("/users/:id", verifyAuthToken, showSingleUser);
	app.delete("/users", verifyAuthToken, admin, deleteAllUsers); // admin privileges
	app.delete("/users/:id", verifyAuthToken, admin, deleteUser); // admin privileges
	app.post("/auth/users", authenticate);
	//app.put('/users/:id');
};

export default routes;
