/*
*   This is the database configuration file
*
* */


import {Pool} from "pg";
const dotenv = require('dotenv');
dotenv.config();

import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, ENV, POSTGRES_TEST_DB} from "./config";

let Client!: Pool;

console.log(ENV);
if (ENV === 'test') {
    Client = new Pool( {
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

if (ENV === 'dev') {
    Client = new Pool( {
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
console.log(ENV === 'test')
export default Client;
