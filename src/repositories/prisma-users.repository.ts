import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository {
  //   constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data });
  }

  async findUnique(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ where });
  }
}
