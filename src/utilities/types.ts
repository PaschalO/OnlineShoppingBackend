/*
 * This file contains the types for the database schema
 *
 * */

export type User = {
	id?: number;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	role: string;
};

export type Product = {
	id?: number;
	name: string;
	price: number;
	description: string;
	image: string;
	in_stock: boolean;
	category: string;
};

export type Order = {
	id?: number;
	user_id: number;
	order_status: string;
};

export type OrderProduct = {
	order_id: number;
	product_id: number;
	order_quantity: number;
};
