import { Decimal } from "prisma/prisma-client/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

import { CheckInService } from "./check-in.service";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let systemUnderTesting: CheckInService;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    systemUnderTesting = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      created_at: new Date(),
      updated_at: new Date(),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLongitude: -49.6398757,
      userLatitude: -27.2114002,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(22, 0, 20, 8, 0, 0));

    await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLongitude: -49.6398757,
      userLatitude: -27.2114002,
    });

    await expect(() =>
      systemUnderTesting.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLongitude: -49.6398757,
        userLatitude: -27.2114002,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(20, 0, 20, 8, 0, 0));

    await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLongitude: -49.6398757,
      userLatitude: -27.2114002,
    });

    vi.setSystemTime(new Date(21, 0, 20, 8, 0, 0));

    const { checkIn } = await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLongitude: -49.6398757,
      userLatitude: -27.2114002,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
