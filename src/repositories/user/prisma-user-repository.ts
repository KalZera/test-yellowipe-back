import type { Prisma, User } from "generated/prisma";
import { prisma } from "lib/prisma";
import { UserRepository } from "./user-repository";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
