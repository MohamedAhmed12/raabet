import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@prisma/client";
import {Pool} from "pg";

const globalForPrisma = global as unknown as {prisma?: PrismaClient};
const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);

// @ts-expect-error: [working fine]
export const prisma = globalForPrisma.prisma || new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
