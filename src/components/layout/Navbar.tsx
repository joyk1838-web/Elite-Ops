import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Menu, X, Rocket, Target, Users, LayoutDashboard, Calendar, Image as ImageIcon, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { path: "/", label: "Home", icon: Rocket },
  { path: "/mission", label: "Mission", icon: Target },
  { path: "/vision", label: "Vision 2030", icon: Crown },
  { path: "/team", label: "Team", icon: Users },
  { path: "/dashboard", label: "Progress", icon: LayoutDashboard },
  { path: "/timeline", label: "Timeline", icon: Calendar },
  { path: "/gallery", label: "Gallery", icon: ImageIcon },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <Logo size="md" />
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-xl font-bold tracking-wider gold-gradient">ELITE GROUP</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Building Excellence</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative gap-2 px-4 py-2 text-sm font-medium transition-all hover:text-primary",
                    isActive ? "text-primary bg-primary/5" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    />
                  )}
                </Button>
              </Link>
            );
          })}
          <div className="ml-4 h-6 w-px bg-border mx-2" />
          <Link to="/admin">
            <Button variant="outline" className="gap-2 gold-border hover:bg-primary/10 hover:text-primary">
              <Lock className="w-4 h-4" />
              Admin
            </Button>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <div className="h-px bg-border my-2" />
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg text-primary bg-primary/5 gold-border"
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
