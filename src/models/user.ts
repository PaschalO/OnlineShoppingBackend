import Client from "../database";
import { User } from "../utilities/types";

/**
 *  A UserStore class which contains methods relating to the user schema
 *  @class
 * **/
export class UserStore {
	/**
	 * Gets all users from the User db
	 * @async
	 * @function getAllUsers
	 * @returns {Promise<User[] | null>} - Returns all users from the database or null if a user was not created
	 */
	async getAllUsers(): Promise<User[] | null> {
		try {
			const connection = await Client.connect();
			const sql = "SELECT * FROM users";
			const result = await connection.query(sql);
			connection.release();
			if (result.rows.length > 0) return result.rows;

			return null;
		} catch (error) {
			throw new Error(`Could not show all users: ${error}`);
		}
	}

	/**
	 * Gets a single user from the User db
	 * @async
	 * @function getUserById
	 * @param {number} id - the id of a user
	 * @returns {Promise<User | null>} - Returns a single user from the database or null if the user does not exist
	 */
	async getUserById(id: number): Promise<User | null> {
		try {
			const connection = await Client.connect();
			const sql = "SELECT * FROM users WHERE id=($1)";
			const result = await connection.query(sql, [id]);
			connection.release();
			if (result.rows.length > 0) return result.rows[0];

			return null;
		} catch (error) {
			throw new Error(`Could not show the user: ${error}`);
		}
	}

	/**
	 * Creates user in the User db
	 * @async
	 * @function createUser
	 * @param {Object} user - a user object
	 * @returns {Promise<User | null>} - Returns the newly created user or null if there was an error
	 */
	async createUser(user: User): Promise<User | null> {
		try {
			const connection = await Client.connect();
			const sql =
				"INSERT INTO users (firstname, lastname, email, password, role, created_at, modified_at) VALUES($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *";
			const result = await connection.query(sql, [
				user.firstname,
				user.lastname,
				user.email,
				user.password,
				user.role
			]);
			connection.release();
			if (result.rows.length > 0) return result.rows[0];

			return null;
		} catch (error) {
			throw new Error(`Could not add new users: ${error}`);
		}
	}

	/**
	 * Deletes all users in the User db
	 * @async
	 * @function deleteUsers
	 * @returns {Promise<[]>} - Returns an empty list after the deletion of all users in the Order db
	 */
	async deleteUsers(): Promise<[]> {
		try {
			const connection = await Client.connect();
			const sql = "DELETE FROM users";
			await connection.query(sql);
			connection.release();
			return [];
		} catch (error) {
			throw new Error(`Could not delete the user`);
		}
	}

	/**
	 * Delete a single user in the User db
	 * @async
	 * @function deleteUser
	 * @param {number} userId - the id of a user
	 * @returns {Promise<Product[] | null>} - Returns a list of products after deletion
	 */
	async deleteUserById(userId: number): Promise<User[] | []> {
		try {
			const connection = await Client.connect();
			const sql = "DELETE FROM users WHERE id=($1)";
			const result = await connection.query(sql, [userId]);
			connection.release();
			if (result.rows.length > 0) return result.rows;

			return [];
		} catch (error) {
			throw new Error(`Could not delete the user by ID`);
		}
	}
}
