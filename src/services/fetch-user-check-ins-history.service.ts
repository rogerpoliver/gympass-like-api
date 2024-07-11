import { CheckInsRepository } from '@/repositories/check-ins.repository';
import { CheckIn } from '@prisma/client';

interface FetchUserCheckInsHistoryServiceRequest {
  userId: string;
}

interface FetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[] | null;
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);

    return {
      checkIns,
    };
  }
}
