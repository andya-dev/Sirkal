import MessageBubble from "./MessageBubble";
import type { Message } from "@/global/types/chat";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

export default function MessageList({ messages, loading }: MessageListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Memuat pesan...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Belum ada pesan
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}