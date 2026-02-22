import { AuthLeftPanel } from '@/app/components/auth/AuthLeftPainel';
import { AuthForm }       from '@/app/components/auth/AuthForm';   
import { AuthSocialButtons } from '../components/auth/AuthSocialButtons'; 
import { MobileLogo } from '../components/auth/MobileLogo';
import { AuthFooter } from '../components/auth/AuthFooter';


export default function AuthPage() {
    return (
        <div className="min-h-screen bg-black bg-gradient-to-br from-neutral-950 via-purple-950/20 to neutral-950 flex">
            {/*Lado esquerdo - só aparece em telas grandes*/}
            <AuthLeftPanel/>

            {/*Lado direito - formulário*/}
            <div className='flex-1 flex items-center justify-center p-8'>
                <div className='w-full max-w-md'>

                    {/*Logo mobile - só aparece em telas pequenas*/}
                    <MobileLogo/>

                    <div className='bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8'>
                        <AuthForm/>
                        <AuthSocialButtons/>
                    </div>
                </div>

                <AuthFooter/>

                </div>
        </div>
    );
}