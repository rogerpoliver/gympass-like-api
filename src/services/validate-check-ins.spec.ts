import exp from "constants";
import { Decimal } from "prisma/prisma-client/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";

import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { ValidateCheckInsService } from "./validate-check-ins.service";

let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTesting: ValidateCheckInsService;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    systemUnderTesting = new ValidateCheckInsService(checkInsRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
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
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
