/*
 *  This file contains all the necessary configuration variables from the .env file
 *  These variables are exported from the .env file to make it user for typing
 * */
export const {
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_TEST_DB,
	ENV,
	PEPPER,
	SALT_ROUNDS,
	TOKEN_SECRET,
	AuthO_DOMAIN_URI,
	Auth0_AUDIENCE,
	Auth0_ISSUER,
	Auth0_CLIENT_ID,
	Auth0_ClIENT_SECRET,
	Auth0_DEFAULT_ROLE_ID_FOR_NON_ADMIN_USERS
} = process.env;
