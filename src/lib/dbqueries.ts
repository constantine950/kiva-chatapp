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
    const { error: insertError } = await supabase.from("Users").insert({
      full_name: user.fullName,
      email: user.emailAddresses[0].emailAddress,
      username: user.username,
      clerkId: user.id,
      image: user.imageUrl,
    });

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
