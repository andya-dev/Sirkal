import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  name: string;
}

export default function ChatHeader({ name }: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center gap-3">
      <button
        onClick={() => navigate("/")}
        className="text-gray-600 hover:text-black lg:hidden"
      >
        ←
      </button>
      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
      <div>
        <h3 className="font-medium text-black">{name}</h3>
        <p className="text-xs text-gray-500">Online • Terakhir dilihat tadi</p>
      </div>
    </div>
  );
}