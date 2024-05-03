/*
 * This file contains the types for the database schema for order
 *
 * */

export type Order = {
	id?: number;
	user_id: number;
	order_status: string;
};
