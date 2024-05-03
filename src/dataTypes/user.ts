/*
 * This file contains the types for the database schema for user
 *
 * */

export type User = {
	id?: number;
	auth0_user_id?: string; // made this optional because of unit tests as I don't have Auth0 userIDs for unit tests
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
};
