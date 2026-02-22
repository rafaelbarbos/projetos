import { TrendingUp } from 'lucide-react';

export function MobileLogo() {
    return (
    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
        <TrendingUp className="w-7 h-7 text-white" />
      </div>
      <div>
        <h1 className="font-bold text-2xl text-white">StreetHub</h1>
        <p className="text-sm text-neutral-400">Import Community</p>
      </div>
    </div>
    );
}