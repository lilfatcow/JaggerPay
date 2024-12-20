'use client';

import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        <h1 className={`text-5xl font-bold tracking-tight mb-2 ${playfair.className}`}>
          WonderPay
        </h1>
        
        <Logo className="w-24 h-24 mx-auto" />
        
        <div className="text-sm uppercase tracking-widest text-gray-600">
          BY WONDERLAND STUDIO
        </div>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-8">
          WonderPay by Wonderland Studio is a private bill pay and payments automation platform to streamline AP & AR and 
          offer working capital solutions for our clients, partners and colleagues in music, entertainment and luxury hospitality.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Link href="/auth">
            <Button variant="default" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
              Log In
            </Button>
          </Link>
          <Link href="/inquire">
            <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8">
              Inquire
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}