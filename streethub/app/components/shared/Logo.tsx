import { TrendingUp } from "lucide-react";

export function Logo() {
    return(
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">StreetHub</h1>
            <p className="text-xs text-neutral-500">Import Community</p>
          </div>
        </div>
    );
}