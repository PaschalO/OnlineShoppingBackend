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
	showTopFivePopularProducts
} from "../controllers/product";

import {
	createOrder,
	showAllOrders,
	showOrderByStatus,
	showSingleOrder
} from "../controllers/order";

import { authenticate } from "../services/authentication";
import { verifyAuthToken } from "../services/verfiyToken";
import { admin } from "../services/admin";
import { addProduct } from "../services/orderProduct";

const routes = (app: express.Application): void => {
	// routes for order
	app.get("/orders", verifyAuthToken, admin, showAllOrders); // admin privileges
	app.get("/orders/:id", verifyAuthToken, showSingleOrder);
	app.get("/orders/users/:id/:status", verifyAuthToken, showOrderByStatus);
	app.post("/orders", verifyAuthToken, admin, createOrder); // admin privileges
	app.post("/orders/quantity", verifyAuthToken, addProduct);

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

	//routers for users
	app.post("/users", createUser); // debatable - need to check if this is necessary
	app.get("/users", verifyAuthToken, admin, showAllUsers); //admin privileges
	app.get("/users/:id", verifyAuthToken, showSingleUser);
	app.delete("/users/:id", verifyAuthToken, admin, deleteUser); // admin privileges
	app.post("/auth/users", authenticate);

};

export default routes;
