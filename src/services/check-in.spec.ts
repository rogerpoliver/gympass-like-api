import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    InMemoryCheckInsRepository
} from '@/repositories/in-memory/in-memory-check-ins.repository';

import { CheckInService } from './check-in.service';

let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTesting: CheckInService;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    systemUnderTesting = new CheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(22, 0, 20, 8, 0, 0));

    await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      systemUnderTesting.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(20, 0, 20, 8, 0, 0));

    await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(21, 0, 20, 8, 0, 0));

    const { checkIn } = await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
