const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createTarget(image, name, x, y) {
    return await prisma.target.create({
        data: {
            image, 
            name,
            xCoords: x,
            yCoords: y
        }
    });
}

async function getRandomTargets(limit) {
    return await prisma.$queryRaw`SELECT * FROM "Target" ORDER BY RANDOM() LIMIT ${limit}`;
}

async function isGuessCorrect(name, x, y) {
    const target = await prisma.target.findFirst({
      where: {
        name: name,
        xCoords: { gte: Math.floor(x) - 2, lte: Math.ceil(x) + 2 },
        yCoords: { gte: Math.floor(y) - 5, lte: Math.ceil(y) + 5 },
      }
    });
  
    return target !== null;
}

async function createPlayer(name, score) {
    const existingPlayer = await prisma.player.findUnique({
        where: { name },
        select: { score: true }
    });

    return await prisma.player.upsert({
        where: { name },
        update: {
            score: existingPlayer && score < existingPlayer.score ? score : existingPlayer.score,
        },
        create: { name, score },
    });
}

async function getAllPlayers() {
    return await prisma.player.findMany({
        orderBy: { score: 'asc' },
        take: 5,
    });
}

module.exports = {
    createTarget,
    getRandomTargets,
    isGuessCorrect,
    createPlayer,
    getAllPlayers
};