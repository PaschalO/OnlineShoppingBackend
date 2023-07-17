import app from "../../index";
import {Order, Product, User} from "../../utilities/types";
import {usersData} from "../../Data/userData";
import {TOKEN_SECRET} from "../../config";
import {productsData} from "../../Data/productData";
import {UserStore} from "../../models/user";
import {ProductStore} from "../../models/product";
const request = require('supertest');
const jwt = require('jsonwebtoken');

describe('Order endpoint tests', function() {
    let user: User = usersData[1];
    let product: Product = productsData[1]
    let decoded;
    let token: string;
    let userId: number;
    let productId: number;
    let orderId: number;

    beforeAll(async () => {
        const response = await request(app)
            .post('/users')
            .send(user)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);

        decoded = await jwt.verify(response.body, TOKEN_SECRET);
        token = response.body;

        userId = decoded.id;

        const response2 = await request(app)
            .post('/products')
            .auth(token, {type: 'bearer'})
            .send(product)
            .set('Accept', 'application/json')
        expect(response2.status).toEqual(200);
        console.log(token, 'line 38')

        productId = response2.body.id;
    })

    afterAll(async () => {
        const userStore = new UserStore();
        const productStore = new ProductStore();
        await userStore.deleteUsers();
        await productStore.deleteProducts();

    })

    it('POST /order - should return a successful status code of 200 if the order was successfully created', async function () {

        const order: Order = {
            user_id: userId,
            product_id: productId,
            order_status: "complete",
            order_quantity: 1,
        };


        const response = await request(app)
            .post('/orders')
            .send(order)
            .set('Accept', 'application/json')
        //expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        //expect(response.body.product_id).toEqual(order.product_id);
        //expect(response.body.user_id).toEqual(order.user_id);
        orderId = response.body.id;
        console.log(token, 'line 70')
    });

    it('GET /orders - should show all orders', async () => {
        const response = await request(app)
            .get('/orders')
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });

    it('GET /orders/:id - should show a single order', async  () =>  {

        const response = await request(app)
            .get(`/orders/${userId}`)
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });


    it('DELETE /orders/:id - should remove/delete a single order', async () =>  {
        const response = await request(app)
            .delete(`/orders/${orderId}`)
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });
});




