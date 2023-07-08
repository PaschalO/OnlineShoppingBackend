import {User} from "../utilities/types";
import { UserStore } from "../models/user";
import { usersData } from "../Data/userData";

const store: UserStore = new UserStore();

describe("User Model", () => {

    let newUser: User | null;

    beforeEach(async function(): Promise<void> {

        for (const user of usersData) {
            newUser = await store.createUser(user);
        }
    });

    afterEach(async (): Promise<void> => {
        await store.deleteUsers();
        newUser = null;
    });

    // test to check the methods are defined
    describe("should check if the User Model methods are defined", () => {
        it('should have a getAllUsers method', () => {
            expect(store.getAllUsers).toBeDefined();
            //console.log('line 34 -- getAllUsers ***');
        });

        it('should have a getUserById method', () => {
            expect(store.getUserById).toBeDefined();
            //console.log('line 39 -- getUserById ***');
        });

        it('should have a createUser method', () => {
            expect(store.createUser).toBeDefined();
        });
    });

    describe("should check if there a user exist in the database", () => {
        it('database has a list of users', async function (): Promise<void> {
            const result: User[] | null = await store.getAllUsers();
            expect(result).not.toBeNull();
            expect(result?.length).toBeGreaterThan(0);
        });
    })

    describe('should check if a single user was returned from the database', () => {

        it('checks that the user array is not empty', async function () {

            // @ts-ignore
            const userId: number =  newUser.id;
            const result: User | null = await store.getUserById(userId);
            expect(result).not.toBeNull();
        });

        it('checks if the user exist', async function () {
            // @ts-ignore
            const userId: number =  newUser.id;
            const result: User | null = await store.getUserById(userId);
            expect(result?.firstname).toEqual(usersData[2]?.firstname);
            expect(result?.lastname).toEqual(usersData[2]?.lastname);
            expect(result?.role).toEqual(usersData[2]?.role);
            expect(result?.email).toEqual(usersData[2]?.email);
        });

        it('checks for a user that does not exist in the database, returns null', async()=> {
            const userId: number = 2000;
            const result: User | null = await store.getUserById(userId);
            expect(result).toBeNull();
        });
    });


    describe("should create a user", (): void => {
        it("checks if the returned result is not null", async (): Promise<void> => {
            const user2: User = {
                firstname: "Sandra",
                lastname: "Williams",
                email: "sandrawilliams@protonmail.com",
                password: "6738903",
                role: "user"
            };
            const result: User | null = await store.createUser(user2);
            expect(result).not.toBeNull();
        });

        it('checks if the user was created and exists', async() => {
            const user2: User = {
                firstname: "Allen",
                lastname: "Abdul",
                email: "allenabdul@aol.com",
                password: "673812",
                role: "user"
            };
            const result: User | null = await store.createUser(user2);
            expect(result?.firstname).toEqual(user2?.firstname);
            expect(result?.lastname).toEqual(user2?.lastname);
            expect(result?.role).toEqual(user2?.role);
            expect(result?.email).toEqual(user2?.email);
        });
    });

    describe("should delete a user by the given id", (): void => {
        it("checks if the returned result is null", async (): Promise<void> => {
            // @ts-ignore
            const userId: number =  newUser.id;
            const result: [] = await store.deleteUserById(userId);
            expect(result).toEqual([]);
        });
    });

});
