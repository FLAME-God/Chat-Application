import { X } from "lucide-react";
import useMessageStore from "../store/useMessageStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.avatar.url || "/image.png"}
                alt={selectedUser.username}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.username}</h3>
            <p className="">offline</p>
          </div>
        </div>
        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
