import React from 'react';
import Link from 'next/link';
import { Leaf, Heart } from 'lucide-react';

export const LegalFooter: React.FC = () => {
  return (
    <footer className="bg-[#1a2d24] text-slate-300 py-12 border-t border-[#122019] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#2C4A3B]">
          
          {/* Brand Logo & Name */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#E8F0E9] flex items-center justify-center text-[#2C4A3B] font-black text-sm">
                <Leaf className="w-5 h-5" />
              </span>
              <span className="text-base font-black text-white tracking-tight">
                Little Savings, Big Dreams
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Start with a clear goal, track your progress, and build your savings one step at a time.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-slate-300">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Customer Support
            </Link>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Little Savings, Big Dreams. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#D38E90] fill-[#D38E90]" />
            <span>for savers worldwide.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
