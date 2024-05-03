/*
 * This file contains the types for the database schema for product
 *
 * */

export type Product = {
	id?: number;
	name: string;
	price: number;
	description: string;
	image: string;
	in_stock: boolean;
	category: string;
};
