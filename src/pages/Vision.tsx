import { motion } from "framer-motion";
import { Rocket, Globe, Layers, Zap, TrendingUp, Trophy } from "lucide-react";

const goals = [
  { year: "2025", title: "The Foundation", desc: "Setting up core systems and initial capital flow.", icon: Zap },
  { year: "2026", title: "System Building", desc: "Automating operations and recruiting top talent.", icon: Layers },
  { year: "2027", title: "Scaling Up", desc: "Exponential growth in revenue and market presence.", icon: Rocket },
  { year: "2028", title: "Brand Expansion", desc: "Launching secondary businesses in the ecosystem.", icon: Globe },
  { year: "2030", title: "Million Target", desc: "Hitting the $1M valuation and achieving total freedom.", icon: Trophy }
];

export default function Vision() {
  return (
    <div className="space-y-32 pb-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight gold-gradient">VISION 2030</h1>
        <p className="text-xl text-muted-foreground font-light">
          A roadmap for total market dominance. We aren't just looking at the next month; 
          we are architectural designers of the next decade.
        </p>
      </div>

      {/* Target Card */}
      <section className="relative group max-w-5xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-yellow-200 to-primary rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-card p-12 rounded-3xl border border-primary/20 text-center space-y-8">
          <TrendingUp className="w-20 h-20 text-primary mx-auto animate-bounce opacity-50" />
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter gold-gradient">$1M</h2>
          <p className="text-2xl font-bold uppercase tracking-[0.4em] text-muted-foreground">Company Valuation Target</p>
          <div className="w-full bg-border h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "15%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-primary gold-glow"
            />
          </div>
          <p className="text-sm text-primary font-bold uppercase tracking-widest">Phase 1: Foundation (Current)</p>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">The Elite <span className="gold-text">Ecosystem</span></h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            ELITE GROUP isn't just one business. It's a network of high-performance 
            entities designed to support one another.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { title: "Elite Academy", desc: "Training the next generation of business leaders.", icon: Trophy },
            { title: "Digital Forge", desc: "Building high-end software solutions and assets.", icon: Layers },
            { title: "Opus Investments", desc: "Strategic capital placement for long term wealth.", icon: Zap }
          ].map((eco, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-2xl premium-card border-none space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                <eco.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{eco.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{eco.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Expansion Map Placeholder */}
      <section className="relative overflow-hidden bg-black/40 border border-primary/20 rounded-3xl p-12 lg:p-24 text-center">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=2000')] bg-cover bg-center" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold gold-gradient italic">GLOBAL EXPANSION</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From regional operations to a worldwide footprint. 2030 marks the year 
            of total borderless synergy.
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            {["Dhaka", "Dubai", "New York", "London", "Singapore"].map((city) => (
              <span key={city} className="text-lg font-mono tracking-widest text-primary/80 border-b border-primary/20 px-2 py-1">
                {city.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
