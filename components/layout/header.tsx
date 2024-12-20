'use client';

import { Logo } from './logo';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
      </div>
    </header>
  );
}