import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "repositories/user/in-memory-user-repository";
import { RefreshUseCase } from "use-cases/user/refresh-use-case";

import { expect, describe, it, beforeEach } from "vitest";
// set variables to use in tests
let userRepository: InMemoryUserRepository;
let sut: RefreshUseCase;

describe("authenticate use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RefreshUseCase(userRepository);
    // Clear the in-memory user repository before each test
    userRepository.clear();
  });
  it("should be able to refresh authentication", async () => {
    const id = "user-id";
    userRepository.create({
      id,
      name: "John Doe",
      email: "johnDoe@email.com",
      passwordHash: "hash",
    });

    const userAuthenticated = await sut.execute({
      id,
    });

    expect(userAuthenticated).toBeTruthy();
  });

  it("should not authenticate with wrong id ", async () => {
    const id = "user-id";

    userRepository.create({
      id,
      name: "John Doe",
      email: "johnDoe@email.com",
      passwordHash: "hash",
    });

    await expect(
      sut.execute({
        id: "wrong-id",
      })
    ).rejects.toThrow("Invalid credentials");
  });
});
