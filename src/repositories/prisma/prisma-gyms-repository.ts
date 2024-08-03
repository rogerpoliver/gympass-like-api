import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";

import { GymsRepository, UserLocalization } from "../gyms.repository";

export class PrismaGymsRepository implements GymsRepository {
	async create(data: Prisma.GymCreateInput) {
		return await prisma.gym.create({ data });
	}

	async findById(id: string) {
		return await prisma.gym.findUnique({
			where: { id },
		});
	}

	async findManyNearby({ latitude, longitude }: UserLocalization) {
		return await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
            WHERE ( 6371 
                * acos( cos( radians(${latitude}) ) 
                * cos( radians( latitude ) ) 
                * cos( radians( longitude ) - radians(${longitude}) )
                + sin( radians(${latitude}) ) 
                * sin( radians( latitude ) ) ) ) <= 10 
    `;
	}

	async searchMany(query: string, page: number) {
		return await prisma.gym.findMany({
			where: { title: { contains: query } },
			take: 20,
			skip: (page - 1) * 20,
		});
	}
}
