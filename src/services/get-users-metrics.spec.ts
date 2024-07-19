import { beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";

import { GetUserMetricsService } from "./get-user-metrics.service";

let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTesting: GetUserMetricsService;

describe("Get user metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    systemUnderTesting = new GetUserMetricsService(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkInsCount } = await systemUnderTesting.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
