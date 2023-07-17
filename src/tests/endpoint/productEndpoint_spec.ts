import app from "../../index";
import {Product, User} from "../../utilities/types";
import { productsData } from "../../Data/productData";
import {usersData} from "../../Data/userData";
import {TOKEN_SECRET} from "../../config";
const jwt = require('jsonwebtoken');


const request = require('supertest');

describe('Product endpoint tests', function() {

    let id: number;
    let category: string;
    let decoded;
    let token: string;

    beforeEach(async (): Promise<void> => {
        const user: User = usersData[0];
        const response = await request(app)
            .post('/users')
            .send(user)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);

        decoded = await jwt.verify(response.body, TOKEN_SECRET);
        token = response.body;
    })

    afterEach(async (): Promise<void> => {
        const response = await request(app)
            .delete('/users')
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    })

    it('POST /products - should create a product', async () => {
        const product: Product = productsData[0];

        const response = await request(app)
            .post('/products')
            .auth(token, {type: 'bearer'})
            .send(product)
            .set('Accept', 'application/json')
        //expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(200);

        id = response.body.id;
        category = response.body.category;
    });

    it('GET /products - should show all products', async () => {
        const response = await request(app)
            .get('/products')
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });

    it('GET /products/:id - should show a single product', async  () =>  {
        const response = await request(app)
            .get(`/products/${id}`)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });

    it('GET /products/category/:category - should return products that match the category', async () => {
        const response = await request(app)
            .get(`/products/category/${category}`)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });

    it('DELETE /products/:id - should remove a single product', async () =>  {
        const response = await request(app)
            .delete(`/products/${id}`)
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
    });

});




