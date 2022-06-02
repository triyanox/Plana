import prisma from "../lib/prisma";

const users = [
  {
    name: "John Doe",
    email: "j@gmail.com",
    password: "12345678",
  },
  {
    name: "Jane Doe",
    email: "ja@gmail.com",
    password: "12345678",
  },
  {
    name: "Jack Doe",
    email: "jack@gmail.com",
    password: "12345678",
  },
];

function seed() {
  users.map(async (user) => {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  });
}

seed();
