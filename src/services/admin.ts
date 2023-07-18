import Client from "../database";
import { User } from "../utilities/types";
import { NextFunction, Request, Response } from "express";

/**
 *  An AdminStore model which contains methods to admin
 *  @class
 * **/
export class AdminStore {
	/**
	 * Checks to see if the user role is
	 * @async
	 * @function getUserByRole
	 * @params {id: number, role: string} - takes the user id, and the user role
	 * @returns {Promise<User | null>} - Returns a user by specific filter
	 */
	async getUserByRole(id: number, role: string): Promise<User | null> {
		try {
			const connection = await Client.connect();
			const sql =
				"SELECT id, role, firstname, lastname FROM users WHERE id=($1) AND role=($2)";
			const result = await connection.query(sql, [id, role]);
			connection.release();
			if (result.rows.length > 0) return result.rows[0];

			return null;
		} catch (error) {
			throw new Error(`Could not find such user: ${error}`);
		}
	}

	async updateUserRole(id: number): Promise<User | null> {
		try {
			const connection = await Client.connect();
			const sql =
				"SELECT id, role, firstname, lastname FROM users WHERE id=($1)";
			const result = await connection.query(sql, [id]);
			connection.release();
			if (result.rows.length > 0) return result.rows[0];
			return null;
		} catch (error) {
			throw new Error(`Update role failed: ${error}`);
		}
	}
}

/**
 * Admin privileges - Allows the admin to perform operations of an admin in the backend
 * @async
 * @function admin
 * @type {res: Request, res: Response}
 * @returns {Promise<void>}
 */
const admin = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const store: AdminStore = new AdminStore();
	// pass the information to the next function
	const { id, role } = res.locals;
	try {
		const user: User | null = await store.getUserByRole(id, role);
		if (user && user.role === "admin") {
			next();
		} else {
			res.status(401).json({
				message: "You cannot complete this action"
			});
		}
	} catch (error) {
		res.status(401).json({ message: error });
	}
};

export { admin };
