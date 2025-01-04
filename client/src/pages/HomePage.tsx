import ChatRoom from "../components/ChatRoom";
import ChatTheme from "../components/ChatTheme";
import Sidebar from "../components/Sidebar";
import useMessageStore from "../store/useMessageStore";

const HomePage = () => {
  const { isSelectedUser } = useMessageStore();
  return (
    <div className="h-screen bg-blue-950/10">
      <div className="flex items-center justify-center pt-20 px-40">
        <div className="bg-base-200 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="h-full flex overflow-hidden rounded-lg">
            <Sidebar />
            {!isSelectedUser ? <ChatTheme /> : <ChatRoom />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
