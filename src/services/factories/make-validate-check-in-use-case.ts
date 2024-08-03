import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";

import { ValidateCheckInsService } from "../validate-check-ins.service";

export function makeValidateCheckInsUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const useCase = new ValidateCheckInsService(checkInsRepository);

	return useCase;
}
