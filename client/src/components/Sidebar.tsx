import { useEffect } from "react";
import useMessageStore from "../store/useMessageStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, isUserLoading, users, selectedUser, setSelectedUser } =
    useMessageStore();

  console.log(users[0]);
  //@ts-ignore
  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, []);

  if (isUserLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <button
                key={user.user_id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-3 flex items-center gap-3 rounded-lg hover:bg-base-300 transition-colors ${
                  selectedUser?.user_id === user.user_id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.avatar.url || "/image.png"}
                    alt={`${user.username}'s avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                  {
                    //@ts-ignore
                    onlineUsers.includes(user.user_id) && (
                      <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-950" />
                    )
                  }
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.username}</div>
                  <div className="text-sm text-zinc-400">
                    {
                      //@ts-ignore
                      onlineUsers.includes(user.user_id) ? "online" : "offline"
                    }
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-center">No contacts available</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
