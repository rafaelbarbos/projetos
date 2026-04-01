// src/components/auth/AuthLeftPanel.tsx
import { TrendingUp } from 'lucide-react';

const avatars = [
  'https://images.unsplash.com/photo-1699903905361-4d408679753f?w=100',
  'https://images.unsplash.com/photo-1620204389674-ef76805d76b4?w=100',
  'https://images.unsplash.com/photo-1609091289242-735df7a2207a?w=100',
];

export function AuthLeftPanel() {
  return (
    <div className='hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20'/>
      <div className='absolute inset-0' style={
        {backgroundImage: `url('https://images.unsplash.com/photo-1721111260570-456f3306f8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        opacity: 0.2}}/>

      {/*TOPO: Logo + headline*/}
      <div className='relative z-10'>
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center'>
          <TrendingUp className='w-7 h-7 text-white'/>
        </div>
        <div>
          <h1 className='font-black text-2xl text-white'>StreetHub</h1>
          <p className='text-sm text-neutral-400'>Import Community</p>
        </div>
        </div>

      <div className='space-y relative z-10'>
        <h2 className='text-4xl font-bold text-white leading-tight'>A maior comunidade de<br />
          <span className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            streetwear importado
          </span>
        </h2>
        <p className='text-lg text-neutral-300'>
          Descubra, compartilhe e importe as melhores peças da China com uma comunidade ativa e engajada.
        </p>
      </div>

      </div>

      {/*MEIO: Descrição do serviço*/}
      

      {/*Rodapé: social*/}
      <div className='relative z-10'>
        <div className='flex items-center gap-4'>
          <div className='flex -space-x-3'>
            {avatars.map((src, i)=>(
              <img
                key={i}
                src={src}
                alt=""
                className='w-10 h-10 rounded-full border-2 border-neutral object-cover'
                />
            ))}
          </div>
          <div>
            <p className='text-white font-semibold'>1.000+ importadores</p>
            <p className='text-sm text-neutral-400'>Ativos na plataforma</p>
          </div>
        </div>
      </div>
    </div>
  );
}