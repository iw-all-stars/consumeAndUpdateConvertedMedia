import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(event: any): Promise<any> {
    try {
        console.info("event", event);
        // find random user
        const user = await prisma.user.findFirst({});
        console.info("user", user);
    } catch (e) {
    } finally {
        return;
    }
}