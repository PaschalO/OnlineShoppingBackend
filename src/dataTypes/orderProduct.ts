/*
 * This file contains the types for the database schema for orderProduct
 *
 * */

export type OrderProduct = {
	order_id: number;
	product_id: number;
	order_quantity: number;
};
