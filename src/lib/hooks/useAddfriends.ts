import { useQuery } from "@tanstack/react-query";
import { getRandomUsers } from "../supabaseQueries";
import supabase from "../supabase";
import type { User } from "../types";

export const useAddfriends = (user: User | null | undefined) => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["addFriends", user?.id],
    queryFn: async () => {
      // Step 1: Get random users excluding current user
      const randomUsers = await getRandomUsers(user);

      // Step 2: Get IDs of users already added as friends
      const { data: friendsData, error } = await supabase
        .from("Friends")
        .select("friendClerk_id")
        .eq("user_id", user?.id);

      if (error) {
        console.error("Error fetching friends:", error);
        return randomUsers?.map((u) => ({ ...u, isFriend: false }));
      }

      const friendIds = friendsData?.map((f) => f.friendClerk_id) || [];
      // Step 3: Tag each user with isFriend
      const usersWithStatus = randomUsers?.map((u) => ({
        ...u,
        isFriend: friendIds.includes(u.clerkId),
      }));

      return usersWithStatus;
    },
    enabled: !!user,
  });

  return { users, isLoading };
};
