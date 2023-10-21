const { hash } = require("bcryptjs");

class SessionRepositoryInMemory {
  firstPassword;
  secondPassword;
  thirdPassword;
  password = [];

  users = [];

  async create({ email, password }) {
    const session = this.users.find(
      (user) => user.email === email && user.password === password
    );
    return session;
  }

  async findByEmail(email) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async generatePassword(password) {
    const pass = await hash(password, 8);
    return pass;
  }

  async initialize() {
    this.firstPassword = await this.generatePassword("123");
    this.secondPassword = await this.generatePassword("456");
    this.thirdPassword = await this.generatePassword("123456");

    this.users.push(
      {
        id: 1,
        email: "test@email.com",
        password: this.firstPassword,
      },
      {
        id: 2,
        email: "test2@email.com",
        password: this.secondPassword,
      },
      {
        id: 3,
        email: "tes3t@email.com",
        password: this.thirdPassword,
      }
    );
  }
}

module.exports = SessionRepositoryInMemory;
