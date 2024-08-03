import exp from "constants";
import { Decimal } from "prisma/prisma-client/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";

import { LateCheckInValidationError } from "./errors/late-check-in-validation.error";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { ValidateCheckInsService } from "./validate-check-ins.service";

let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTesting: ValidateCheckInsService;

describe("Check In Use Case", () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository();
		systemUnderTesting = new ValidateCheckInsService(checkInsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to validate the check-in", async () => {
		const checkIn = await checkInsRepository.create({
			gym_id: "gym-01",
			user_id: "user-01",
		});

		await systemUnderTesting.execute({ checkInId: checkIn.id });

		expect(checkIn.id).toEqual(expect.any(String));
		expect(checkIn.validated_at).toEqual(expect.any(Date));
	});

	it("should not be able to validate an inexistent check-in", async () => {
		await expect(() =>
			systemUnderTesting.execute({
				checkInId: "test",
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to validade the check-in after 20 minutes of its creation", async () => {
		vi.setSystemTime(new Date(2024, 6, 26, 13, 40));

		const checkIn = await checkInsRepository.create({
			gym_id: "gym-01",
			user_id: "user-01",
		});

		const twentyOneMinutesInMs = 1000 * 60 * 21;
		vi.advanceTimersByTime(twentyOneMinutesInMs);

		await expect(() =>
			systemUnderTesting.execute({
				checkInId: checkIn.id,
			}),
		).rejects.toBeInstanceOf(LateCheckInValidationError);
	});
});
