import {User} from "../utilities/types";
import { UserStore } from "../models/user";

const store: UserStore = new UserStore();

describe("User Model", () => {

    let users: User [];
    let newUser: User | null;

    beforeAll(async (): Promise<void> => {
        users = [
            {
                id: 1,
                firstname: "Amaka",
                lastname: "Dibo",
                email: "amakadibo@aol.com",
                password: "123456",
                role: "user"
            },
            {
                id: 2,
                firstname: "John",
                lastname: "Doe",
                email: "johndoe@aol.com",
                password: "12156",
                role: "user"
            },
            {
                id: 3,
                firstname: "Steven",
                lastname: "Crush",
                email: "stevenCrush@gmail.com",
                password: "121569012",
                role: "user"
            },
            {
                id: 4,
                firstname: "Emma",
                lastname: "Sick",
                email: "sickemma@gmail.com",
                password: "121569012ew",
                role: "user"
            },
            {
                id: 5,
                firstname: "Deez",
                lastname: "Nuts",
                email: "deez@yahoo.com",
                password: "deeznuts1232",
                role: "user"
            }
        ]

        for (const user of users) {
            newUser = await store.createUser(user);
        }
        //console.log('line 21 -- beforeEach')
        //console.log(`line 23 ${newUser}`)
    });

    afterAll(async (): Promise<void> => {
        //console.log('line 27 --  afterEach')
        await store.deleteUsers();
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
            //
        });
    });

    describe("should check if there a user exist in the database", () => {
        it('database has a list of users', async (): Promise<void> => {
            const result: User[] | null = await store.getAllUsers();
            expect(result).not.toBeNull();
            expect(result?.length).toBeGreaterThan(0);
        });
    })

    describe('should check if a single user was returned from the database', () => {

        it('checks that the user array is not empty', async()=> {
            const userId: number = 1;
            const result: User | null = await store.getUserById(userId);
            expect(result).not.toBeNull();
        });

        it('checks if the user exist', async() => {
            const userId: number = 1;
            const result: User | null = await store.getUserById(userId);
            expect(result?.id).toEqual(users[0]?.id);
            expect(result?.firstname).toEqual(users[0]?.firstname);
            expect(result?.lastname).toEqual(users[0]?.lastname);
            expect(result?.role).toEqual(users[0]?.role);
            expect(result?.email).toEqual(users[0]?.email);
        });

        it('checks for a user that does not exist in the database, returns null', async()=> {
            const userId: number = 6;
            const result: User | null = await store.getUserById(userId);
            expect(result).toBeNull();
        });
    });

    describe("should delete a user by the given id", (): void => {
        it("checks if the returned result is null", async (): Promise<void> => {
            const userId: number = 5;
            const result: User | null = await store.deleteUserById(userId);
            expect(result).toBeNull();
        });
    });

    describe("should create a user", (): void => {
        it("checks if the returned result is not null", async (): Promise<void> => {
            const user2: User = {
                id: 7,
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
                id: 8,
                firstname: "Allen",
                lastname: "Abdul",
                email: "allenabdul@aol.com",
                password: "673812",
                role: "user"
            };
            const result: User | null = await store.createUser(user2);
            expect(result?.id).toEqual(user2?.id);
            expect(result?.firstname).toEqual(user2?.firstname);
            expect(result?.lastname).toEqual(user2?.lastname);
            expect(result?.role).toEqual(user2?.role);
            expect(result?.email).toEqual(user2?.email);
        });
    });
});
