import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Conversation } from "../types";
import { subscribeToChatList } from "../firebaseQueries";

export const useLiveChatList = (userId?: string) => {
  const queryClient = useQueryClient();

  const { data: chatList = [] } = useQuery<Conversation[]>({
    queryKey: ["chatList", userId],
    queryFn: () => Promise.resolve([]),
    enabled: false,
    initialData: [],
  });

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToChatList(userId, (newList) => {
      queryClient.setQueryData(["chatList", userId], newList);
    });

    return () => unsubscribe();
  }, [userId, queryClient]);

  return chatList;
};
