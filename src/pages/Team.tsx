import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTeam } from "../services/firebase";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    getTeam().then(data => {
      if (data && data.length > 0) setTeamMembers(data);
    });
  }, []);

  const displayTeam = teamMembers.length > 0 ? teamMembers : [
    {
      name: "MD Joy Hossen",
      role: "Founder & Managing Director",
      bio: "Visionary leader with a passion for building scalable elite business ecosystems.",
      image: "https://lh3.googleusercontent.com/d/17EAsoYWww3QDowMyBdis6uBaVAWnBEaG",
      badges: ["Founder", "Strategist", "Elite"],
      initials: "JH"
    },
    {
      name: "MD Tarif Hossain",
      role: "Co-Founder & Operations Lead",
      bio: "Master of systems and execution, ensuring every mission objective is met with precision.",
      image: "https://lh3.googleusercontent.com/d/11wUM19yxC7UrVODSItly9XdoMhRKR46u",
      badges: ["Co-Founder", "Operations"],
      initials: "TH"
    },
    {
      name: "MD ASIF HOSSAIN",
      role: "Technology Director",
      bio: "Pioneering the digital frontier and building the technical foundations of the ELITE GROUP ecosystem.",
      image: "https://lh3.googleusercontent.com/d/1Ja11gJERdSAHC9SbTSZKe_5MMPoqvKKg",
      badges: ["Tech Lead", "Visionary"],
      initials: "AH"
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight gold-gradient">OUR ELITE TEAM</h1>
        <p className="text-xl text-muted-foreground font-light">
          Meet the architectural minds behind global expansion and financial freedom. 
          Mission-driven, excellence-focused.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {displayTeam.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            <div className="relative premium-card p-8 rounded-3xl border-none space-y-6 flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <Avatar className="w-32 h-32 border-2 border-primary/30 gold-glow">
                  <AvatarImage src={member.image} referrerPolicy="no-referrer" />
                  <AvatarFallback className="bg-muted text-2xl font-bold">{member.initials || "EL"}</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {member.badges?.map((b: string) => (
                    <Badge key={b} variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] uppercase font-bold">
                      {b}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                <p className="text-primary font-medium text-sm border-y border-primary/20 py-2 inline-block px-4">
                  {member.role?.toUpperCase()}
                </p>
                <p className="text-muted-foreground leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                {[Twitter, Linkedin, Mail].map((Icon, idx) => (
                  <button key={idx} className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Join the Team Section */}
      <section className="bg-primary shadow-[0_0_50px_rgba(212,175,55,0.2)] rounded-3xl p-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-black mb-4">WANT TO JOIN THE ELITE?</h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8 font-medium">
          We are always looking for visionary talent to help us scale from $1M and beyond.
        </p>
        <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-black/80 h-14 px-10 rounded-full font-bold">
          Send Your Portfolio
          <Plus className="ml-2 w-5 h-5" />
        </Button>
      </section>
    </div>
  );
}
