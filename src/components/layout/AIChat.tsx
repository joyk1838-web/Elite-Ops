import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Welcome to the ELITE GROUP Command Center. I am your AI strategist. How can I assist you in building excellence today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: "user", content: userMessage }].map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are the official AI Strategist for ELITE GROUP. Your tone is professional, visionary, and extremely elite (luxury-focused). You represent MD Joy Hossen and the leadership team. You speak about building excellence, financial freedom, global expansion, and the ELITE TEAM 07 goals. Keep responses concise and inspiring.",
        }
      });

      const aiResponse = response.text || "I apologize, the command terminal is experiencing a brief interference. Please repeat your query.";
      setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "ai", content: "Connection to Elite Servers interrupted. Please check your clearance level." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="w-16 h-16 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] gold-glow p-0"
          >
            <MessageSquare className="w-8 h-8" />
          </Button>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "80px" : "600px",
              width: "400px"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 premium-card border-primary/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-primary/10 flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">ELITE STRATEGIST</h3>
                  <p className="text-[10px] text-primary/70 uppercase tracking-widest font-bold">Command Mode</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setIsMinimized(!isMinimized)}>
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 scrollbar-thin scrollbar-thumb-primary/20"
                >
                  {messages.map((m, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        m.role === "user" 
                        ? "bg-primary text-primary-foreground ml-4" 
                        : "bg-muted/50 border border-border mr-4"
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-70">
                          {m.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                          <span className="text-[10px] uppercase font-black">
                            {m.role === "user" ? "Commander" : "Strategist"}
                          </span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted/50 border border-border p-3 rounded-2xl flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-xs italic text-muted-foreground">Strategizing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-primary/10 bg-black/60">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Type your strategic query..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="w-full bg-muted/30 border border-primary/20 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      disabled={!input.trim() || isLoading}
                      className={`absolute right-1 w-10 h-10 rounded-lg transition-all ${
                        input.trim() ? "gold-glow opacity-100" : "opacity-30"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
