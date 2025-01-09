import { useEffect } from "react";
import useMessageStore from "../store/useMessageStore";
import ChatHeader from "./ChatHeader";
import Input from "./Input";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatRoom = () => {
  const { isMessageLoading, selectedUser, getMessages } = useMessageStore();
  useEffect(() => {
    getMessages(selectedUser.user_id);
  }, []);
  if (!isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <Input type="text" placeholder="Enter message" />
      </div>
    );
  return (
    <div className="overflow-auto flex-1 flex flex-col w-full">
      <ChatHeader />
      <p>All messages here</p>
      <Input type="text" placeholder="Enter message" />
    </div>
  );
};

export default ChatRoom;
