import { useQuery } from "@tanstack/react-query";
import { syncUserToSupabase } from "../supabaseQueries";
import type { User } from "../types";

export const useSync = (user: User | null | undefined) => {
  useQuery({
    queryKey: ["synUser", user?.id],
    queryFn: () => syncUserToSupabase(user),
    enabled: !!user,
    staleTime: Infinity,
  });
};
