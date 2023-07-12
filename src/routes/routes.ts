import express from 'express';
import {
    showAllUsers,
    showSingleUser,
    createUser,
    deleteAllUsers,
    deleteUser
} from "../controllers/user";

import {
    createProduct, removeProduct,
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


const routes = (app: express.Application): void => {
    // routes for order
    app.get('/orders', showAllOrders);
    app.get('/orders/:id', showSingleOrder);
    app.get('/orders/:id/status', showOrderByStatus);
    app.post('/order', createOrder);
    //app.put('/orders/:id/status/');
    //app.put('/orders/:id/quantity');

    //routes for products
    app.post('/products', verifyAuthToken, createProduct);
    app.get('/products', showAllProducts);
    app.get('/products/:id', showSingleProduct);
    app.get('/products?products=category', showProductsByCategory);
    app.get('/products/:top5', showTopFivePopularProducts);
    app.delete('/products/:id', removeProduct);

    //routers for users
    app.get('/users',  showAllUsers);
    app.get('/users/:id', showSingleUser);
    app.post('/users', createUser);
    app.delete('/users', deleteAllUsers);
    app.delete('/users/:id', deleteUser);

    //app.put('/users/:id');

    app.post('/auth/users', authenticate);
}

export default routes;