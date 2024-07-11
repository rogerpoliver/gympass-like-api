import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    InMemoryCheckInsRepository
} from '@/repositories/in-memory/in-memory-check-ins.repository';

import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history.service';

let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTesting: FetchUserCheckInsHistoryService;

describe("Fetch user check ins history Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    systemUnderTesting = new FetchUserCheckInsHistoryService(
      checkInsRepository
    );
  });

  it("should be able to check in", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkIns } = await systemUnderTesting.execute({
      userId: "user-01",
    });

    expect(checkIns).toHaveLength(2);
  });
});
