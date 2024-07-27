import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";

import { CheckInsRepository } from "../check-ins.repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({ data });
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({
      where: { user_id: userId },
    });
  }

  async findByUserIdOrDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
  }

  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: { id },
    });
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async save(checkIn: CheckIn) {
    return await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: checkIn,
    });
  }
}
