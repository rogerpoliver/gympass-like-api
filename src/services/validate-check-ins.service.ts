import dayjs from "dayjs";

import type { CheckInsRepository } from "@/repositories/check-ins.repository";
import type { CheckIn } from "@prisma/client";

import { LateCheckInValidationError } from "./errors/late-check-in-validation.error";
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

		const timeInMinutesSinceCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			"minutes",
		);

		if (timeInMinutesSinceCheckInCreation > 20) {
			throw new LateCheckInValidationError();
		}

		checkIn.validated_at = new Date();
		await this.checkInsRepository.save(checkIn);

		return {
			checkIn,
		};
	}
}
