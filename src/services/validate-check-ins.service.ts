import { CheckInsRepository } from "@/repositories/check-ins.repository";
import { CheckIn } from "@prisma/client";

import { ResourceNotFoundError } from "./errors/resource-not-found.error";

interface ValidateCheckInsServiceRequest {
  checkInId: string;
}

interface ValidateCheckInsServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInsServiceRequest): Promise<ValidateCheckInsServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
