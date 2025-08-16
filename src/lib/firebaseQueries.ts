import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  where,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { firestoreDB } from "./firebase";
import type { Conversation, Message } from "./types";

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  text: string,
  userImg: string | undefined,
  userName: string | undefined,
  friendImg: string | undefined,
  friendName: string | undefined
) => {
  const conversationId = [senderId, receiverId].sort().join("_");
  const participants = [senderId, receiverId];

  // Add the message
  await addDoc(collection(firestoreDB, "messages"), {
    senderId,
    receiverId,
    text,
    createdAt: serverTimestamp(),
    conversationId,
    participants,
  });

  // Update or create the conversation doc
  const conversationRef = doc(firestoreDB, "conversations", conversationId);
  await setDoc(
    conversationRef,
    {
      participants,
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
      lastSenderId: senderId,
      friend_id: receiverId,
      userImg,
      userName,
      friendImg,
      friendName,
    },
    { merge: true }
  );
};

export const subscribeToMessagesBetweenUsers = (
  userId: string,
  friendId: string,
  callback: (messages: Message[]) => void
) => {
  const conversationId = [userId, friendId].sort().join("_");

  const q = query(
    collection(firestoreDB, "messages"),
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages: Message[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Normalize createdAt to Date
      let createdAt: Date;
      if (data.createdAt instanceof Timestamp) {
        createdAt = data.createdAt.toDate();
      } else if (typeof data.createdAt === "number") {
        createdAt = new Date(data.createdAt);
      } else if (typeof data.createdAt === "string") {
        createdAt = new Date(data.createdAt);
      } else {
        createdAt = new Date();
      }

      return {
        id: doc.id,
        senderId: data.senderId ?? "",
        receiverId: data.receiverId ?? "",
        text: data.text ?? "",
        createdAt,
        conversationId: data.conversationId ?? conversationId,
      };
    });

    callback(messages);
  });

  return unsubscribe;
};

export const subscribeToChatList = (
  userId: string,
  callback: (chats: Conversation[]) => void
) => {
  const q = query(
    collection(firestoreDB, "conversations"),
    where("participants", "array-contains", userId),
    orderBy("lastMessageAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const chats: Conversation[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      let lastMessageAt: Date;
      if (data.lastMessageAt instanceof Timestamp) {
        lastMessageAt = data.lastMessageAt.toDate();
      } else if (typeof data.lastMessageAt === "number") {
        lastMessageAt = new Date(data.lastMessageAt);
      } else if (typeof data.lastMessageAt === "string") {
        lastMessageAt = new Date(data.lastMessageAt);
      } else {
        lastMessageAt = new Date();
      }

      return {
        id: doc.id,
        participants: data.participants ?? [],
        lastMessage: data.lastMessage ?? "",
        lastMessageAt,
        lastSenderId: data.lastSenderId ?? "",
        friend_id: data.friend_id,
        userImg: data.userImg,
        userName: data.userName,
        friendImg: data.friendImg,
        friendName: data.friendName,
      };
    });

    callback(chats);
  });

  return unsubscribe;
};
