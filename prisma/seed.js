import { PrismaClient } from "@prisma/client";
import categoryData from "../src/data/categories.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };
import eventData from "../src/data/events.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { categories } = categoryData;
  const { users } = userData;
  const { events } = eventData;

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  //   FINISHED HERE, SOMETHING IS UP WITH EVENTS AND WE NEED TO FIX IT
  // Argument `categoryIds`: Invalid value provided. Expected CategoryUncheckedCreateNestedManyWithoutEventsInput, provided (String).
  // I believe it needs to map over the array

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        image: event.image,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        categories: {
          connect: event.categoryIds.map((id) => ({ id: id })),
        },
        createdBy: {
          connect: { id: event.createdBy },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
