import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { TrendingUp, Target, CreditCard, Landmark, ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getGrowthData, getMilestones, getSiteConfig } from "../services/firebase";

const MOCK_REVENUE = [
  { name: "Jan", amount: 1200 },
  { name: "Feb", amount: 2100 },
  { name: "Mar", amount: 1800 },
  { name: "Apr", amount: 3500 },
  { name: "May", amount: 4200 },
  { name: "Jun", amount: 5800 },
  { name: "Jul", amount: 7200 },
];

const MOCK_GROWTH = [
  { phase: "Start", target: 1000, current: 1000, color: "#d4af37" },
  { phase: "Foundation", target: 10000, current: 8500, color: "#d4af37" },
  { phase: "Growth", target: 100000, current: 0, color: "#a0a0a0" },
  { phase: "Expansion", target: 500000, current: 0, color: "#a0a0a0" },
  { phase: "Freedom", target: 1000000, current: 0, color: "#a0a0a0" },
];

const MOCK_MILESTONES = [
  { title: "Registration", description: "Official business setup", date: "Jan 2025", completed: true },
  { title: "First $1K", description: "Reached initial revenue goal", date: "Feb 2025", completed: true },
  { title: "Core Team", description: "Founding members joined", date: "Mar 2025", completed: true },
  { title: "$10K Foundation", description: "Stabilizing high revenue flows", date: "Sept 2025", completed: false },
  { title: "Global Expand", description: "First international office", date: "2027", completed: false },
];

export default function Dashboard() {
  const [revenueData, setRevenueData] = useState<any[]>(MOCK_REVENUE);
  const [growthPoints, setGrowthPoints] = useState<any[]>(MOCK_GROWTH);
  const [milestones, setMilestones] = useState<any[]>(MOCK_MILESTONES);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gData: any[] = await getGrowthData() || [];
        if (gData && gData.length > 0) {
          setRevenueData(gData.map(d => ({ name: d.month, amount: d.amount })));
        }
        
        const mData: any[] = await getMilestones() || [];
        if (mData && mData.length > 0) {
          setMilestones(mData);
        }

        const sData: any = await getSiteConfig();
        if (sData) {
          setConfig(sData);
        }
      } catch (e) {
        console.warn("Failed to fetch from Firebase, using mocks", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold gold-gradient tracking-tight">PROGRESS DASHBOARD</h1>
          <p className="text-muted-foreground">Real-time tracking of the ELITE GROUP $1M mission.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Live Data Stream</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: config?.totalRevenue ? `$${config.totalRevenue}` : "$7,200", trend: "+12.5%", icon: CreditCard },
          { label: "Net Worth Tracker", value: config?.netWorth ? `$${config.netWorth}` : "$12,450", trend: "+8.2%", icon: Landmark },
          { label: "Growth Multiplier", value: config?.multiplier ? `x${config.multiplier}` : "x4.2", trend: "+1.2", icon: TrendingUp },
          { label: "Mission Status", value: config?.status || "FOUNDATION", trend: "On Track", icon: Target },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="premium-card border-none">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px]">
                    {stat.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 premium-card border-none overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Monthly Revenue Growth</CardTitle>
            <CardDescription>Visualizing our climb since January 2025</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] w-full pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2c2c2c" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #d4af37", borderRadius: "12px" }}
                  itemStyle={{ color: "#d4af37" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#d4af37" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Milestone Tracker */}
        <Card className="premium-card border-none">
          <CardHeader>
            <CardTitle className="text-xl">Active Milestones</CardTitle>
            <CardDescription>Our journey to the million dollar mark</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((ms, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="relative">
                    {ms.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                    {i !== milestones.length - 1 && (
                      <div className="absolute top-6 left-3 w-px h-12 bg-border group-hover:bg-primary/30 transition-colors" />
                    )}
                  </div>
                  <div className="space-y-1 pb-6">
                    <h4 className={`font-bold leading-none ${ms.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {ms.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{ms.description}</p>
                    {ms.date && <p className="text-[10px] uppercase font-bold text-primary/60">{ms.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal progression */}
      <Card className="premium-card border-none">
        <CardHeader>
          <CardTitle className="text-xl text-center">The $1M Mission Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthPoints.length > 0 ? growthPoints : MOCK_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2c2c2c" />
              <XAxis dataKey="phase" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip 
                cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }}
                contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #d4af37", borderRadius: "12px" }}
              />
              <Bar dataKey="target" radius={[6, 6, 0, 0]}>
                {(growthPoints.length > 0 ? growthPoints : MOCK_GROWTH).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#d4af37"} opacity={0.3} />
                ))}
              </Bar>
              <Bar dataKey="current" radius={[6, 6, 0, 0]}>
                {(growthPoints.length > 0 ? growthPoints : MOCK_GROWTH).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#d4af37" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="p-6 pt-0 flex justify-center gap-8 text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm" />
              <span>Current Reached</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/30 rounded-sm" />
              <span>Target Goal</span>
            </div>
          </div>
      </Card>
    </div>
  );
}
