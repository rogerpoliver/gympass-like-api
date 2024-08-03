import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

import { SearchGymsService } from "./search-gyms.service";

let gymsRepository: InMemoryGymsRepository;
let systemUnderTesting: SearchGymsService;

describe("Search gyms Use Case", () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository();
		systemUnderTesting = new SearchGymsService(gymsRepository);
	});

	it("should be able to search for gyms", async () => {
		await gymsRepository.create({
			title: "JavaScript Gym",
			latitude: -27.2114002,
			longitude: -49.6398757,
		});

		await gymsRepository.create({
			title: "TypeScript Gym",
			latitude: -27.2114002,
			longitude: -49.6398757,
		});

		await gymsRepository.create({
			title: "GoLang Gym",
			latitude: -27.2114002,
			longitude: -49.6398757,
		});

		const { gyms } = await systemUnderTesting.execute({
			query: "Script",
			page: 1,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: "JavaScript Gym" }),
			expect.objectContaining({ title: "TypeScript Gym" }),
		]);
	});

	it("should be able to fetch paginated gym search", async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Gym Number ${i}`,
				latitude: -27.2114002,
				longitude: -49.6398757,
			});
		}

		const { gyms } = await systemUnderTesting.execute({
			query: "Gym",
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: "Gym Number 21" }),
			expect.objectContaining({ title: "Gym Number 22" }),
		]);
	});
});
