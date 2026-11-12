'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { ApiError, login, register } from '@/lib/authApi';
import { useAuth } from '@/components/auth/AuthProvider';

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login: loginContext } = useAuth();

    const [username, setUsername] = useState('');
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                const { token } = await login({ username: loginIdentifier, password });
                await loginContext(token, remember);
            } else {
                await register({ username, displayName: username, email, password });
                const { token } = await login({ username, password });
                await loginContext(token, remember);
            }
            router.push('/feed');
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Erro inesperado. Tente novamente.');
        } finally {
            setLoading(false);
        }
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Digite seu nome de usuário"
                            required
                            minLength={3}
                            className='w-full bg-neutral-950 border border-neutral-800 rounded-xl px-12 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 transition-colors'
                            />
                    </div>
                </div>
            )}

            {/*Campo email/usuário no login, email no cadastro*/}
            <div>
                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                    {isLogin ? 'Email ou usuário' : 'Email'}
                </label>
                <div className="relative">
                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500'/>
                    <input
                        type={isLogin ? 'text' : 'email'}
                        value={isLogin ? loginIdentifier : email}
                        onChange={(e) => (isLogin ? setLoginIdentifier(e.target.value) : setEmail(e.target.value))}
                        placeholder={isLogin ? 'Digite seu email ou usuário' : 'Digite seu email'}
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={8}
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
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className='rounded border-neutral-700 bg-neutral-950'
                        />
                        Lembrar-me
                    </label>
                    <button
                        type="button"
                        onClick={() => router.push('/auth/forgot')}
                        className='text-purple-400 hover:text-purple-300 transition-colors'
                    >
                        Esqueceu a senha?
                    </button>
                </div>
            )}

            {error && (
                <p className='text-sm text-red-400'>{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className='w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold text-lg transition-all shadow-lg shadow-purple-500/30 disabled:opacity-60'>
                {loading ? 'Enviando...' : isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
        </form>

        {/*Alternar entre login e cadastro*/}
        <div className='mt-6 text-center'>
            <p className='text-neutral-400 text-sm'>
                {isLogin
                    ? "Não tem uma conta? "
                    : "Já tem uma conta? "}
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError(null);
                    }}
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
