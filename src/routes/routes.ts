import express from 'express';
import { showAllUsers, showSingleUser, createUser } from "../controllers/user";
import {
    deleteSingleProduct,
    showAllProducts,
    showProductsByCategory,
    showSingleProduct,
    showTopFivePopularProducts
} from "../controllers/product";

import {showAllOrders, showOrderByStatus, showSingleOrders} from "../controllers/order";


const routes = (app: express.Application) :void => {
    // routes for order
    app.get('/orders', showAllOrders);
    app.get('/orders/:id', showSingleOrders);
    app.get('/orders/:id/status', showOrderByStatus);
    //app.put('/orders/:id/status/');
    //app.put('/orders/:id/quantity');

    //routes for products
    app.get('/products', showAllProducts);
    app.get('/products/:id', showSingleProduct);
    app.get('/products/categories', showProductsByCategory);
    app.get('/products/top5', showTopFivePopularProducts);
    app.delete('/products/:id', deleteSingleProduct);

    //routers for users
    app.get('/users/', showAllUsers);
    app.get('/users/:id', showSingleUser);
    app.post('/users', createUser);
    //app.delete('/users/:id');
    //app.put('/users/:id');
}

export default routes;