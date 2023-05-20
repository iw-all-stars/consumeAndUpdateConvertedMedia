import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(event: any): Promise<any> {
    try {
        console.info("event", event);
    } catch (e) {
    } finally {
        return;
    }
}