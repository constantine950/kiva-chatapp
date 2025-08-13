// src/lib/types.ts
export type MessageDB = {
  id: number;
  created_at: string; // ISO from DB
  sender_id: string; // clerkId string
  receiver_id: string; // clerkId string
  text: string;
};

export type Message = {
  id: number;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender: "me" | "other";
  text: string;
};

export type FriendRow = {
  id: number;
  clerkId: string;
  full_name: string;
  username?: string;
  email?: string;
  image?: string;
};

export type FriendAndMessages = {
  friend: FriendRow | null;
  messages: Message[];
};
