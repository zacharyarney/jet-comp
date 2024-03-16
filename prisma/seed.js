const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const { parse } = require('csv-parse');

const prisma = new PrismaClient();

async function main() {
  const jets = await fs
    .createReadStream(`${__dirname}/jet_facts.csv`)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async row => {
      await prisma.jet.create({
        data: {
          name: row[0],
          wingspan: parseFloat(row[1]),
          engines: parseInt(row[2]),
          year: parseInt(row[3]),
        },
      });
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
