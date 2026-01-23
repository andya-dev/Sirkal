// src/ui/pages/Home.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getChatList, getChatMessages } from "@/global/api/chat";
import type { ChatItem, ChatDetail, Message } from "@/global/types/chat";

import ChatSidebar from "@/ui/components/chat/ChatSidebar";
import ChatList from "@/ui/components/chat/ChatList";
import ChatHeader from "@/ui/components/chat/ChatHeader";
import MessageList from "@/ui/components/chat/MessageList";
import ChatInput from "@/ui/components/chat/ChatInput";
import EmptyChatState from "@/ui/components/chat/EmptyChatState";

  // Mock data (bisa dipindah ke file terpisah nanti)
  const mockChats: ChatItem[] = [
    { id: "1", name: "Andi Rahman", lastMessage: "Besok ketemu ya?", time: "10:32", unread: 2 },
    { id: "2", name: "Tim Skripsi", lastMessage: "Slide sudah diupdate", time: "Kemarin" },
    { id: "3", name: "Ibu", lastMessage: "Jangan lupa makan", time: "08:15", unread: 1 },
    { id: "4", name: "Rina", lastMessage: "Foto liburanmu bagus!", time: "2 jam lalu" },
  ];

  const mockChatDetails: Record<string, ChatDetail> = {
    "1": {
      id: "1",
      name: "Andi Rahman",
      messages: [
        { id: "m1", text: "Halo, besok jam berapa?", sender: "them", time: "10:28" },
        { id: "m2", text: "Jam 2 siang di kafe biasa ya", sender: "me", time: "10:30" },
        { id: "m3", text: "Besok ketemu ya?", sender: "them", time: "10:32" },
      ],
    },
    "2": {
      id: "2",
      name: "Tim Skripsi",
      messages: [
        { id: "m4", text: "Slide presentasi sudah diupdate", sender: "them", time: "14:15" },
        { id: "m5", text: "Makasih ya, nanti aku review", sender: "me", time: "14:20" },
      ],
    },
    "3": {
      id: "3",
      name: "Ibu",
      messages: [
        // { id: "m6", text: "Jangan lupa makan", sender: "them", time: "08:15" },
      ],
    },
    "4": {
      id: "4",
      name: "Rina",
      messages: [
        // { id: "m6", text: "Jangan lupa makan", sender: "them", time: "08:15" },
      ],
    },
  };


export default function Home() {
  const { chatId } = useParams<{ chatId: string }>();

  const [chats, setChats] = useState<ChatItem[]>([]);
  const [selectedChatDetail, setSelectedChatDetail] = useState<ChatDetail | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load list of conversations
  useEffect(() => {
    async function fetchChatList() {
      setLoadingList(true);
      setErrorMsg("");

      try {
        const data = await getChatList();
        setChats(data);
      } catch (err) {
        console.error(err);
        setErrorMsg("Gagal memuat daftar chat");
      } finally {
        setLoadingList(false);
      }
    }

    fetchChatList();
  }, []);

  // Load selected chat messages
  useEffect(() => {
    if (!chatId) {
      setSelectedChatDetail(null);
      setLoadingDetail(false);
      return;
    }

    // Narrow type – chatId is string here
    const currentChatId: string = chatId;

    async function fetchDetail() {
      setLoadingDetail(true);

      try {
        const detail = await getChatMessages(currentChatId);
        setSelectedChatDetail(detail);
      } catch (err) {
        console.error(err);
        setErrorMsg("Gagal memuat riwayat pesan");
        setSelectedChatDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    }

    fetchDetail();
  }, [chatId]);

  // Add new message (optimistic update)
  const addNewMessage = (text: string) => {
    if (!selectedChatDetail) return;

    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Optimistic: add to messages
    setSelectedChatDetail((prev) => ({
      ...prev!,
      messages: [...(prev?.messages ?? []), newMessage],
    }));

    // Update preview in list
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: text.slice(0, 50) + (text.length > 50 ? "..." : ""),
              time: "Baru saja",
            }
          : chat
      )
    );
  };

  const isChatAreaActive = !!chatId;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <ChatSidebar hasSelectedChat={isChatAreaActive} />

      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Chats</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ChatList chats={chats} chatId={chatId} loading={loadingList} />
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-[#f0f2f5]">
        {isChatAreaActive ? (
          <>
            {selectedChatDetail ? (
              <ChatHeader name={selectedChatDetail.name} />
            ) : (
              <div className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-black">Memuat...</h3>
                  <p className="text-xs text-gray-500">Sedang memuat percakapan</p>
                </div>
              </div>
            )}

            <div className="flex-1 p-5 overflow-y-auto">
              <MessageList
                messages={selectedChatDetail?.messages ?? []}
                loading={loadingDetail}
              />
            </div>

            <ChatInput
              conversationId={chatId}
              onMessageSent={addNewMessage}   // types now match
            />
          </>
        ) : (
          <EmptyChatState />
        )}
      </div>
    </div>
  );
}