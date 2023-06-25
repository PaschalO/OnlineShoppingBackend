import Client from '../database';
import { User } from "../utilities/types";

export class UserStore {
    async getAllUsers(): Promise<User[] | null> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            if (result.rows.length > 0) return result.rows;

            return null
        }
        catch (error) {
            throw new Error(`Could not find more users`)
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            if (result.rows.length > 0) return result.rows[0];

            return null
        }
        catch (error) {
            throw new Error(`Could not find more users`)
        }
    }

    async createUser(user: User): Promise<User | null> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, email, password, role, created_at, modified_at) VALUES($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
            const result = await connection.query(sql, [user.firstname, user.lastname, user.email, user.password, user.role]);
            connection.release();
            if (result.rows.length > 0) return result.rows[0];

            return null
        }
        catch (error) {
            throw new Error(`Could not add new users ${user}: Error - ${error}`)
        }
    }

    async deleteUsers(): Promise<void> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM users';
            const result = await connection.query(sql);
            connection.release();
        }
        catch (error) {
            throw new Error(`Could not delete the user `);
        }
    }

    async deleteUserById(userId: number): Promise<User | null> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await connection.query(sql, [userId]);
            connection.release();
            if (result.rows.length > 0) return result.rows[0];

            return null
        }
        catch (error) {
            throw new Error(`Could not delete the user by ID`);
        }
    }
}