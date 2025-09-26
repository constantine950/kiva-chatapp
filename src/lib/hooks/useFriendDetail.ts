import { useQuery } from "@tanstack/react-query";
import { getFriendDetail } from "../supabaseQueries";

export const useFriendDetail = (friendId: string | undefined) => {
  const { data: friendDetail } = useQuery({
    queryKey: ["friendDetail", friendId],
    queryFn: () => getFriendDetail(friendId!),
    enabled: !!friendId,
  });

  return friendDetail;
};
