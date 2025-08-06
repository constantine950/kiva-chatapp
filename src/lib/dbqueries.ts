import supabase from "./supabase";

type User = {
  id: string;
  fullName: string | null;
  emailAddresses: { emailAddress: string }[];
  username: string | null;
  imageUrl: string;
};

export const syncUserToSupabase = async (user: User | null | undefined) => {
  if (!user) return;

  const { data: existingUser, error: selectError } = await supabase
    .from("Users")
    .select("*")
    .eq("clerkId", user.id)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    console.error("Error fetching user:", selectError.message);
    return;
  }

  if (!existingUser) {
    const { error: insertError } = await supabase.from("Users").insert([
      {
        full_name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        username: user.username,
        clerkId: user.id,
        image: user.imageUrl,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
    }
  }

  return null;
};

export const getRandomUsers = async (user: User | null | undefined) => {
  const clerkId = user?.id;

  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .neq("clerkId", clerkId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error.message);
  }
  return data;
};

export const addFriends = async (userId: string, friend_id: string) => {
  const { data: addedFriend, error } = await supabase.from("Friends").insert([
    {
      user_id: userId,
      friend_id,
    },
  ]);

  if (error) {
    console.error(error.message);
  }
  if (!addedFriend) throw new Error("No friend data returned from Supabase");

  return addedFriend as {
    id: number;
    user_id: string;
    friend_id: number;
    created_at: string;
  };
};

export const updateUser = async (friend_id: string) => {
  const { error: updateError, data: updatedData } = await supabase
    .from("Users")
    .update({
      isFriend: true,
    })
    .eq("id", friend_id);

  if (updateError) {
    console.error(updateError.message);
  }
  if (!updatedData) throw new Error("not able to update friend");

  return updatedData as {
    id: number;
    full_name: string;
    email: string;
    isFriend: boolean;
    image: string;
    clerkId: string;
    created_at: string;
    username: string;
  };
};

export type Friend = {
  friend_id: string;
  Users: {
    full_name: string;
    image: string;
  };
};

export async function getUserFriends(
  userId: string | undefined
): Promise<Friend[]> {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("Friends")
    .select("friend_id, Users:friend_id(full_name,image)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching friends:", error.message);
    return [];
  }

  // Ensure Users is not an array
  const normalized = (data ?? []).map((item) => ({
    ...item,
    Users: Array.isArray(item.Users) ? item.Users[0] : item.Users,
  }));

  return normalized;
}
