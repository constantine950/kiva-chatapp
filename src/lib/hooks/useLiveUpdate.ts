import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { subscribeToMessagesBetweenUsers } from "../firebaseQueries";

export const useLiveMessages = (userId?: string, friendId?: string) => {
  const queryClient = useQueryClient();

  // This keeps initial empty array in cache
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", userId, friendId],
    queryFn: () => Promise.resolve([]), // We won't actually fetch here
    enabled: false, // disable automatic fetching
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
