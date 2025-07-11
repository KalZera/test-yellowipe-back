import { InMemoryUserRepository } from "repositories/user/in-memory-user-repository";
import { RegisterUseCase } from "use-cases/user/register-use-case";
import { expect, describe, it, beforeEach } from "vitest";

// set variables to use in tests
let userRepository: InMemoryUserRepository;
let sut: RegisterUseCase;
describe("register use Case", () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepository);
    userRepository.clear();
  });
  it("should be able to register", async () => {
    const user = await sut.execute({
      name: "John Doe",
      password: "123456",
      email: "johnDoe@email.com",
    });
    expect(user).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
        name: "John Doe",
      }),
    });
    expect(user).not.toBeNull();
  });

  it("should not be able to register with same email twice", async () => {
    await sut.execute({
      name: "John Doe",
      password: "123456",
      email: "user1@email.com",
    });
    await expect(() =>
      sut.execute({
        name: "John Doe",
        password: "123456",
        email: "user1@email.com",
      })
    ).rejects.toThrow("User already exists");
  });
});
