"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCreateUserSession } from "~/hooks/useCreateSession";
import { api } from "~/trpc/react";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();
  const count = params.get("count");
  const { data, refetch, isLoading, isFetching } =
    api.ai.getQuestion.useQuery();

  const { mutate, isPending } = api.user.insertAns.useMutation();
  const { user } = useCreateUserSession();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = new FormData(e.currentTarget);
    if (data?.question && user) {
      mutate({
        sessionId: user.sessionId,
        question: data?.question,
        answer: input.get("answer") as string,
        userIdentifier: user?.userIdentifier,
      });

      if (Number(count) >= 5) {
        console.log("work");
        router.push(`report/${user.sessionId}`);
      }
      if (Number(count) < 5) {
        router.push(`?count=${Number(count) + 1}`);
        void refetch();
        e.currentTarget.reset();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[24rem] flex-col items-center justify-center gap-3 px-3"
    >
      <h1 className="text-center text-3xl font-light">
        {isLoading || isFetching ? "Thinking..." : data?.question}
      </h1>
      <fieldset className="flex w-full gap-2">
        <Input name="answer" id="answer" placeholder="Answer question" />
        <Button variant="default" type="submit">
          {isPending ? "Loading..." : "Answer"}
        </Button>
      </fieldset>
    </form>
  );
}
