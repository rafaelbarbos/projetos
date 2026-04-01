'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //Impede o comportamento padrão do formulário
        router.push('/feed'); //Redireciona para a página FEED após o envio do formulário
        };
    return(
        <>
        {/*Cabeçalho do formulário de autenticação*/}
        <div className='mb-8'>
            <h2 className='text-3xl font-bold text-white'>
                {isLogin 
                    ? 'Bem-vindo de volta!' 
                    : 'Crie sua conta'}
            </h2>
            <p className='text-neutral-400'>
                {isLogin 
                    ? 'Entre para continuar explorando' 
                    : 'Junte-se à comunidade'}
            </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
            {/*Campo usuário - só no cadastro*/}
            {!isLogin && (
                <div>
                    <label className='block text-sm font-medium text-neutral-300 mb-2'>
                        Nome do usuário
                    </label>
                    <div className="relative">
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500'/>
                        <input
                            type="text"
                            placeholder="Digite seu nome de usuário"
                            className='w-full bg-neutral-950 border border-neutral-800 rounded-xl px-12 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 transition-colors'
                            />
                    </div>
                </div>
            )}

            {/*Campo email*/}
            <div>
                <label className='block text-sm font-medium text-neutral-300 mb-2'>Email</label>
                <div className="relative">
                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500'/>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        className='w-full bg-neutral-950 border border-neutral-800 rounded-xl px-12 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 transition-colors'
                        />
                </div>
            </div>

            {/*Campo senha*/}
            <div>
                <label className='block text-sm font-medium text-neutral-300 mb-2'>Senha</label>
                <div className="relative">
                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500'/>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className='w-full bg-neutral-950 border border-neutral-800 rounded-xl px-12 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 transition-colors'
                        />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500'
                    >
                        {showPassword ? <EyeOff className='w-5 h-5'/> : <Eye className='w-5 h-5'/>}
                    </button>
                </div>
            </div>

            {/*Lembrar-me + Esqueceu senha - Só login*/}
            {isLogin && (
                <div className='flex items-center justify-between text-sm'>
                    <label className='flex items-center gap-2 text-neutral-400 cursor-pointer'>
                        <input 
                        type="checkbox" 
                        className='rounded border-neutral-700 bg-neutral-950'
                        />
                        Lembrar-me
                    </label>
                    <a href="#NEHUM LINK AINDA" className='text-purple-400 hover:text-purple-400 transition-colors'>
                        Esqueceu a senha?
                    </a>
                </div>
            )}
            
            <button
                type="submit"
                className='w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold text-lg transition-all shadow-lg shadow-purple-500/30'>
                {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
        </form>

        {/*Alternar entre login e cadastro*/}
        <div className='mt-6 text-center'>
            <p className='text-neutral-400 text-sm'>
                {isLogin 
                    ? "Não tem uma conta?" 
                    : "Já tem uma conta?"}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className='text-purple-400 hover:text-purple-300 font-semibold transition-colors'
                >
                    {isLogin 
                        ? ' Cadastre-se' 
                        : ' Entrar'}
                </button>
            </p>
        </div>
        </>
    );
}