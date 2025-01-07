import { useEffect, useState } from "react";
import useMessageStore from "../store/useMessageStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

interface User {
  id: number;
  username: string;
  avatarUrl: string;
}

const Sidebar = () => {
  const { getUsers, isUserLoading, users, isSelectedUser } = useMessageStore();
  const [selectedUser, setSelectedUser] = useState<User | null | Object>(null);
  console.log(users[0]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
                className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                  selectedUser?.user_id === user.user_id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }`}
              >
                <img
                  src={user.avatar.url || "/image.png"}
                  alt={`${user.username}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
                <span className="hidden lg:block">{user.username}</span>
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
