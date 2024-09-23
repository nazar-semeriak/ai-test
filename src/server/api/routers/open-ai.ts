import { eq } from "drizzle-orm";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { qna } from "~/server/db/schema";
const openai = new OpenAI({
  apiKey: env.OPEN_AI_KEY,
});

export const openAiRouter = createTRPCRouter({
  getReport: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const q = await db
        .select({
          question: qna.question,
          answer: qna.answer,
        })
        .from(qna)
        .where(eq(qna.sessionId, input.sessionId));

      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Create assesment of user answer to question based on provide json, ${JSON.stringify(q)}. And advice tree areas to where user need to adjast his knowledge. Your response only containes advice for areas where user need to adjust his knowledge.`,
          },
        ],
      });
      console.log(res);
      return {
        messages: res.choices[0]?.message.content,
      };
    }),
  getQuestion: publicProcedure.query(async () => {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Generate random question about general knowledge, no longer that 140 charachters.",
        },
      ],
    });

    return {
      question: res.choices[0]?.message.content,
    };
  }),
});
