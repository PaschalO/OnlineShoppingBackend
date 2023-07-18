import { User } from "../../utilities/types";
import { UserStore } from "../../models/user";
import { usersData } from "../../Data/userData";

const store: UserStore = new UserStore();

/*
 *  USER MODEL TEST
 *
 * */
describe("User Model", () => {
	let newUser: User | null;

	beforeEach(async function (): Promise<void> {
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
		it("should have a getAllUsers method", () => {
			expect(store.getAllUsers).toBeDefined();
		});

		it("should have a getUserById method", () => {
			expect(store.getUserById).toBeDefined();
			//console.log('line 39 -- getUserById ***');
		});

		it("should have a createUser method", () => {
			expect(store.createUser).toBeDefined();
		});
	});

	describe("should check if there a user exist in the database", () => {
		it("should have a list of all users and the length should be greater zero", async function (): Promise<void> {
			const result: User[] | null = await store.getAllUsers();
			expect(result).not.toBeNull();
			expect(result?.length).toEqual(usersData.length);
		});
	});

	describe("should check if a single user was returned from the database", () => {
		it("should check that the queried user is returned ", async function () {
			// @ts-ignore
			const userId: number = newUser.id;
			const result: User | null = await store.getUserById(userId);
			expect(result).not.toBeNull();
		});

		it("should check if the properties of the user matches", async function () {
			// @ts-ignore
			const userId: number = newUser.id;
			const result: User | null = await store.getUserById(userId);
			expect(result?.firstname).toEqual(usersData[2]?.firstname);
			expect(result?.lastname).toEqual(usersData[2]?.lastname);
			expect(result?.role).toEqual(usersData[2]?.role);
			expect(result?.email).toEqual(usersData[2]?.email);
		});

		it("should return null if query a random user that is not in the database", async () => {
			const userId: number = 2000;
			const result: User | null = await store.getUserById(userId);
			expect(result).toBeNull();
		});
	});

	describe("should create a user", (): void => {
		it("should check if the returned result is not null", async (): Promise<void> => {
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

		it("should compare the properties between the result and our user in the array to see if they match", async () => {
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
		it("should check if the returned result is null", async (): Promise<void> => {
			// @ts-ignore
			const userId: number = newUser.id;
			const result: User[] | [] = await store.deleteUserById(userId);
			expect(result).toEqual([]);
		});
	});
});
