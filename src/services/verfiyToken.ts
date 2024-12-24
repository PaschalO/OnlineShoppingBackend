import { NextFunction, Request, Response } from "express";
import { TOKEN_SECRET } from "../config";

const jwt = require("jsonwebtoken"); // eslint-disable-line

/**
 * Verifies the user token to make sure they are authorized to the appropriate page
 * @async
 * @function verifyToken
 * @type {res: Request, res: Response}
 * @returns {Promise<void>}
 */

const verifyToken = async (
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
			res.status(403).json({ message: "jwt token required" });
		}
	} catch (error) {
		res.status(403).json({ message: `Invalid Token ${error}` });
	}
};

export { verifyToken };
