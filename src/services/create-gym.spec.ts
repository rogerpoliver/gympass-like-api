import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

import { CreateGymService } from "./create-gym.service";

let gymsRepository: InMemoryGymsRepository;
let systemUnderTesting: CreateGymService;

describe("Create Gym Use Case", () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository();
		systemUnderTesting = new CreateGymService(gymsRepository);
	});

	it("should be able to create a gym", async () => {
		const { gym } = await systemUnderTesting.execute({
			title: "JavaScript Gym",
			description: null,
			phone: null,
			latitude: -27.2114002,
			longitude: -49.6398757,
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});
