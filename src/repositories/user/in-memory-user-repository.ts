import { Prisma, User } from "generated/prisma";
import { UserRepository } from "./user-repository";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id) || null;

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email) || null;

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data?.id || "user-1",
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: null,
    };

    this.items.push(user);

    return user;
  }

  clear() {
    this.items = [];
  }
}
