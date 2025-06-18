import { eq } from "drizzle-orm";
import { db } from "../config/db.js"
import { shortLinkTable } from "../drizzle/schema.js"

export const getAllShortLinks = async (userId) => {
    return await db
        .select()
        .from(shortLinkTable)
        .where(eq(shortLinkTable.userId,userId));
}

export const getShortLinkByShortCode = async (shortCode) => {
    const [result] = await db.select().from(shortLinkTable).where(eq(shortLinkTable.shortCode, shortCode));
    return result;
}


export const inserShortLink = async ({ url, shortCode, userId }) => {
    await db.insert(shortLinkTable).values({
        url,
        shortCode,
        userId
    });
}


//findShortLinkById

export const findShortLinkById = async (id) => {
  const [result] = await db
    .select()
    .from(shortLinkTable)
    .where(eq(shortLinkTable.id, id));
  return result;
};

export const updateShortCode = async ({ id, url, shortCode }) => {
  return await db
    .update(shortLinkTable)
    .set({ url, shortCode })
    .where(eq(shortLinkTable.id, id));
};

//deleteShortCodeById
export const deleteShortCodeById = async (id) => {
  return await db.delete(shortLinkTable).where(eq(shortLinkTable.id, id));
};











//Prisma code
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const loadLinks = async () => {
//     const allShortLinks = await prisma.shortLink.findMany();
//     return allShortLinks;
// }

// export const getLinkByShortCode = async (shortCode) => {
//     const shortLink = await prisma.shortLink.findUnique({
//         where: { shortCode: shortCode }
//     });
//     return shortLink;
// };

// export const saveLinks = async ({ url, shortCode }) => {
//     const newShortLink = await prisma.shortLink.create({
//         data: { shortCode, url }
//     })
// };