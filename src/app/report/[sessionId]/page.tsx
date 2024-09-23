import Retry from "~/app/_components/retry";
import { api, HydrateClient } from "~/trpc/server";

export default async function Report({
  params,
}: {
  params: { sessionId: string };
}) {
  const message = await api.ai.getReport({ sessionId: params.sessionId });
  return (
    <HydrateClient>
      <span className="max-w-[23rem] overflow-y-auto px-3 py-6 text-left text-xl">
        {message.messages}
      </span>
      <Retry />
    </HydrateClient>
  );
}
