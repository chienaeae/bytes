'use client';

import { Menu, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';

import { ScalableSearchBar } from '../search-bar/ScalableSearchBar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        isSearchFocused
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchFocused]);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  return (
    <>
      {/* Overlay when search is focused */}
      {isSearchFocused && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsSearchFocused(false)}
        />
      )}

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-background'
        } ${isSearchFocused ? 'h-24 shadow-md' : 'h-20'}`}
      >
        <div className="container flex items-center justify-between min-w-full px-12 h-full">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="hidden sm:inline-block text-4xl font-extrabold tracking-tighter">
              BITES
            </span>
          </NavLink>

          {/* Desktop Navigation - on the right side */}
          <nav className="hidden md:flex items-center gap-10 relative">
            <ScalableSearchBar
              expandedWidth="w-[400px]"
              placeholder="Search..."
              onFocus={handleSearchFocus}
              focused={isSearchFocused}
              ref={searchContainerRef}
            />

            <NavLink to="/" className="text-md font-medium transition-colors hover:text-primary">
              Home
            </NavLink>
            <NavLink
              to="/ai-chat"
              className="text-md font-medium transition-colors hover:text-primary"
            >
              Ask AI
            </NavLink>
            <NavLink
              to="/about"
              className="text-md font-medium transition-colors hover:text-primary"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-md font-medium transition-colors hover:text-primary"
            >
              Contact
            </NavLink>
          </nav>

          {/* Mobile Menu - Only visible on mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              {/* Mobile Search */}
              <div className="mt-6 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="Search..." className="pl-9 pr-4" />
                </div>
              </div>

              <nav className="flex flex-col gap-4 mt-10">
                <NavLink
                  to="/"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/ai-chat"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  Ask AI
                </NavLink>
                <NavLink
                  to="/about"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  Contact
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
