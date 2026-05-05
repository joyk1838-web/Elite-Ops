import { motion } from "framer-motion";
import { Lock, Crown, LogOut, ShieldCheck, Edit, Plus, Trash2, Save, Database, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { updateSiteConfig, getBrands, getTeam, getTimeline, updateTimelineEvent } from "../services/firebase";
import { db } from "../lib/firebase";
import { collection, setDoc, doc } from "firebase/firestore";

export default function Admin() {
  const { user, login, logout, isAdmin, loading, error } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
      getBrands().then(data => setBrands(data || []));
      getTeam().then(data => setTeamMembers(data || []));
      getTimeline().then(data => setTimeline(data || []));
    }
  }, [isAdmin]);

  // Seed Function for Initial Data
  const seedData = async () => {
    if (!isAdmin) return;
    setSaving(true);
    try {
      await updateSiteConfig({
        title: "Building Excellence",
        mission: "Scale from $1K to $1M and achieve total financial freedom.",
        vision: "Global dominance by 2030.",
        totalRevenue: "7,200",
        netWorth: "12,450",
        multiplier: "4.2",
        status: "FOUNDATION"
      });

      // Seed Brands
      const demoBrands = [
        { 
          id: 'brand-1', 
          name: "Elite Soft Drink", 
          tagline: "Ultra-Premium Hydration", 
          image: "https://lh3.googleusercontent.com/d/1zd5W3ODQ-8wdU8zn_ABNn8CR7a-6BTgz", 
          desc: "Engineered for elite performance and cognitive clarity.",
          order: 1 
        },
        { 
          id: 'brand-2', 
          name: "Elite Funder", 
          tagline: "Capitalized Scaling", 
          image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000", 
          desc: "Revolutionizing business funding and wealth generation.",
          order: 2 
        },
        { 
          id: 'brand-3', 
          name: "Elite Fashion", 
          tagline: "Bespoke Luxury", 
          image: "https://lh3.googleusercontent.com/d/1J1UaPpZ95un_go-wFGAQ8sMiUMUsdIDZ", 
          desc: "High-end artisanal apparel for the discerning visionary.",
          order: 3 
        }
      ];

      for (const b of demoBrands) {
        await setDoc(doc(db, "brands", b.id), b);
      }

      const team = [
        { 
          id: 'joy',
          name: "MD Joy Hossen", 
          role: "Founder & Managing Director", 
          bio: "Visionary leader with a passion for building scalable elite business ecosystems.", 
          image: "https://lh3.googleusercontent.com/d/17EAsoYWww3QDowMyBdis6uBaVAWnBEaG",
          badges: ["Founder", "Strategist", "Elite"],
          initials: "JH",
          order: 1 
        },
        { 
          id: 'tarif',
          name: "MD Tarif Hossain", 
          role: "Co-Founder & Operations Lead", 
          bio: "Master of systems and execution, ensuring every mission objective is met with precision.", 
          image: "https://lh3.googleusercontent.com/d/11wUM19yxC7UrVODSItly9XdoMhRKR46u",
          badges: ["Co-Founder", "Operations"],
          initials: "TH",
          order: 2 
        },
        { 
          id: 'asif',
          name: "MD ASIF HOSSAIN", 
          role: "Technology Director", 
          bio: "Pioneering the digital frontier and building the technical foundations of the ELITE GROUP ecosystem.", 
          image: "https://lh3.googleusercontent.com/d/1Ja11gJERdSAHC9SbTSZKe_5MMPoqvKKg",
          badges: ["Tech Lead", "Visionary"],
          initials: "AH",
          order: 3 
        },
      ];

      for (const t of team) {
        await setDoc(doc(db, "team", t.id), t);
      }

      // Seed Timeline
      const demoTimeline = [
        { id: 'ev1', year: "2025", title: "THE IGNITION", desc: "ELITE GROUP officially started with a mission to change the lineage's financial story.", icon: "Rocket", status: "completed", order: 1 },
        { id: 'ev2', year: "2026", title: "SYSTEMS CO-PILOT", desc: "Focus on building robust business systems and automation workflows.", icon: "Shield", status: "current", order: 2 },
        { id: 'ev3', year: "2027", title: "SCALING SYNERGY", desc: "Expanding operations across multiple sectors and increasing team capacity.", icon: "Milestone", status: "upcoming", order: 3 },
        { id: 'ev4', year: "2028", title: "GLOBAL FOOTPRINT", desc: "Strategic international presence and brand dominance.", icon: "Flag", status: "upcoming", order: 4 },
        { id: 'ev5', year: "2029", title: "MILLION DOLLAR ARCH", desc: "The final push towards the seven-figure company target.", icon: "Crown", status: "upcoming", order: 5 },
      ];

      for (const ev of demoTimeline) {
        await setDoc(doc(db, "timeline", ev.id), ev);
      }

      alert("Database Seeded Successfully!");
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("Seeding failed: Check Firestore Rules");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Crown className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full premium-card p-12 rounded-3xl text-center space-y-8"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto gold-border gold-glow">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black gold-gradient tracking-tight">ELITE ACCESS</h1>
            <p className="text-muted-foreground text-sm">
              Authorized personnel only. Please authenticate to access the command center.
            </p>
          </div>
          <Button 
            onClick={login}
            size="lg" 
            className="w-full h-14 font-bold text-lg gold-glow hover:scale-105 transition-transform"
          >
            Authenticate with Google
          </Button>
          {error && (
            <p className="text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Secure Entry Protocol v2.5
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <ShieldCheck className="w-20 h-20 text-red-500 mx-auto opacity-50" />
          <h2 className="text-4xl font-bold">ACCESS DENIED</h2>
          <p className="text-muted-foreground max-w-sm">
            Authenticated as <span className="text-primary font-bold">{user.email}</span>. 
             This account does not have MD clearance.
          </p>
          <Button variant="outline" onClick={logout} className="gold-border">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [editingTimeline, setEditingTimeline] = useState<any>(null);

  const saveBrand = async (brand: any) => {
    setSaving(true);
    try {
      const brandId = brand.id || doc(collection(db, "brands")).id;
      await setDoc(doc(db, "brands", brandId), brand, { merge: true });
      alert("Brand updated successfully");
      setEditingBrand(null);
      getBrands().then(data => setBrands(data || []));
    } catch (e) {
      console.error(e);
      alert("Failed to save brand");
    } finally {
      setSaving(false);
    }
  };

  const saveTimeline = async (ev: any) => {
    setSaving(true);
    try {
      const id = ev.id || doc(collection(db, "timeline")).id;
      await setDoc(doc(db, "timeline", id), ev, { merge: true });
      alert("Timeline event updated");
      setEditingTimeline(null);
      getTimeline().then(data => setTimeline(data || []));
    } catch (e) {
      console.error(e);
      alert("Failed to save timeline event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black gold-gradient">ADMIN COMMAND CENTER</h1>
          <p className="text-muted-foreground mt-1">Hello, MD Joy Hossen. Manage the Elite Ecosystem.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={seedData} disabled={saving} className="gold-border gap-2">
            <Database className="w-4 h-4" />
            Seed Mock Data
          </Button>
          <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-red-500 gap-2">
            <LogOut className="w-4 h-4" />
            Terminate Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-card border border-border p-1 h-auto flex-wrap mb-8">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-black px-6 py-2 rounded-md font-bold uppercase text-[10px] tracking-widest">
            General
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-black px-6 py-2 rounded-md font-bold uppercase text-[10px] tracking-widest">
            Leadership
          </TabsTrigger>
          <TabsTrigger value="brands" className="data-[state=active]:bg-primary data-[state=active]:text-black px-6 py-2 rounded-md font-bold uppercase text-[10px] tracking-widest">
            Core Brands
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-black px-6 py-2 rounded-md font-bold uppercase text-[10px] tracking-widest">
            History
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-black px-6 py-2 rounded-md font-bold uppercase text-[10px] tracking-widest">
            Roadmap
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="premium-card border-none">
            <CardHeader>
              <CardTitle>Global Identity</CardTitle>
              <CardDescription>Fundamental values and tracking metrics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary">Mission</label>
                    <Input className="bg-muted border-none" defaultValue="Building Excellence..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary">Net Worth Goal</label>
                    <Input className="bg-muted border-none" defaultValue="$12,450" />
                  </div>
               </div>
               <Button className="gold-glow w-full" disabled={saving}>
                 <Save className="w-4 h-4 mr-2" /> Commit Changes
               </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Leadership Command</h3>
            <Button size="sm" className="gold-border" variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add Elite Member
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="bg-card border-border">
                <CardContent className="p-6 flex items-center gap-6">
                  <img src={member.image} className="w-16 h-16 rounded-full object-cover gold-glow border-2 border-primary/20" alt={member.name} />
                  <div className="flex-1">
                    <p className="font-bold">{member.name}</p>
                    <p className="text-xs text-primary uppercase tracking-widest">{member.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brands" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Brand Portfolio</h3>
            <Button size="sm" className="gold-border" variant="outline" onClick={() => setEditingBrand({ name: "", tagline: "", image: "", desc: "", order: brands.length + 1 })}>
              <Plus className="w-4 h-4 mr-2" /> Deploy New Brand
            </Button>
          </div>

          {editingBrand && (
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{editingBrand.id ? "Edit Brand" : "New Brand Asset"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Brand Name" value={editingBrand.name} onChange={e => setEditingBrand({...editingBrand, name: e.target.value})} />
                  <Input placeholder="Tagline" value={editingBrand.tagline} onChange={e => setEditingBrand({...editingBrand, tagline: e.target.value})} />
                  <Input placeholder="Image URL" value={editingBrand.image} onChange={e => setEditingBrand({...editingBrand, image: e.target.value})} />
                  <Input type="number" placeholder="Order" value={editingBrand.order} onChange={e => setEditingBrand({...editingBrand, order: parseInt(e.target.value)})} />
                </div>
                <Textarea placeholder="Description" value={editingBrand.desc} onChange={e => setEditingBrand({...editingBrand, desc: e.target.value})} />
                <div className="flex gap-2">
                  <Button className="gold-glow flex-1" onClick={() => saveBrand(editingBrand)} disabled={saving}>Save Entry</Button>
                  <Button variant="ghost" onClick={() => setEditingBrand(null)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Card key={brand.id} className="bg-card border-border overflow-hidden">
                <img src={brand.image} className="w-full h-32 object-cover grayscale-[0.5]" alt={brand.name} />
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{brand.tagline}</p>
                  <p className="font-bold">{brand.name}</p>
                  <div className="flex justify-end gap-2 pt-2 border-t border-border mt-4">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setEditingBrand(brand)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="p-12 text-center border border-dashed border-border rounded-xl">
           <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
           <p className="font-bold">Operational Milestones</p>
           <p className="text-sm text-muted-foreground">Strategic objectives and mission progress telemetry.</p>
           {/* Milestone management components would go here */}
        </TabsContent>
        <TabsContent value="timeline" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Operational Roadmap</h3>
            <Button size="sm" className="gold-border" variant="outline" onClick={() => setEditingTimeline({ year: "", title: "", desc: "", status: "upcoming", icon: "Milestone", order: timeline.length + 1 })}>
              <Plus className="w-4 h-4 mr-2" /> Add Journey Point
            </Button>
          </div>

          {editingTimeline && (
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{editingTimeline.id ? "Edit Journey Point" : "New Journey Point"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Year" value={editingTimeline.year} onChange={e => setEditingTimeline({...editingTimeline, year: e.target.value})} />
                  <Input placeholder="Title" value={editingTimeline.title} onChange={e => setEditingTimeline({...editingTimeline, title: e.target.value})} />
                  <Input placeholder="Icon (Rocket, Shield, Milestone, Flag, Crown)" value={editingTimeline.icon} onChange={e => setEditingTimeline({...editingTimeline, icon: e.target.value})} />
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingTimeline.status}
                    onChange={e => setEditingTimeline({...editingTimeline, status: e.target.value})}
                  >
                    <option value="completed">Completed</option>
                    <option value="current">Current</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <Textarea placeholder="Description" value={editingTimeline.desc} onChange={e => setEditingTimeline({...editingTimeline, desc: e.target.value})} />
                <div className="flex gap-2">
                  <Button className="gold-glow flex-1" onClick={() => saveTimeline(editingTimeline)} disabled={saving}>Confirm Phase</Button>
                  <Button variant="ghost" onClick={() => setEditingTimeline(null)}>Abort</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {timeline.sort((a,b) => (a.order || 0) - (b.order || 0)).map((ev) => (
              <Card key={ev.id} className="bg-card border-border">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-primary">{ev.year}</span>
                    <h4 className="font-bold">{ev.title}</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{ev.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => setEditingTimeline(ev)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
