import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'user1@gmail.com' },
    update: {},
    create: {
      email: 'user1@gmail.com',
      name: 'User 1',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
