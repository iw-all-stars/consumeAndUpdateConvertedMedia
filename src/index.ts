import { PrismaClient } from "@prisma/client";
import { S3Event } from "./types";

const prisma = new PrismaClient();

export async function handler(event: {
    Records: { s3: S3Event }[];
}): Promise<any> {
    try {
        console.info("event", event.Records[0].s3);
        // find random user
        const user = await prisma.user.findFirst({});
        console.info("user", user);
    } catch (e) {
    } finally {
        return;
    }
}
