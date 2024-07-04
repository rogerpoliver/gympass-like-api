import { CheckInsRepository } from '@/repositories/check-ins.repository';
import { GymsRepository } from '@/repositories/gyms.repository';
import { CheckIn } from '@prisma/client';

import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // TODO:  calcule a distancia

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
