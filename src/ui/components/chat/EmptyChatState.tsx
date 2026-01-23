import { MessageCircle } from "lucide-react";

export default function EmptyChatState() {
  return (
    <div className="flex-1 flex items-center justify-center text-gray-500">
      <div className="text-center">
        <MessageCircle size={64} className="mx-auto mb-4 opacity-30" />
        <h3 className="text-xl font-medium text-black mb-2">Sirkal Chat</h3>
        <p>Pilih kontak di sebelah kiri untuk mulai mengobrol</p>
      </div>
    </div>
  );
}