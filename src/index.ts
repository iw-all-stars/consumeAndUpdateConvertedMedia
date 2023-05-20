import { PrismaClient } from "@prisma/client";
import { S3Event } from "./types";

const prisma = new PrismaClient();

export async function handler(event: {
    Records: { s3: S3Event }[];
}): Promise<any> {
    try {
        const uniquePostName = event.Records[0].s3.object.key.split('/')[1]
        // find random user
        const post = await prisma.post.update({
            where: {
                name: uniquePostName
            },
            data: {
                convertedUrl: `https://challengesem2converted.s3.eu-west-3.amazonaws.com/${event.Records[0].s3.object.key}`
            }
        });
        if (!post) {
            throw new Error("Post not found");
        }
        console.info("[INFO_UPDATE_SUCCESSFULL]: postId: ", post.id)
        return post;
    } catch (e) {
        console.error("[ERROR_HANDLER]: ", e);
    }
}
