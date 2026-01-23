// src/ui/components/chat/ChatInput.tsx
import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/global/api/chat";
import Toast from "@/ui/components/common/Toast";

interface ChatInputProps {
  conversationId?: string;
  onMessageSent?: (text: string) => void;   // ← hanya text
}

export default function ChatInput({ conversationId, onMessageSent }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MIN_HEIGHT = 44;
  const MAX_HEIGHT = 160;

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.max(MIN_HEIGHT, Math.min(textarea.scrollHeight, MAX_HEIGHT));
    textarea.style.height = `${newHeight}px`;
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!message.trim() || !conversationId) return;

    const textToSend = message.trim();

    // Optimistic UI – hanya kirim text
    onMessageSent?.(textToSend);

    // Clear input
    setMessage("");

    // Kirim ke API dengan timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik

    try {
      await sendMessage(conversationId, textToSend, controller.signal);
      setToast({ message: "Pesan terkirim", type: "success" });
    } catch (err: any) {
      setToast({
        message: err.message || "Gagal mengirim pesan",
        type: "error",
      });
      // Optional: rollback optimistic UI di sini jika perlu
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <>
      <div className="bg-white border-t border-gray-200 p-4 flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan..."
          rows={1}
          className={`
            flex-1 px-5 py-3.5 rounded-3xl bg-gray-100 border border-gray-200
            focus:outline-none focus:bg-white focus:border-[#1d9bf0]/50
            resize-none overflow-y-auto transition-all duration-150
            leading-normal text-[15px]
            max-h-[160px]
          `}
          style={{
            minHeight: `${MIN_HEIGHT}px`,
            maxHeight: `${MAX_HEIGHT}px`,
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!message.trim() || !conversationId}
          className={`
            flex-shrink-0 p-3.5 rounded-full transition-all
            ${message.trim() && conversationId
              ? "bg-black text-white hover:bg-gray-900 hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          ➤
        </button>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}