import { motion } from "framer-motion";
import { Home, Car, Globe, Heart, DollarSign, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const missions = [
  {
    icon: Heart,
    title: "Family Debt Free",
    desc: "Our primary mission was to clear all family burdens and ensure financial security for those we love.",
    status: "Priority",
    color: "bg-red-500/10 text-red-500"
  },
  {
    icon: Home,
    title: "Build House",
    desc: "A symbol of stability and foundation. Building a home that represents the growth of our legacy.",
    status: "In Progress",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: Car,
    title: "Dream Vehicle",
    desc: "Acquiring tools of mobility and status that match the level of our operation.",
    status: "Upcoming",
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    icon: Globe,
    title: "Global Brand",
    desc: "Transforming ELITE GROUP from a local venture into a globally recognized standard of excellence.",
    status: "Long Term",
    color: "bg-green-500/10 text-green-500"
  },
  {
    icon: Wallet,
    title: "Financial Freedom",
    desc: "Achieving a state where our time is our own, and our assets work to maintain our lifestyle.",
    status: "The Goal",
    color: "bg-primary/10 text-primary"
  }
];

export default function Mission() {
  return (
    <div className="space-y-20 pb-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight gold-gradient leading-tight">OUR MISSION</h1>
        <p className="text-xl text-muted-foreground font-light">
          Everything we do is driven by purpose. From humble beginnings to concrete achievements, 
          these are the pillars of our journey.
        </p>
      </div>

      {/* ELITE TEAM 07 Special Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10" />
        <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-full bg-primary/10 mb-4"
          >
            <DollarSign className="w-12 h-12 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            ELITE <span className="gold-text">TEAM 07</span> GOAL
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          <p className="text-2xl md:text-3xl font-heading italic text-muted-foreground leading-relaxed">
            "To transform the financial trajectory of our core unit and establish 
            unshakeable prosperity through collective excellence."
          </p>
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 premium-card rounded-2xl border-primary/20">
              <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Phase 1</h4>
              <p className="text-lg font-bold">Foundation Zero</p>
              <p className="text-sm text-muted-foreground mt-2">Clearing all historical liabilities and setting the baseline for growth.</p>
            </div>
            <div className="p-6 premium-card rounded-2xl border-primary/20 gold-glow">
              <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Phase 2</h4>
              <p className="text-lg font-bold">Asset Accumulation</p>
              <p className="text-sm text-muted-foreground mt-2">Strategic deployment of capital into high-yield elite ventures.</p>
            </div>
            <div className="p-6 premium-card rounded-2xl border-primary/20">
              <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Phase 3</h4>
              <p className="text-lg font-bold">Generational Freedom</p>
              <p className="text-sm text-muted-foreground mt-2">The complete shift into a wealth-sustaining ecosystem by 2030.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {missions.map((mission, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="premium-card h-full border-none group overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className={`p-4 rounded-2xl ${mission.color} group-hover:scale-110 transition-transform duration-500`}>
                  <mission.icon className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-50 bg-muted px-2 py-1 rounded">
                    {mission.status}
                  </span>
                  <h3 className="text-2xl font-bold">{mission.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {mission.desc}
                  </p>
                </div>
              </CardContent>
              <div className="h-1 w-full bg-primary/10 group-hover:bg-primary transition-colors" />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Philosophy Section */}
      <section className="bg-muted/30 rounded-3xl p-12 lg:p-20 border border-border">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">The Elite <span className="gold-text">Philosophy</span></h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                We believe that true wealth is not just about numbers—it's about the ability 
                to provide, create, and lead. Our mission is personal, but our execution is professional.
              </p>
              <p>
                Every milestone achieved is a testament to the fact that with enough focus and 
                discipline, any barrier can be broken. We are not just clearing debts; we are 
                clearing paths for future generations.
              </p>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black gold-text">100%</span>
                <span className="text-xs uppercase tracking-tighter opacity-50">Commitment</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex flex-col">
                <span className="text-3xl font-black gold-text">2030</span>
                <span className="text-xs uppercase tracking-tighter opacity-50">Vision Target</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 blur-2xl rounded-full" />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
              alt="Mission planning"
              className="relative rounded-2xl object-cover aspect-video gold-border"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
