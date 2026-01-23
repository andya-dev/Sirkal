// src/global/api/chat.ts
import type { ChatItem, ChatListResponse, ChatDetail } from "@/global/types/chat"; // buat type ini jika belum ada

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";


// ── 1. Ambil daftar conversation (preview saja)
export async function getChatList(): Promise<ChatItem[]> {
  try {
    const token = localStorage.getItem("token") || ""; // nanti dari auth context

    const res = await fetch(`${API_BASE}/api/chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw new Error(`Gagal memuat daftar chat: ${res.status}`);
    }

    const data: ChatListResponse = await res.json();
    return data.chats || [];
  } catch (err) {
    console.error("getChatList error:", err);
    throw err;
  }
}

// ── 2. Ambil detail pesan satu conversation berdasarkan ID
export async function getChatMessages(convId: string): Promise<ChatDetail> {
  try {
    const token = localStorage.getItem("token") || "";

    const res = await fetch(`${API_BASE}/api/chats/${convId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw new Error(`Gagal memuat pesan: ${res.status}`);
    }

    const data: ChatDetail = await res.json();
    return data;
  } catch (err) {
    console.error("getChatMessages error:", err);
    throw err;
  }
}


// ── 3. Kirim pesan baru ke conversation
export async function sendMessage(
  convId: string,
  text: string,
  signal?: AbortSignal // untuk timeout & cancel
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const token = localStorage.getItem("token") || "";

    const res = await fetch(`${API_BASE}/api/chats/${convId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ text }),
      signal, // support abort & timeout
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `Gagal mengirim pesan: ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      messageId: data.messageId || data.id,
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Pengiriman dibatalkan (timeout)");
    }
    console.error("sendMessage error:", err);
    throw err;
  }
}