import type { User } from "generated/prisma";
import { compare } from "bcryptjs";
import type { UserRepository } from "repositories/user/user-repository";

interface RefreshUseCaseRequest {
  id: string;
}

interface RefreshUseCaseResponse {
  user: User;
}

export class RefreshUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    id,
  }: RefreshUseCaseRequest): Promise<RefreshUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return {
      user,
    };
  }
}
