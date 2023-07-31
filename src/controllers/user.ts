import { UserStore } from "../models/user";
import { Request, Response } from "express";
import { User } from "../utilities/types";
import bcrypt from "bcrypt";
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
import { PEPPER, SALT_ROUNDS, TOKEN_SECRET } from "../config";
import { AuthenticateStore } from "../services/authentication";

const store: UserStore = new UserStore();
const authStore: AuthenticateStore = new AuthenticateStore();

/**
 * creates a user from the req.body object. A status code of 200, and the newly created user will be sent to the client if the creation was successful
 *                                          - or a status code of 400 if not successful
 * @async
 * @function createUser
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const passwordDigest: string = await bcrypt.hash(
			req.body.password + PEPPER,
			parseInt(SALT_ROUNDS!)
		);
		// setting role to user. Only admin can make the change on the server
		//const role = 'user';
		const email = req.body.email.toLowerCase();
		const { firstname, lastname, role } = req.body;

		// do not create an account if the user's email exists
		if (await authStore.getUserEmail(email)) {
			res.status(400).json({
				message:
					"This email address is already registered. Please login"
			});
			return;
		}

		const user: User = {
			firstname,
			lastname,
			email,
			password: passwordDigest,
			role: role.toLowerCase()
		};

		const jwtOptions: { expiresIn: string } = { expiresIn: "1h" };

		const newUser: User | null = await store.createUser(user);
		// sets password to empty string to avoid sending the client a hashed password
		const token = await jwt.sign(
			{ ...newUser, password: "" },
			TOKEN_SECRET,
			jwtOptions
		);
		res.status(200).json(token);
	} catch (error) {
		res.status(400).json(error);
	}
};

/**
 * shows all users from the user db - A json object of all users will be sent to the client if successful
 * @async
 * @function showAllUsers
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showAllUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: User[] | null = await store.getAllUsers();
		res.status(200).json(users);
	}
	catch (error) {
		res.status(400).json({message: `unable to show all users ${error}`})
	}
};

/**
 * shows a single user from the user db -  A json object of the queried user will be sent to the client if successful
 * @async
 * @function showSingleUser
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showSingleUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId: number = parseInt(req.params.id);
		const user: User | null = await store.getUserById(userId);
		res.status(200).json(user);
	}
	catch (error) {
		res.status(400).json({message: `unable to show the user ${error}`});
	}
};

/**
 * delete a single user from the user db
 * @async
 * @function deleteUser
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId: number = parseInt(req.params.id);
		await store.deleteUserById(userId);
		res.status(200).send("success");
	}
	catch (error) {
		res.status(400).json({message: `unable to delete user ${error}`});
	}

};

/**
 * delete all users from the user db
 * @async
 * @function deleteAllUsers
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		await store.deleteUsers();
		res.status(200).send("success");
	}
	catch (error) {
		res.status(400).json({message: `unable to delete all users ${error}`});
	}

};

export { showAllUsers, showSingleUser, createUser, deleteAllUsers, deleteUser };
