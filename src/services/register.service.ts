import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users.repository";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("Email already in use");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
