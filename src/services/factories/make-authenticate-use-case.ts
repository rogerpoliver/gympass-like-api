import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";

import { AuthenticateService } from "../authenticate.service";

export function makeAuthenticateUseCase() {
	const prismaUsersRepository = new PrismaUsersRepository();
	const useCase = new AuthenticateService(prismaUsersRepository);

	return useCase;
}
