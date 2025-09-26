import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../firebaseQueries";
import type { MessageProps } from "../types";

export const useSendMessage = () => {
  const { mutate: sendMessages } = useMutation({
    mutationKey: ["sendMessages"],
    mutationFn: ({
      senderId,
      receiverId,
      text,
      userImg,
      userName,
      friendImg,
      friendName,
    }: MessageProps) =>
      sendMessage(
        senderId,
        receiverId,
        text,
        userImg,
        userName,
        friendImg,
        friendName
      ),
  });

  return sendMessages;
};
