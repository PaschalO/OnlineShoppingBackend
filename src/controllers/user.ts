import {UserStore} from "../models/user";
import {Request, Response} from "express";
import {User} from "../utilities/types";

const store = new UserStore();

const showAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users: User[] | null = await store.getAllUsers();
    res.status(200).json(users);
}

const showSingleUser = async (req: Request, res: Response): Promise<void> => {
    const userId: number = req.body.id;
    const user: User | null = await store.getUserById(userId);
    res.status(200).json(user)
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        const newUser: User | null = await store.createUser(user);
        res.status(200).json(newUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

export { showAllUsers, showSingleUser, createUser }