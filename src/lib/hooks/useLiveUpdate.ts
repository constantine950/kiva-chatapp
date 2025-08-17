import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { subscribeToMessagesBetweenUsers } from "../firebaseQueries";

export const useLiveMessages = (userId?: string, friendId?: string) => {
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", userId, friendId],
    queryFn: () => Promise.resolve([]),
    enabled: false,
    initialData: [],
  });

  useEffect(() => {
    if (!userId || !friendId) return;

    const unsubscribe = subscribeToMessagesBetweenUsers(
      userId,
      friendId,
      (newMessages) => {
        queryClient.setQueryData(["messages", userId, friendId], newMessages);
      }
    );

    return () => unsubscribe();
  }, [userId, friendId, queryClient]);

  return messages;
};
