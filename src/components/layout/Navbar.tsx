import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  Library, 
  Upload, 
  Heart, 
  Settings, 
  LogOut, 
  Menu,
  X,
  User
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const navLinks = [
  { href: "/home", label: "Home", icon: BookOpen },
  { href: "/library", label: "Library", icon: Library },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/import", label: "Import", icon: Upload },
];

export function Navbar({ isAuthenticated = false, onLogout }: NavbarProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient-gold">ShelfFlix</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild className="golden-glow">
                <Link to="/auth?mode=signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-gold hidden sm:block">ShelfFlix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "nav-link flex items-center gap-2",
                  location.pathname === link.href && "nav-link-active"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={cn(
              "relative transition-all duration-300",
              searchOpen ? "w-64" : "w-10"
            )}>
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search books, audiobooks..."
                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none input-glow"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="w-10 h-10"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Settings */}
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link to="/settings">
                <Settings className="w-5 h-5" />
              </Link>
            </Button>

            {/* User Menu */}
            <Button variant="ghost" size="icon" onClick={onLogout} className="hidden sm:flex">
              <LogOut className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout?.();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
