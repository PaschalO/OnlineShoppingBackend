import { Request, Response } from "express";
import { ManagementClient } from "auth0";

import {
	Auth0_CLIENT_ID,
	Auth0_ClIENT_SECRET,
	Auth0_DEFAULT_ROLE_ID_FOR_NON_ADMIN_USERS,
	AuthO_DOMAIN_URI
} from "../config";

/**
 * Assigns default roles to a user.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the roles are assigned successfully
 * @throws {Error} - If there is an error in assigning the roles
 */
const assignRolesToUser = async (req: Request, res: Response) => {
	const management = new ManagementClient({
		domain: `${AuthO_DOMAIN_URI}`,
		clientId: `${Auth0_CLIENT_ID}`,
		clientSecret: `${Auth0_ClIENT_SECRET}`
	});

	const userId = { id: req.body.id };
	const defaultUserRole = {
		roles: [`${Auth0_DEFAULT_ROLE_ID_FOR_NON_ADMIN_USERS}`]
	};

	try {
		await management.users.assignRoles(userId, defaultUserRole);
		res.status(200).json({ message: "success" });
	} catch (e) {
		console.log(e, "error in the assigning role to this user");
	}
};

export { assignRolesToUser };
