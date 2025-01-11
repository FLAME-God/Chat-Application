import { useEffect, useRef } from "react";
import useMessageStore from "../store/useMessageStore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";
import useAuthStore from "../store/useAuthStore";

const ChatRoom = () => {
  const {
    isMessageLoading,
    selectedUser,
    getMessages,
    messages,
    subscribeToMessage,
    unSubscribeFromMessages,
  } = useMessageStore();
  const { authUser } = useAuthStore();

  const messageScrolRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMessages(selectedUser.user_id);
    subscribeToMessage();

    return () => unSubscribeFromMessages();
  }, [
    selectedUser.user_id,
    getMessages,
    subscribeToMessage,
    unSubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageScrolRef.current && messages) {
      messageScrolRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <div className="overflow-auto flex-1 flex flex-col w-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((text) => (
            <div
              key={text.message_id}
              className={`chat ${
                text.sender_id === authUser!.userId ? "chat-end" : "chat-start"
              }`}
              ref={messageScrolRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      text.reciver_id === authUser!.userId
                        ? authUser!.avatar || "/image.png"
                        : selectedUser.avatar.url || "/image.png"
                    }
                  />
                </div>
              </div>
              <div className="chat-bubble flex">
                <p>{text.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No messeges Availabe</p>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
