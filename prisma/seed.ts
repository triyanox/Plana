import prisma from "../lib/prisma";
export default async function seed() {
  await prisma.user.create({
    data: {
      name: "Palana",
      email: "demo@plana.com",
      password: "demodemo",
    },
  });
}
