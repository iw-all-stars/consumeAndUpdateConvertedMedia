import { PrismaClient } from "@prisma/client";
import { S3Event } from "./types";
import { retry } from 'ts-retry-promise';

const prisma = new PrismaClient();

export async function handler(event: {
    Records: { s3: S3Event }[];
}): Promise<any> {
    try {
        console.info("[START_CONSUMING_EVENT]: ", event.Records[0].s3);
        const uniquePostName = event.Records[0].s3.object.key.split('/')[1].split('.')[0]
        const post = await retry(() => {
			return prisma.post.update({
				where: {
					name: uniquePostName
				},
				data: {
					convertedUrl: `https://challengesem2converted.s3.eu-west-3.amazonaws.com/${event.Records[0].s3.object.key}`
				}
			})
		}, { retries: 5, delay: 1000 })
		
        console.info("[END_CONSUMING_SUCCESS 🟩]: postId, name: ", post.id, ' - ', post.name)
        return post;
    } catch (e) {
        console.error("[ERROR_HANDLER ❌]: ", e);
    }
}
