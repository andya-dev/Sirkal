import { Link } from "react-router-dom";
import { MessageCircle, Clock, Users } from "lucide-react";

interface ChatSidebarProps {
  hasSelectedChat: boolean;
}

export default function ChatSidebar({ hasSelectedChat }: ChatSidebarProps) {
  return (
    <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-10">
      <div className="w-10 h-10 rounded-full bg-gray-200 mb-8" />

      <Link
        to="/"
        className={`p-3 rounded-xl transition-colors ${
          !hasSelectedChat ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
        }`}
        title="Chats"
      >
        <MessageCircle size={24} />
      </Link>

      <Link
        to="/stories"
        className={`p-3 rounded-xl transition-colors ${
          hasSelectedChat ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
        }`}
        title="Stories"
      >
        <Clock size={24} />
      </Link>

      <div className="flex-1" />

      <Link
        to="/profile"
        className="p-3 rounded-xl text-gray-500 hover:bg-gray-50"
        title="Profile"
      >
        <Users size={24} />
      </Link>
    </aside>
  );
}