import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";

import { RegisterService } from "../register.service";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new RegisterService(prismaUsersRepository);

  return useCase;
}
