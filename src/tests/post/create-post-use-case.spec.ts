import { InMemoryPostRepository } from "repositories/post/in-memory-post-repository";
import { CreatePostUseCase } from "use-cases/post/create-post-use-case";
import { expect, describe, it, beforeEach } from "vitest";

// set variables to use in tests
let postRepository: InMemoryPostRepository;
let sut: CreatePostUseCase;
describe("create post use Case", () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    postRepository = new InMemoryPostRepository();
    sut = new CreatePostUseCase(postRepository);
    postRepository.clear();
  });
  it("should be able to create post use case", async () => {
    const post = await sut.execute({
      authorId: "user-id",
      content: "This is a test post",
    });
    expect(post).toEqual({
      post: expect.objectContaining({
        id: expect.any(Number),
        authorId: "user-id",
        content: "This is a test post",
      }),
    });
    expect(post).not.toBeNull();
  });
  it("should not be able to create an post with string empty", async () => {
    await expect(() =>
      sut.execute({
        authorId: "user-id",
        content: "",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
