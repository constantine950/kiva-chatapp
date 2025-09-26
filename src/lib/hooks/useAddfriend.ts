import { useMutation } from "@tanstack/react-query";
import { addFriends } from "../supabaseQueries";

export const useAddfriend = () => {
  const { mutate: addFriend } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: ({
      currentUserId,
      friendClerk_id,
    }: {
      currentUserId: string;
      friendClerk_id: string;
    }) => addFriends(currentUserId, friendClerk_id),
  });

  return addFriend;
};
