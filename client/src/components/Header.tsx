import { useState } from "react";
import { MenuIcon } from "@/components/ui/icon";
import { GlobeIcon } from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <GlobeIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Ultraviolet Node</h1>
            <p className="text-xs text-slate-500">Web Proxy Service</p>
          </div>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-primary font-medium hover:text-primary-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-600 font-medium hover:text-slate-900 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-slate-600 font-medium hover:text-slate-900 transition">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-slate-700">
              <MenuIcon className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav>
              <ul className="space-y-4 mt-6">
                <li>
                  <Link href="/" className="text-primary font-medium hover:text-primary-700 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-600 font-medium hover:text-slate-900 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-slate-600 font-medium hover:text-slate-900 transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
