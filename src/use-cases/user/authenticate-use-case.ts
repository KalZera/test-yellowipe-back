import type { User } from "generated/prisma";
import { compare } from "bcryptjs";
import type { UserRepository } from "repositories/user/user-repository";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const doesPasswordMatch = await compare(password, user.passwordHash);

    if (!doesPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      user,
    };
  }
}
