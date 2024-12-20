import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <img 
        src="/logo.png"
        alt="WonderPay Logo"
        width={96}
        height={96}
      />
    </div>
  );
}