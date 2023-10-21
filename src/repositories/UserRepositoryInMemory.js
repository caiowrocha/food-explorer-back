class UserRepositoryInMemory {
  users = [];
  userSession = [
    {
      email: "test@email.com",
      password: "123",
    },
    {
      email: "test2@email.com",
      password: "456",
    },
  ];

  async create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
}
module.exports = UserRepositoryInMemory;
