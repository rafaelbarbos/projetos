import { Plus } from "lucide-react";

interface FeedHeaderProps {
  onCreatePost: () => void;
}

export function FeedHeader({ onCreatePost }: FeedHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      
      {/* Lado esquerdo */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Feed
        </h1>
        <p className="text-neutral-400">
          Descubra as últimas peças da comunidade
        </p>
      </div>

      {/* Lado direito */}
      <button
        type="button"
        onClick={onCreatePost}
        className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-purple-500/30"
      >
        <Plus className="w-5 h-5" />
        Postar
      </button>

    </div>
  );
}