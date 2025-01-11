import { Send } from "lucide-react";
import { useRef } from "react";
import useMessageStore from "../store/useMessageStore";
import Input from "./Input";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { sendMessages } = useMessageStore();
  const messageRef = useRef<HTMLInputElement>();
  async function submitSend() {
    const message = messageRef.current?.value;
    if (!message) {
      toast.error("Message is required");
      return;
    }
    await sendMessages(message);
  }

  return (
    <div className="p-4 w-full">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            placeholder="Type a Message.."
            referance={messageRef}
          />
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            onClick={submitSend}
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
