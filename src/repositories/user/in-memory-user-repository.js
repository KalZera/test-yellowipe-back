"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    items = [];
    async findByEmail(email) {
        const user = this.items.find((user) => user.email === email) || null;
        return user;
    }
    async create(data) {
        const user = {
            id: "user-1",
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
exports.InMemoryUserRepository = InMemoryUserRepository;
