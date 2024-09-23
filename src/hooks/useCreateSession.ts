import { useEffect, useState } from "react";
import { getObjectFromLocalStorage } from "~/helpers/get-item-from-localstorage";
import { setObjectToLocalStorage } from "~/helpers/set-item-to-localstorage";
import { api } from "~/trpc/react";
import { type IUser } from "~/types/user";

export function useCreateUserSession() {
  const { mutate } = api.user.createUser.useMutation();

  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const user = getObjectFromLocalStorage<IUser>("user");
    if (user) {
      setUser(user);
    }
    if (!user) {
      const newUser: IUser = {
        sessionId: crypto.randomUUID(),
        userIdentifier: crypto.randomUUID(),
      };
      setObjectToLocalStorage("user", newUser);
      setUser(newUser);
      mutate({ userIdentifier: newUser.userIdentifier });
    }
  }, [mutate]);

  function updateUser(user: IUser) {
    setObjectToLocalStorage("user", user);
  }

  return { user, updateUser };
}
