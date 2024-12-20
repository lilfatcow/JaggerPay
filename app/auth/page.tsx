'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Apple, LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Failed to sign in. Please try again.');
      } else {
        toast.success('Check your email for the sign in link!');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignIn('apple')}
            disabled={isLoading}
          >
            <Apple className="mr-2 h-4 w-4" />
            Continue with Apple
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleEmailSignIn}
              disabled={isLoading || !email}
            >
              <LockKeyhole className="mr-2 h-4 w-4" />
              {isLoading ? 'Signing in...' : 'Continue with Email'}
            </Button>
          </div>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Don't have an account?{' '}
          </span>
          <Button
            variant="link"
            className="font-semibold"
            onClick={() => router.push('/auth/signup')}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}