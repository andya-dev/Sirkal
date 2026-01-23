import { Link } from "react-router-dom";
import type { ChatItem } from "@/global/types/chat";

interface ChatListProps {
  chats: ChatItem[];
  chatId?: string;
  loading: boolean;
  onSelect?: (id: string) => void;
}

export default function ChatList({ chats, chatId, loading }: ChatListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        Memuat daftar chat...
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 px-6 text-center">
        <p className="font-medium">Belum ada percakapan</p>
        <p className="text-sm mt-2">Mulai chat dengan temanmu sekarang</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {chats.map((chat) => (
        <Link
          key={chat.id}
          to={`/chat/${chat.id}`}
          className={`flex items-center px-4 py-3 transition ${
            chat.id === chatId ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 mr-3" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-medium text-black truncate">{chat.name}</h3>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {chat.time}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          </div>
          {chat.unread ? (
            <span className="ml-2 bg-[#1d9bf0] text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
              {chat.unread > 99 ? "99+" : chat.unread}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}