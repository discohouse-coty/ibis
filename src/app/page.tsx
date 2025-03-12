'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="h-screen overflow-hidden flex items-center bg-[#F3DEE1] px-16">
      <div className="flex-1 pr-8">
        <h1 className="font-archivo-black text-[64px] leading-tight text-[#080708] mb-6 font-[800]">
          THE MOST<br />
          ENGAGING WAY TO<br />
          LEARN HISTORY.
        </h1>
        <p className="font-archivo-semibold text-[16px] text-[#080708] mb-4 max-w-xl opacity-90">
          Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus, volutpat lacinia arcu nibh vel ante.
        </p>
        <p className="font-archivo text-[16px] text-[#080708] mb-8 max-w-xl opacity-80">
          Proin dapibus dui eget justo tincidunt eleifend. Mauris porta elementum est. Nullam euismod quis libero sed convallis.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="bg-[#080708] text-white font-archivo px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 ease-out flex items-center gap-2 group"
        >
          Start learning
          <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
        </button>
        
        <div className="mt-16 grid grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <h3 className="font-archivo-black text-[#080708] text-lg mb-2">PRICING</h3>
            <p className="font-archivo text-[16px] text-[#080708] opacity-80 group-hover:opacity-100 transition-opacity">
              Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus.
            </p>
          </div>
          <div className="group cursor-pointer">
            <h3 className="font-archivo-black text-[#080708] text-lg mb-2">FOR STUDENTS</h3>
            <p className="font-archivo text-[16px] text-[#080708] opacity-80 group-hover:opacity-100 transition-opacity">
              Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus.
            </p>
          </div>
          <div className="group cursor-pointer">
            <h3 className="font-archivo-black text-[#080708] text-lg mb-2">FOR TEACHERS</h3>
            <p className="font-archivo text-[16px] text-[#080708] opacity-80 group-hover:opacity-100 transition-opacity">
              Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin metus.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative h-[600px] my-auto">
        <Image
          src="/moon-landing.png"
          alt="Historic moon landing"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
