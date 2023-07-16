import {NextFunction, Request, Response} from "express";
import {TOKEN_SECRET} from "../config";

const jwt = require('jsonwebtoken');

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationHeader: string | undefined = req.headers.authorization;
        if (authorizationHeader) {
            const token: string = authorizationHeader.split(' ')[1];
            res.locals = await jwt.verify(token, TOKEN_SECRET)
            next();
        }

        else {
            res.status(400).json({message: 'no authorization header'});
        }

    } catch (error) {
        res.status(400).json({message: `Invalid Token ${error}`});
    }
}

export { verifyAuthToken }