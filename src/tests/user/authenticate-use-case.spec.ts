import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "repositories/user/in-memory-user-repository";
import { AuthenticateUseCase } from "use-cases/user/authenticate-use-case";

import { expect, describe, it, beforeEach } from "vitest";
// set variables to use in tests
let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("authenticate use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
    // Clear the in-memory user repository before each test
    userRepository.clear();
  });
  it("should be able to authenticate", async () => {
    const email = "johnDoe@email.com";

    userRepository.create({
      name: "John Doe",
      email,
      passwordHash: await hash("123456", 8),
    });

    const userAuthenticated = await sut.execute({
      email,
      password: "123456",
    });

    expect(userAuthenticated).toBeTruthy();
  });

  it("should not authenticate with wrong email ", async () => {
    const email = "johnDoe@email.com";

    userRepository.create({
      name: "John Doe",
      email,
      passwordHash: await hash("123456", 8),
    });

    await expect(
      sut.execute({
        password: await hash("123456", 8),
        email: "user1@email.com",
      })
    ).rejects.toThrow("Invalid credentials");
  });
});
