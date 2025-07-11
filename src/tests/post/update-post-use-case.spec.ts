import { InMemoryPostRepository } from "repositories/post/in-memory-post-repository";
import { UpdatePostUseCase } from "use-cases/post/update-post-use-case";
import { expect, describe, it, beforeEach } from "vitest";

// set variables to use in tests
let postRepository: InMemoryPostRepository;
let sut: UpdatePostUseCase;
describe("update post use Case", () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    postRepository = new InMemoryPostRepository();
    sut = new UpdatePostUseCase(postRepository);
    postRepository.clear();

    postRepository.create({
      id: 20,
      authorId: "user-id",
      content: "This is a test post",
    });
  });
  it("should be able to update post use case", async () => {
    const post = await sut.execute({
      postId: 20,
      userId: "user-id",
      content: "This is a edit test post",
    });

    expect(post).toEqual({
      post: expect.objectContaining({
        id: 20,
        authorId: "user-id",
        content: "This is a edit test post",
      }),
    });
    expect(post).not.toBeNull();
  });
  it("should not be able to update an post with string empty", async () => {
    await expect(() =>
      sut.execute({
        postId: 20,
        userId: "user-id",
        content: "",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to update an post with diferent user", async () => {
    await expect(() =>
      sut.execute({
        postId: 20,
        userId: "user-incorrect",
        content: "This is a edit test post",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
