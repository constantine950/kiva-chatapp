import supabase from "./supabase";

type User = {
  id: string;
  fullName: string | null;
  emailAddresses: { emailAddress: string }[];
  username: string | null;
  image?: string;
};

export const syncUserToSupabase = async (user: User | null | undefined) => {
  if (!user) return;
  const pic = `https://i.pravatar.cc/48?u=49947${Date.now()}`;

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
        image: pic,
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
  return data || [];
};

export const addFriends = async (userId: string, friendClerk_id: string) => {
  const { data: addedFriend, error } = await supabase.from("Friends").insert([
    {
      user_id: userId,
      friendClerk_id,
    },
  ]);

  if (error) {
    console.error(error.message);
  }
  if (!addedFriend) throw new Error("No friend data returned from Supabase");

  return addedFriend || [];
};

type AddedFriend = {
  currentUserId: string;
  otherFriendid: string;
};

export const checkIsFriend = async ({
  currentUserId,
  otherFriendid,
}: AddedFriend) => {
  const { data: addedFriend } = await supabase
    .from("Friends")
    .select("id")
    .eq("user_id", currentUserId)
    .eq("friend_id", otherFriendid);

  return addedFriend;
};

export type Friend = {
  friendClerk_id: string;
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
    .select("friendClerk_id, Users:friendClerk_id(full_name,image)")
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

export const sendMessage = async (
  sender_id: string | undefined,
  receiver_id: string | undefined,
  text: string
) => {
  const { data: message, error: MessageError } = await supabase
    .from("Messages")
    .insert([
      {
        sender_id,
        receiver_id,
        text,
      },
    ]);

  if (MessageError) {
    console.error(MessageError.message);
  }

  return message;
};

export const getFriendDetailAndMessages = async (
  clerkId: string | undefined,
  friendId: string
) => {
  // 1️⃣ Get friend details
  const { data: friendRow, error: friendError } = await supabase
    .from("Users")
    .select("id, clerkId, full_name, username, email, image")
    .eq("clerkId", friendId)
    .single();

  if (friendError) {
    console.error(friendError.message);
    return { friend: null, messages: [] };
  }

  // 2️⃣ Get messages between users
  const { data: messages, error: messagesError } = await supabase
    .from("Messages")
    .select("*")
    .or(
      `and(sender_id.eq.${clerkId},receiver_id.eq.${friendId}),` +
        `and(sender_id.eq.${friendId},receiver_id.eq.${clerkId})`
    )
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error(messagesError.message);
    return { friend: friendRow, messages: [] };
  }

  return { friend: friendRow, messages };
};
