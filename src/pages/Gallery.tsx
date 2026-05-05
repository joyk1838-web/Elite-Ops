import { motion } from "framer-motion";
import { Maximize2, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getGallery } from "../services/firebase";

const MOCK_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000", title: "Corporate HQ Planning", category: "Office" },
  { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000", title: "Team Strategy Session", category: "Meeting" },
  { url: "https://lh3.googleusercontent.com/d/17EAsoYWww3QDowMyBdis6uBaVAWnBEaG", title: "MD Joy Hossen Portrait", category: "Achievement" },
  { url: "https://lh3.googleusercontent.com/d/11wUM19yxC7UrVODSItly9XdoMhRKR46u", title: "MD Tarif Hossain Portrait", category: "Achievement" },
  { url: "https://lh3.googleusercontent.com/d/1Ja11gJERdSAHC9SbTSZKe_5MMPoqvKKg", title: "MD ASIF HOSSAIN Portrait", category: "Achievement" },
  { url: "https://lh3.googleusercontent.com/d/1zd5W3ODQ-8wdU8zn_ABNn8CR7a-6BTgz", title: "ELITE SOFT DRINK", category: "Venture" },
  { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000", title: "Elite Command Center", category: "Office" },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000", title: "Project Milestones", category: "Achievement" },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000", title: "Executive Boardroom", category: "Meeting" },
];

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>(MOCK_PHOTOS);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        if (data && data.length > 0) {
          setPhotos(data);
        }
      } catch (e) {
        console.warn("Using mock gallery data");
      }
    };
    fetchGallery();
  }, []);

  const categories = ["All", ...new Set(photos.map(p => p.category))];
  const filteredPhotos = filter === "All" ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="space-y-16 pb-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight gold-gradient">VISUAL ARCHIVE</h1>
        <p className="text-xl text-muted-foreground font-light">
          A retrospective of excellence. Capturing the moments that define our 
          journey to the elite level.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 font-bold text-xs uppercase tracking-widest ${
              filter === cat 
                ? "bg-primary text-primary-foreground border-primary gold-glow" 
                : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPhotos.map((photo, i) => (
          <div key={i}>
            <Dialog>
              <DialogTrigger asChild>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-card aspect-[4/3] border border-border hover:border-primary/30 transition-colors"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Tag className="w-4 h-4" />
                      <span className="text-[10px] uppercase font-black tracking-widest">{photo.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{photo.title}</h3>
                    <div className="absolute top-4 right-4 bg-primary p-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500">
                      <Maximize2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 bg-card border-t border-border sm:border-none">
                  <h3 className="text-xl font-bold">{photo.title}</h3>
                  <p className="text-muted-foreground uppercase tracking-widest text-xs mt-2">{photo.category}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </motion.div>

      {/* Achievement Badges Section */}
      <section className="pt-20 text-center space-y-12">
        <h2 className="text-3xl font-bold gold-gradient uppercase tracking-widest">Global Achievements</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {[
            { label: "Elite Member", icon: "🏆" },
            { label: "Millionaire Mission", icon: "✨" },
            { label: "Master Strategist", icon: "🧠" },
            { label: "Global Presence", icon: "🌍" },
            { label: "Fast Growth", icon: "🚀" }
          ].map((badge, i) => (
            <motion.div
              key={i}
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-4xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 gold-glow">
                {badge.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
