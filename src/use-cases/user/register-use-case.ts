import { hash } from "bcryptjs";
import { User } from "generated/prisma";
import { prisma } from "lib/prisma";
import type { UserRepository } from "repositories/user/user-repository";

interface RegisterUseCaseInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseOutput {
  user: Partial<User>;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    password,
    email,
    name,
  }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const password_hash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash: password_hash,
    });

    return {
      user,
    };
  }
}
