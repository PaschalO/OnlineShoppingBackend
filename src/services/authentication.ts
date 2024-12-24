import { User } from "../dataTypes/user";
import Client from "../database";
import bcrypt from "bcrypt";
import { PEPPER, TOKEN_SECRET } from "../config";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken"); // eslint-disable-line
/**
 *  An AuthenticateStore model which authenticates user(s)
 *  @class
 * **/
export class AuthenticateStore {
	async getUserEmail(email: string): Promise<User | null> {
		try {
			const connection = await Client.connect();
			const sql = "SELECT * FROM users WHERE email=($1)";
			const result = await connection.query(sql, [email]);
			connection.release();

			if (result.rows.length > 0) return result.rows[0];

			return null;
		} catch (error) {
			throw new Error(`Could not verify user's email: ${error}`);
		}
	}
}

/**
 * Authenticate - Checks if the user is logging on with the right credentials
 * @async
 * @function authenticate
 * @params {res: Request, res: Response}
 * @returns {Promise<void>}
 */
const authenticate = async (req: Request, res: Response): Promise<void> => {
	const store: AuthenticateStore = new AuthenticateStore();
	const { email, password } = req.body;

	try {
		const user: User | null = await store.getUserEmail(email);

		if (user) {
			if (await bcrypt.compare(password + PEPPER, user.password)) {
				const jwtOptions: { expiresIn: string } = { expiresIn: "1h" };
				// sets password to empty string to avoid sending the client a hashed password
				const token = await jwt.sign(
					{ ...user, password: "" },
					TOKEN_SECRET,
					jwtOptions
				);
				res.status(200).json(token);
				return;
			}
			res.status(400).json({
				message: "The password or email you entered is incorrect"
			});
			return;
		}
		res.status(400).json({
			message:
				"The credentials you entered isn't connected to an account. Find your account and log in"
		});
	} catch (error) {
		res.status(400).json({
			message: ` Authenticating user failed ${error}`
		});
	}
};

export { authenticate };
