import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';

import { FetchNearbyGymsService } from './fetch-nearby-gyms.service';

let gymsRepository: InMemoryGymsRepository;
let systemUnderTesting: FetchNearbyGymsService;

describe("Fetch Nearby gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    systemUnderTesting = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      latitude: -27.2114002,
      longitude: -49.6398757,
    });

    await gymsRepository.create({
      title: "Far Gym",
      latitude: -28.2114002,
      longitude: -50.6398757,
    });

    const { gyms } = await systemUnderTesting.execute({
      userLatitude: -27.2114002,
      userLongitude: -49.6398757,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
