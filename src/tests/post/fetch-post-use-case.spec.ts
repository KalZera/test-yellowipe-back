import { InMemoryPostRepository } from "repositories/post/in-memory-post-repository";
import { FetchPostUseCase } from "use-cases/post/fetch-posts-use-cases";
import { expect, describe, it, beforeEach } from "vitest";

// set variables to use in tests
let postRepository: InMemoryPostRepository;
let sut: FetchPostUseCase;
describe("create post use Case", () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    postRepository = new InMemoryPostRepository();
    sut = new FetchPostUseCase(postRepository);
    postRepository.clear();
  });
  it("should get a list of posts ", async () => {
    postRepository.create({
      authorId: "user-id",
      content: "This is a test post",
    });
    postRepository.create({
      authorId: "user-id",
      content: "This is another test post",
    });
    const { posts } = await sut.execute({
      page: 1,
      size: 10,
    });

    expect(posts).toHaveLength(2);
    expect(posts).toEqual([
      expect.objectContaining({
        id: expect.any(Number),
        authorId: "user-id",
        content: "This is a test post",
      }),
      expect.objectContaining({
        id: expect.any(Number),
        authorId: "user-id",
        content: "This is another test post",
      }),
    ]);
  });
  it("should get a list of posts paginated", async () => {
    for (let i = 0; i < 12; i++) {
      postRepository.create({
        authorId: "user-id",
        content: `This is test post ${i}`,
      });
    }

    const { posts } = await sut.execute({
      page: 1,
      size: 10,
    });
    const { posts: postsPaginated } = await sut.execute({
      page: 2,
      size: 10,
    });
    expect(postsPaginated).toHaveLength(2);
  });
});
