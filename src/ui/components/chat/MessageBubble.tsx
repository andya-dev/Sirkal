import type { Message } from "@/global/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isMe
            ? "bg-black text-white rounded-br-none"
            : "bg-white text-black rounded-bl-none shadow-sm"
        }`}
      >
        <p className="text-[15px]">{message.text}</p>
        <span className="text-xs opacity-70 block mt-1 text-right">
          {message.time}
        </span>
      </div>
    </div>
  );
}