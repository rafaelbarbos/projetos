'use client';

import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VoteSectionProps {
  userVote: 'green' | 'red' | null;
  greenLights: number;
  redLights: number;
  greenRatio: number;
  onVote: (voteType: 'green' | 'red') => void;
}

export function VoteSection({
  userVote,
  greenLights,
  redLights,
  greenRatio,
  onVote,
}: VoteSectionProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        type="button"
        onClick={() => onVote('green')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          userVote === 'green'
            ? 'bg-green-500/20 text-green-400 border border-green-500/40'
            : 'bg-neutral-800 text-neutral-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent'
        }`}
      >
        <ThumbsUp className={`w-5 h-5 ${userVote === 'green' ? 'fill-current' : ''}`} />
        <span className="font-medium text-sm">GL {greenLights}</span>
      </button>

      <button
        type="button"
        onClick={() => onVote('red')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          userVote === 'red'
            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
            : 'bg-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent'
        }`}
      >
        <ThumbsDown className={`w-5 h-5 ${userVote === 'red' ? 'fill-current' : ''}`} />
        <span className="font-medium text-sm">RL {redLights}</span>
      </button>

      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-green-500 to-green-400 transition-all duration-300"
            style={{ width: `${greenRatio}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500 font-medium">{greenRatio}% GL</span>
      </div>
    </div>
  );
}
