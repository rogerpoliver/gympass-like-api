import { CheckInsRepository } from '@/repositories/check-ins.repository';
import { CheckIn } from '@prisma/client';

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOrDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) {
      throw Error();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
