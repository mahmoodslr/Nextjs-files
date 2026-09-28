import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");

const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting seed...");

  const products = await prisma.product.createMany({
    data: [
      {
        name: "Gaming Mouse",
        description: "Lightweight mouse with precise tracking for gaming.",
        price: 850000,
        category: "Mouse",
        image: "/products/mouse.jpg",
      },
      {
        name: "Mechanical Keyboard",
        description: "Compact mechanical keyboard with a comfortable design.",
        price: 1450000,
        category: "Keyboard",
        image: "/products/keyboard.jpg",
      },
      {
        name: "Gaming Headset",
        description: "Clear audio with a comfortable design for long sessions.",
        price: 1200000,
        category: "Headset",
        image: "/products/headset.jpg",
      },
      {
        name: "Wireless Controller",
        description:
          "Responsive wireless controller for gaming and entertainment.",
        price: 1750000,
        category: "Controller",
        image: "/products/controller.jpg",
      },
      {
        name: "USB Microphone",
        description:
          "Simple USB microphone for streaming, calls and recording.",
        price: 2100000,
        category: "Microphone",
        image: "/products/microphone.jpg",
      },
    ],
  });

  console.log(`${products.count} products created.`);
}

main()
  .catch((error) => {
    console.error("SEED ERROR:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
