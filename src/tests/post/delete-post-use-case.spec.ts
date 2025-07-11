import { InMemoryPostRepository } from "repositories/post/in-memory-post-repository";
import { DeletePostUseCase } from "use-cases/post/delete-post-use-case";
import { expect, describe, it, beforeEach } from "vitest";

// set variables to use in tests
let postRepository: InMemoryPostRepository;
let sut: DeletePostUseCase;
describe("update post use Case", () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    postRepository = new InMemoryPostRepository();
    sut = new DeletePostUseCase(postRepository);
    postRepository.clear();

    postRepository.create({
      id: 20,
      authorId: "user-id",
      content: "This is a test post",
    });
  });
  it("should be able to delete post use case", async () => {
    await sut.execute({
      postId: 20,
      userId: "user-id",
    });
    const post = await postRepository.findById(20);
    expect(post).toBeNull();
  });
  it("should not be able to delete an post with different user", async () => {
    await expect(() =>
      sut.execute({
        postId: 20,
        userId: "user-incorrect",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to delete an post with not exists", async () => {
    await expect(() =>
      sut.execute({
        postId: 21,
        userId: "user-incorrect",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
