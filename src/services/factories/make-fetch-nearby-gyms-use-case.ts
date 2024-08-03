import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { FetchNearbyGymsService } from "../fetch-nearby-gyms.service";

export function makeFetchNearbyGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new FetchNearbyGymsService(gymsRepository);

	return useCase;
}
