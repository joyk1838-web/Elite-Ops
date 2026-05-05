import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, ShieldCheck, Gem, Quote, Users, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBrands, getTeam } from "../services/firebase";
import { Logo } from "@/components/ui/Logo";

export default function Home() {
  const [brands, setBrands] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    getBrands().then(data => {
      if (data && data.length > 0) setBrands(data);
    });
    getTeam().then(data => {
      if (data && data.length > 0) setTeamMembers(data.slice(0, 3));
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Luxury Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-[#2d240d] animate-gradient-shimmer" />
          <div className="absolute inset-0 luxury-mesh opacity-60" />
          
          {/* Drifting Light Orbs */}
          <motion.div 
            animate={{ 
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -40, 40, 0],
              y: [0, 60, -60, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" 
          />
          
          {/* Grid Overlay for structure */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center space-y-8 max-w-4xl"
        >
          <motion.div variants={item} className="mb-4">
            <Logo size="lg" className="mx-auto mb-6" />
          </motion.div>

          <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-widest mb-4">
            <Gem className="w-3 h-3" />
            <span>ELITE TEAM 07 • The $1M Mission</span>
          </motion.div>
          
          <motion.h1 variants={item} className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            BUILDING <br />
            <span className="gold-gradient">EXCELLENCE</span>
          </motion.h1>

          <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            From <span className="text-primary font-medium">$1K to $1M</span>. 
            We are building a legacy of financial freedom, global expansion, and elite businesses.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg gold-glow hover:scale-105 transition-transform">
                View Progress Dashboard
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-primary/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Button 
                onClick={() => {
                  const chatBtn = document.querySelector('button.rounded-full.gold-glow') as HTMLButtonElement;
                  if (chatBtn) chatBtn.click();
                }}
                size="lg" 
                variant="outline" 
                className="relative h-14 px-8 text-lg border-primary/20 hover:bg-primary/5 bg-background"
              >
                Consult AI Strategist
                <Bot className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
          <img
            src="https://lh3.googleusercontent.com/d/17EAsoYWww3QDowMyBdis6uBaVAWnBEaG"
            alt="MD Joy Hossen"
            className="relative rounded-2xl object-cover aspect-[4/5] gold-border gold-glow w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 left-8 right-8 p-6 premium-card rounded-xl">
            <p className="text-primary font-heading italic text-xl mb-2">"Vision without execution is just hallucination."</p>
            <p className="font-bold text-lg">MD Joy Hossen</p>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">Founder & MD</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              A Company Built on <br />
              <span className="gold-text italic">Pure Ambition</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            ELITE GROUP was founded with a singular purpose: to prove that excellence can be engineered. 
            We started with a vision to clear family debts and have since evolved into a mission 
            to create a global ecosystem of thriving businesses.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Target, title: "Precision", desc: "Every move is calculated for maximum growth." },
              { icon: ShieldCheck, title: "Integrity", desc: "Built on a foundation of trust and hard work." },
              { icon: TrendingUp, title: "Scalability", desc: "Designed to expand globally by 2030." },
              { icon: Gem, title: "Excellence", desc: "Only the elite standard is acceptable." }
            ].map((feature, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border group hover:border-primary/30 transition-colors">
                <feature.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Brands Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-widest"
          >
            <TrendingUp className="w-3 h-3" />
            <span>Market Dominance</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            CORE <span className="gold-text">BRANDS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground font-light">
            Diverse assets, unified by excellence. ELITE GROUP operates at the intersection 
            of lifestyle, finance, and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(brands.length > 0 ? brands : [
            {
              name: "Elite Soft Drink",
              tagline: "Ultra-Premium Hydration",
              image: "https://lh3.googleusercontent.com/d/1zd5W3ODQ-8wdU8zn_ABNn8CR7a-6BTgz",
              link: "#",
              desc: "Engineered for elite performance and cognitive clarity."
            },
            {
              name: "Elite Funder",
              tagline: "Capitalized Scaling",
              image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
              link: "#",
              desc: "Revolutionizing business funding and wealth generation."
            },
            {
              name: "Elite Fashion",
              tagline: "Bespoke Luxury",
              image: "https://lh3.googleusercontent.com/d/1J1UaPpZ95un_go-wFGAQ8sMiUMUsdIDZ",
              link: "#",
              desc: "High-end artisanal apparel for the discerning visionary."
            }
          ]).map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-500 bg-card"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{brand.tagline}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{brand.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {brand.desc}
                </p>
                <Link to={brand.link} className="inline-flex items-center text-primary text-xs font-bold uppercase tracking-widest group/link">
                  Explore Brand
                  <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Teaser */}
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-widest"
            >
              <Users className="w-3 h-3" />
              <span>Elite Talent</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              MEET THE <span className="gold-text">LEADERSHIP</span>
            </h2>
          </div>
          <Link to="/team">
            <Button variant="outline" className="gold-border group transition-all hover:bg-primary/5">
              View All Management
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(teamMembers.length > 0 ? teamMembers : [
            { name: "MD Joy Hossen", role: "MD & Founder", image: "https://lh3.googleusercontent.com/d/17EAsoYWww3QDowMyBdis6uBaVAWnBEaG" },
            { name: "MD Tarif Hossain", role: "Co-Founder", image: "https://lh3.googleusercontent.com/d/11wUM19yxC7UrVODSItly9XdoMhRKR46u" },
            { name: "MD ASIF HOSSAIN", role: "Tech Director", image: "https://lh3.googleusercontent.com/d/1Ja11gJERdSAHC9SbTSZKe_5MMPoqvKKg" }
          ]).map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl group"
            >
              <img src={member.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={member.name} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                <p className="text-primary text-[10px] uppercase tracking-widest font-bold mb-1">{member.role}</p>
                <h3 className="text-xl font-bold">{member.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress Teaser - Simplified */}
      <section className="space-y-16 py-20 border-y border-primary/10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            COMPANY <span className="gold-text">PROGRESS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground font-light">
            Tracking our growth toward the 2030 vision. Transparent metrics for a performance-driven organization.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Assets Under Mgmt", value: "$12,450", prefix: "", suffix: "+" },
            { label: "Elite Growth", value: "4.2", prefix: "x", suffix: "" },
            { label: "Operating Brands", value: brands.length || "3", prefix: "", suffix: "" },
            { label: "Planned Units", value: "15", prefix: "", suffix: "" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 premium-card rounded-2xl">
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-4">{stat.label}</p>
              <h3 className="text-3xl md:text-4xl font-black gold-gradient">
                {stat.prefix}{stat.value}{stat.suffix}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/timeline">
            <Button size="lg" className="gold-glow">
              View Detailed Roadmap
              <TrendingUp className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Admin Transparency Footer Section */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto opacity-30" />
          <h3 className="text-2xl font-bold">Protocol Transparency</h3>
          <p className="text-muted-foreground">
            ELITE GROUP maintains full administrative transparency for stakeholders. 
            MD clearance required for command terminal access.
          </p>
          <Link to="/admin">
            <Button variant="ghost" className="text-primary font-bold tracking-widest uppercase text-xs hover:bg-primary/10">
              Access Command Center
            </Button>
          </Link>
        </div>
      </section>

      {/* CEO Message / Quote */}
      <section className="text-center py-20 relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10">
        <div className="absolute top-0 left-0 p-12 opacity-10">
          <Quote className="w-32 h-32 text-primary" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Quote className="w-12 h-12 text-primary mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-heading italic leading-snug mb-8">
            "We are not just building a company; we are building an ecosystem where 
            financial freedom is the baseline, and global impact is the goal."
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-px bg-primary/30 mb-4" />
            <p className="text-xl font-bold tracking-widest gold-text">JOY HOSSEN</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Message from the MD</p>
          </div>
        </div>
      </section>
    </div>
  );
}
