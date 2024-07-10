import { Decimal } from 'prisma/prisma-client/runtime';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    InMemoryCheckInsRepository
} from '@/repositories/in-memory/in-memory-check-ins.repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';

import { CheckInService } from './check-in.service';
import { MaxDistanceError } from './errors/max-distance.error';
import { MaxNumberCheckInsError } from './errors/max-number-check-ins.error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let systemUnderTesting: CheckInService;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    systemUnderTesting = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -27.2114002,
      longitude: -49.6398757,
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
      userLatitude: -27.2114002,
      userLongitude: -49.6398757,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(22, 0, 20, 8, 0, 0));

    await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2114002,
      userLongitude: -49.6398757,
    });

    await expect(() =>
      systemUnderTesting.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2114002,
        userLongitude: -49.6398757,
      })
    ).rejects.toBeInstanceOf(MaxNumberCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(20, 0, 20, 8, 0, 0));

    await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2114002,
      userLongitude: -49.6398757,
    });

    vi.setSystemTime(new Date(21, 0, 20, 8, 0, 0));

    const { checkIn } = await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2114002,
      userLongitude: -49.6398757,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check-in on a distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-golang",
      title: "GoLang Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-49.3411828),
      longitude: new Decimal(-49.7362561),
      created_at: new Date(),
      updated_at: new Date(),
    });

    await expect(() =>
      systemUnderTesting.execute({
        gymId: "gym-golang",
        userId: "user-01",
        userLatitude: -27.2114002,
        userLongitude: -49.6398757,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
