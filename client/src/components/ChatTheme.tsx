import { MessageSquare } from "lucide-react";

const ChatTheme = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-6 ">
          <div className="relative">
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare className="size-8 text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold">Welecome ChaterBox!</h1>
        <p className="text-base-content/60">
          Select friends to start conversation
        </p>
      </div>
    </div>
  );
};

export default ChatTheme;
