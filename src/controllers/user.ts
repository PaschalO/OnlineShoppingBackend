import {UserStore} from "../models/user";
import {Request, Response} from "express";
import {User} from "../utilities/types";
import bcrypt from "bcrypt";
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();


import {PEPPER, SALT_ROUNDS, TOKEN_SECRET} from "../config";
import {AuthenticateStore} from "../services/authentication";

const store: UserStore = new UserStore();
const authStore: AuthenticateStore = new AuthenticateStore();
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const passwordDigest: string = await bcrypt.hash(req.body.password + PEPPER, parseInt(SALT_ROUNDS!));
        const { firstname, lastname, role } = req.body;
        const email = req.body.email.toLowerCase();

        // do not create an account if the user's email exists
        if (await authStore.getUserEmail(email)) {
            res.status(400).json({message: 'email address already exists'});
            return;
        }

        const user: User = {
            firstname,
            lastname,
            email,
            password: passwordDigest,
            role
        }

        const jwtOptions = {expiresIn: "1h"};

        const newUser: User | null = await store.createUser(user);
        const token = await jwt.sign({user: newUser}, TOKEN_SECRET, jwtOptions);
        const newUsertoken = {... newUser, token}
        res.status(200).json(newUsertoken);
    }
    catch (err) {
        res.status(400).json(err);
    }
}
const showAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users: User[] | null = await store.getAllUsers();
    res.status(200).json(users);
}

const showSingleUser = async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.id);
    const user: User | null = await store.getUserById(userId);
    res.status(200).json(user);
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.id);
    await store.deleteUserById(userId);
    res.status(200).send('success');
}

const deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
    await store.deleteUsers();
    res.status(200).send('success');
}

export { showAllUsers, showSingleUser, createUser, deleteAllUsers, deleteUser}