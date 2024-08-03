import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository';

import { GetUserMetricsService } from '../get-user-metrics.service';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsService(checkInsRepository);

  return useCase;
}
