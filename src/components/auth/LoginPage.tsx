import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/company');
      }
    };
    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-semibold text-black mb-2">InvoiceHub</h1>
            <p className="text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              
              className: {
                anchor: 'text-black hover:text-gray-300 underline',
                button: 'w-full px-4 py-3 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50',
                container: 'space-y-4',
                divider: 'my-6',
                input: 'w-full bg-transparent border border-[#333333] rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-transparent transition-colors',
                label: 'block text-sm font-medium text-black mb-2',
                loader: 'text-black',
                message: 'text-red-500 text-sm',
              },
            }}
            
            providers={['google']}
            theme="light"
          />
        </div>
      </div>
    </div>
  )
}
