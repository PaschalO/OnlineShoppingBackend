/*
 *   This is the database configuration file
 *
 * */
import fs from "fs";
import path from "path";

import { Pool } from "pg";
import {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	ENV,
	POSTGRES_TEST_DB,
	AWS_POSTGRES_DB_NAME,
	AWS_POSTGRES_DB_USER,
	AWS_POSTGRES_DB_PASSWORD,
	AWS_POSTGRES_DB_HOSTNAME,
	AWS_POSTGRES_DB_PORT
} from "./config";

let Client!: Pool;

const fullPath = path.resolve(__dirname, "../us-gov-west-1-bundle.pem");

if (ENV === "test") {
	Client = new Pool({
		database: POSTGRES_TEST_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD
	});
}

if (ENV === "dev") {
	Client = new Pool({
		database: POSTGRES_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD
	});
}

if (ENV === "production") {
	Client = new Pool({
		database: AWS_POSTGRES_DB_NAME,
		user: AWS_POSTGRES_DB_USER,
		password: AWS_POSTGRES_DB_PASSWORD,
		host: AWS_POSTGRES_DB_HOSTNAME,
		port: Number(
			ENV === "production"
				? Number(AWS_POSTGRES_DB_PORT)
				: Number(AWS_POSTGRES_DB_PORT)
		),
		ssl: {
			rejectUnauthorized: false,
			ca: fs.readFileSync(fullPath).toString()
		}
	});
}

export default Client;
