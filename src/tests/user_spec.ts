import { User } from "../utilities/types";
import { UserStore } from "../models/user";

const store: UserStore = new UserStore();

describe("User Model", () => {

    // test to check the methods are defined
    it('should have a getAllUsers method', () => {
        expect(store.getAllUsers).toBeDefined();
    });

    it('should have a getUserById method', () => {
        expect(store.getUserById).toBeDefined();
    });

    it('should have a createUser method', () => {
        expect(store.createUser).toBeDefined();
    });

    let user: User | null;
    let newUser: User | null;
    let deleteUser;
    let id: number;
    beforeEach(async (): Promise<void> => {
        id = 1;
        user = {
            firstname: "Amaka",
            lastname: "Dibo",
            email: "amakadibo@aol.com",
            password: "123456",
            role: "user"
        };
        console.log('line 34')
        newUser = await store.createUser(user);
        console.log(`line 36 ${newUser}`)
    });

    afterEach(async (): Promise<void> => {
        console.log('line 40')
        deleteUser = await store.deleteUsers();
    });

    it('should return a list of users', async (): Promise<void> => {
        const result: User[] | null = await store.getAllUsers();
        // checking that user array is not empty
        expect(result).not.toBeNull()
        expect(result?.length).toBeGreaterThan(0);
    });
    /*
    it('should return a single user', async (): Promise<void> => {
        const result: User | null = await store.getUserById(id);
        console.log(result)
        console.log('line 54')
        // checking that user array is not empty
        expect(result).not.toBeNull()
    });

     */
});

