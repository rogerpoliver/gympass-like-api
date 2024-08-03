import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';

import { GetUserProfileService } from '../get-user-profile.service';

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileService(prismaUsersRepository);

  return useCase;
}
