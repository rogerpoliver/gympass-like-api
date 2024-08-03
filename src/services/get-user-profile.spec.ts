import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";

import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { GetUserProfileService } from "./get-user-profile.service";

let usersRepository: InMemoryUsersRepository;
let systemUnderTesting: GetUserProfileService;

describe("Get User Profile Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		systemUnderTesting = new GetUserProfileService(usersRepository);
	});

	it("should be able to get user profile", async () => {
		const fakeUser = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await hash("123456", 6),
		});

		const { user } = await systemUnderTesting.execute({
			userId: fakeUser.id,
		});

		expect(user.name).toEqual("John Doe");
	});

	it("should not be able to get user profile", async () => {
		expect(async () => {
			await systemUnderTesting.execute({
				userId: "invalid-id",
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
