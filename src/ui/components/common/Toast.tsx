// src/ui/components/common/Toast.tsx
import { useEffect } from "react";
import { X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number; // ms
  onClose: () => void;
}

export default function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  }[type];

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white
        ${bgColor} animate-slide-up
      `}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}

// CSS animation (tambahkan di global CSS atau tailwind config)