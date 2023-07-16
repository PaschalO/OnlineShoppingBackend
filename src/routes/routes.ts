/*
*
*  THIS FILE CONTAINS ALL THE API ROUTES FOR THE STOREFRONTBACKEND PROJECT
*
* */

import express from 'express';
import {
    showAllUsers,
    showSingleUser,
    createUser,
    deleteAllUsers,
    deleteUser
} from "../controllers/user";

import {
    createProduct, removeAllProducts, removeProduct,
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

import {authenticate} from "../services/authentication";
import {verifyAuthToken} from "../services/verfiyToken";
import {admin} from "../services/admin";


const routes = (app: express.Application): void => {
    // routes for order
    app.get('/orders', verifyAuthToken, showAllOrders);
    app.get('/orders/:id', verifyAuthToken, showSingleOrder);
    //app.get('/orders/:id?order=status', showOrderByStatus);
    app.get('/orders/users/:id/:status', showOrderByStatus);
    app.post('/orders', createOrder);
    //app.put('/orders/:id/status/');
    //app.put('/orders/:id/quantity');

    // orders -> users -> user -> status
    // completed order by user is missing

    //routes for products
    app.post('/products', verifyAuthToken, createProduct);
    app.get('/products', showAllProducts);
    app.get('/products/:id', showSingleProduct);
    //app.get('/products?category=:category', showProductsByCategory);
    app.get('/products/category/:category', showProductsByCategory);
    app.get('/products/product/top-five-popular-products', showTopFivePopularProducts); // needs testing
    app.delete('/products/:id', verifyAuthToken, admin, removeProduct); // admin privileges
    app.delete('/products', verifyAuthToken, admin, removeAllProducts); // admin privileges

    // products?category=:category

    //routers for users
    app.post('/users', createUser); // debatable - need to check if this is necessary
    app.get('/users',  verifyAuthToken, showAllUsers); //admin privileges
    app.get('/users/:id', verifyAuthToken, showSingleUser);
    app.delete('/users', verifyAuthToken, admin, deleteAllUsers); // admin privileges
    app.delete('/users/:id', verifyAuthToken, admin, deleteUser);  // admin privileges

    //app.put('/users/:id');

    app.post('/auth/users', authenticate);
}

export default routes;