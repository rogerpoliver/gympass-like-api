import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";

import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history.service";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryService(checkInsRepository);

  return useCase;
}
