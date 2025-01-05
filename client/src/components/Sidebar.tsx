import { useEffect } from "react";
import useMessageStore from "../store/useMessageStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, isUserLoading } = useMessageStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;
  return <div className=""></div>;
};

export default Sidebar;
