"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useCreateUserSession } from "~/hooks/useCreateSession";
import { type IUser } from "~/types/user";

export default function Retry() {
  const router = useRouter();
  const { user, updateUser } = useCreateUserSession();
  const handleClick = () => {
    if (user?.userIdentifier) {
      const newSession: IUser = {
        userIdentifier: user?.userIdentifier,
        sessionId: crypto.randomUUID(),
      };
      updateUser(newSession);
      router.push("/");
    }
  };
  return (
    <Button onClick={handleClick} variant="default">
      Retry
    </Button>
  );
}
