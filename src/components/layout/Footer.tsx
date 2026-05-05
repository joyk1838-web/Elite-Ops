import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Logo size="md" />
              <div className="flex flex-col leading-tight">
                <span className="font-heading text-2xl font-bold tracking-wider gold-gradient">ELITE GROUP</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Building Excellence</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Our mission is to build a global ecosystem of elite businesses, 
              scaling from humble beginnings to a million-dollar empire.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all gold-glow"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-6 gold-text">Navigation</h4>
            <ul className="space-y-4">
              {["Home", "Mission", "Vision", "Team", "Progress"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-yellow-600/50">
          <p>© 2026 ELITE GROUP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
