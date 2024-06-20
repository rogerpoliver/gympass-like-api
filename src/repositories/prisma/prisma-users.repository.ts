import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../users.repository";

export class PrismaUsersRepository implements UsersRepository {
  //   constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data });
  }

  async findUnique(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ where });
  }
}
