import { PrismaClient } from '@prisma/client';

import { shelterSeed } from './shelter.seed';
import { userSeed } from './user.seed';
import { petSeed } from './pet.seed';

const prisma = new PrismaClient();
Promise.all([userSeed(prisma), shelterSeed(prisma), petSeed(prisma)])
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
