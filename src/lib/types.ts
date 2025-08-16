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
  lastMessageAt: Date; // always normalized to Date in subscription
  lastSenderId: string;
  friend_id: string;
  userImg: string;
  userName: string;
  friendImg: string;
  friendName: string;
}
