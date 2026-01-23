export interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  unread?: number;
  isGroup?: boolean;
  lastMessageSender?: string; // "You" atau nama orang lain
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
  status?: "sent" | "delivered" | "read";
}

export interface ChatDetail {
  id: string;
  name: string;
  messages: Message[];
}

export interface ChatListResponse {
  chats: ChatItem[];
  total?: number;
}