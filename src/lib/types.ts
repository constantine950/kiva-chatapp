import type { RefObject } from "react";

export type User = {
  id: string;
  fullName: string | null;
  emailAddresses: { emailAddress: string }[];
  username: string | null;
  image?: string;
};

export type Friend = {
  friendClerk_id: string;
  Users: {
    full_name: string;
    image: string;
  } | null;
};

export type FriendRow = {
  id: number;
  clerkId: string;
  full_name: string;
  username: string;
  email: string;
  image: string;
};

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
  conversationId: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: Date;
  lastSenderId: string;
  friend_id: string;
  userImg: string;
  userName: string;
  friendImg: string;
  friendName: string;
}

export interface ChatWindowProps {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
}

export type MenuItems = {
  id: number;
  link: string;
  text: string;
};

export interface MenuItemProps {
  key: number;
  className: string;
  item: MenuItems;
  onClick?: () => void;
}

export interface MobileNavProp {
  menuRef?: RefObject<HTMLDivElement | null>;
  handleToggle?: () => void;
  isMenuOpen?: boolean;
}
