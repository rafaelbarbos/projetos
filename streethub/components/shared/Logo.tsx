import { TrendingUp } from 'lucide-react';

type LogoVariant = 'default' | 'hero';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  if (variant === 'hero') {
    return (
      <div className={`flex items-center gap-3 mb-8 ${className}`.trim()}>
        <div className='w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center'>
          <TrendingUp className='w-7 h-7 text-white' />
        </div>
        <div>
          <h1 className='font-black text-2xl text-white'>ImportHub</h1>
          <p className='text-sm text-neutral-400'>Import Community</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <div className='w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center'>
        <TrendingUp className='w-6 h-6 text-white' />
      </div>
      <div>
        <h1 className='font-bold text-xl text-white'>ImportHub</h1>
        <p className='text-xs text-neutral-500'>Import Community</p>
      </div>
    </div>
  );
}