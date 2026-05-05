import { motion } from "framer-motion";
import { Milestone, Flag, Rocket, Shield, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { getTimeline } from "../services/firebase";

const iconMap: Record<string, any> = {
  Rocket,
  Shield,
  Milestone,
  Flag,
  Crown
};

export default function Timeline() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getTimeline().then(data => {
      if (data && data.length > 0) setEvents(data);
    });
  }, []);

  const displayEvents = events.length > 0 ? events : [
    { year: "2025", title: "THE IGNITION", desc: "ELITE GROUP officially started with a mission to change the lineage's financial story.", icon: "Rocket", status: "completed" },
    { year: "2026", title: "SYSTEMS CO-PILOT", desc: "Focus on building robust business systems and automation workflows.", icon: "Shield", status: "current" },
    { year: "2027", title: "SCALING SYNERGY", desc: "Expanding operations across multiple sectors and increasing team capacity.", icon: "Milestone", status: "upcoming" },
    { year: "2028", title: "GLOBAL FOOTPRINT", desc: "Strategic international presence and brand dominance.", icon: "Flag", status: "upcoming" },
    { year: "2029", title: "MILLION DOLLAR ARCH", desc: "The final push towards the seven-figure company target.", icon: "Crown", status: "upcoming" }
  ];

  return (
    <div className="space-y-20 pb-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight gold-gradient">JOURNEY TIMELINE</h1>
        <p className="text-xl text-muted-foreground font-light">
          The sequence of excellence. Mapping our past achievements and defining our future milestones.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-border md:block hidden" />
        
        <div className="space-y-12 md:space-y-0">
          {displayEvents.map((event, i) => {
            const Icon = iconMap[event.icon] || Milestone;
            return (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full md:w-[45%] group"
                >
                  <div className={`p-8 rounded-3xl premium-card border-none space-y-4 relative overflow-hidden ${
                    event.status === 'current' ? "gold-border gold-glow" : ""
                  }`}>
                    {event.status === 'current' && (
                      <div className="absolute top-0 right-0 p-2">
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">
                          CURRENT PHASE
                        </span>
                      </div>
                    )}
                    <Icon className={`w-10 h-10 ${event.status === 'completed' || event.status === 'current' ? "text-primary" : "text-muted-foreground"}`} />
                    <h3 className="text-2xl font-bold font-heading tracking-tight">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed italic">
                      {event.desc}
                    </p>
                    <div className="flex justify-between items-center pt-4 opacity-50">
                      <span className="text-5xl font-black font-heading gold-text opacity-20">{event.year}</span>
                      <Milestone className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>

                {/* Center Dot */}
                <div className="hidden md:flex relative z-10 w-[10%] justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center bg-background ${
                    event.status === 'completed' || event.status === 'current' ? "border-primary" : "border-border"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      event.status === 'completed' || event.status === 'current' ? "bg-primary" : "bg-border"
                    }`} />
                  </div>
                </div>

                {/* Spacer for empty side */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Footer */}
      <section className="text-center space-y-8 bg-black/40 p-12 rounded-3xl gold-border gold-glow max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold italic">"The best way to predict the future is to create it."</h2>
        <div className="flex justify-center items-center gap-4">
          <div className="h-px w-12 bg-primary/30" />
          <p className="font-mono text-primary tracking-widest uppercase">ELITE GROUP DOCTRINE</p>
          <div className="h-px w-12 bg-primary/30" />
        </div>
      </section>
    </div>
  );
}
