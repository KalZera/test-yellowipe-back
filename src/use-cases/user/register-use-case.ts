import { hash } from "bcryptjs";
import { User } from "generated/prisma";
import { prisma } from "lib/prisma";

interface RegisterUseCaseInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseOutput {
  user: Partial<User>;
}

export class RegisterUseCase {
  async execute({
    password,
    email,
    name,
  }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
    const password_hash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password_hash,
      },
    });

    return {
      user,
    };
  }
}
