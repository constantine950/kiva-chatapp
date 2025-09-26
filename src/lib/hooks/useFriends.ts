import { useQuery } from "@tanstack/react-query";
import type { Friend, User } from "../types";
import { getUserFriends } from "../supabaseQueries";

export const useFriends = (user: User | null | undefined) => {
  const { data: friends, isLoading } = useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: () => getUserFriends(user?.id),
    enabled: !!user,
  });
  return { friends, isLoading };
};
