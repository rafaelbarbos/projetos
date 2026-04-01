// src/components/auth/AuthSocialButtons.tsx
export function AuthSocialButtons() {
  return (
    <div className="mt-6 pt-6 border-t border-neutral-800">
      <p className="text-sm text-neutral-500 text-center mb-4">Ou continue com</p>
      <div className="grid grid-cols-2 gap-3">
        <button className="py-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl text-white font-medium transition-all">
          Google
        </button>
        <button className="py-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl text-white font-medium transition-all">
          Discord
        </button>
      </div>
    </div>
  );
}