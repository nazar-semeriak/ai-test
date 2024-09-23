import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { qna, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        userIdentifier: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return db.insert(users).values({
        userIdentifier: input.userIdentifier,
      });
    }),
  insertAns: publicProcedure
    .input(
      z.object({
        userIdentifier: z.string(),
        sessionId: z.string(),
        question: z.string(),
        answer: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userIdentifier, sessionId, question, answer } = input;
      const user = await db
        .select({
          userId: users.id,
        })
        .from(users)
        .where(eq(users.userIdentifier, userIdentifier));

      return await db.insert(qna).values({
        answer,
        question,
        sessionId,
        userId: user[0]?.userId,
      });
    }),
});
