const { createTarget, createPlayer } = require('./queries');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const targets = [
  {
    name: 'Mantis',
    image: `${IMAGE_BASE_URL}/assets/mantis.jpg`,
    xCoords: 18,
    yCoords: 26,
  },
  {
    name: 'Domino',
    image: `${IMAGE_BASE_URL}/assets/domino.jpg`,
    xCoords: 47,
    yCoords: 36,
  },
  {
    name: 'Wasp',
    image: `${IMAGE_BASE_URL}/assets/wasp.jpg`,
    xCoords: 87,
    yCoords: 77,
  },
  {
    name: 'Nico Minoru',
    image: `${IMAGE_BASE_URL}/assets/nico_minoru.jpg`,
    xCoords: 88,
    yCoords: 60,
  },
  {
    name: 'Lizard',
    image: `${IMAGE_BASE_URL}/assets/lizard.jpg`,
    xCoords: 6.5,
    yCoords: 37,
  },
  {
    name: 'High Evolutionary',
    image: `${IMAGE_BASE_URL}/assets/high_evolutionary.jpg`,
    xCoords: 26,
    yCoords: 12,
  },
  {
    name: 'Jessica Jones',
    image: `${IMAGE_BASE_URL}/assets/jessica_jones.jpg`,
    xCoords: 37,
    yCoords: 73,
  },
  {
    name: 'Spectrum',
    image: `${IMAGE_BASE_URL}/assets/spectrum.jpg`,
    xCoords: 59,
    yCoords: 16,
  },
  {
    name: 'America Chavez',
    image: `${IMAGE_BASE_URL}/assets/america_chavez.jpg`,
    xCoords: 37,
    yCoords: 10,
  },
];

const playerNames = [
  "player1", "player2", "player3", "player4", "player5"
];

async function initializeDb() {
  try {
    console.log('Clearing existing targets...');
    await prisma.target.deleteMany();

    console.log('Clearing existing players...');
    await prisma.player.deleteMany();

    console.log('Clearing complete. Creating data...');
    console.log('Seeding initial targets...');

    for (const target of targets) {
      await createTarget(target.image, target.name, target.xCoords, target.yCoords);
    }

    console.log('Creating 5 initial players...');
    const players = playerNames.map((name) => ({
      name: name,
      score: Math.floor(Math.random() * (200 - 30 + 1)) + 30, // Random score between 30 and 200
    }));

    for (const player of players) {
      await createPlayer(player.name, player.score);
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error during database initialization:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeDb();