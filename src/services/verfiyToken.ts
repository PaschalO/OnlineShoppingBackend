import { NextFunction, Request, Response } from "express";
import { TOKEN_SECRET } from "../config";

const jwt = require("jsonwebtoken");

/**
 * Verifies the user token to make sure they are authorized to the appropriate page
 * @async
 * @function verifyAuthToken
 * @type {res: Request, res: Response}
 * @returns {Promise<void>}
 */

const verifyAuthToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authorizationHeader: string | undefined =
			req.headers.authorization;
		if (authorizationHeader) {
			const token: string = authorizationHeader.split(" ")[1];
			res.locals = await jwt.verify(token, TOKEN_SECRET);
			next();
		} else {
			res.status(403).json({ message: "no authorization header" });
		}
	} catch (error) {
		res.status(403).json({ message: `Invalid Token ${error}` });
	}
};

export { verifyAuthToken };
