import React, { useState } from 'react';
import { Bot, Send, Sparkles, Zap, Shield, Cpu, RefreshCw } from 'lucide-react';

const AIAssistantPage = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'edith',
      text: 'Greetings Shivam. I am EDITH, your personal AI assistant. My neural modules are online and analyzing your daily tasks, expense budgets, and goal velocities. How may I assist your command today?',
      time: '07:45 PM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'Analyze my May monthly expense report',
    'Summarize my high-priority overdue tasks',
    'Generate an optimized daily focus schedule',
    'Forecast goal completion date for Learn React 19',
  ];

  const handleSend = (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    // Mock AI response generation matching EDITH tone
    setTimeout(() => {
      let aiReply = `Command processed: "${textToSend}". I have cross-referenced your database. Your productivity index is currently 88/100, and your remaining budget for May 2025 is ₹15,150.`;

      if (textToSend.toLowerCase().includes('expense')) {
        aiReply = `Analysis complete: You have spent ₹24,850 of your ₹30,000 budget (83%). Food & Dining represents your largest expenditure at ₹7,250 (29%). I recommend capping non-essential dining out for the remaining 3 days of May.`;
      } else if (textToSend.toLowerCase().includes('task')) {
        aiReply = `Priority Audit: You have 2 High-Priority tasks pending due May 29th and 31st ("Submit project report", "Prepare presentation"). Your completion velocity is 68%. Directing focus to these tasks now will boost your streak.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'edith',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col justify-between max-w-5xl mx-auto space-y-4">
      {/* Top HUD Banner */}
      <div className="p-4 rounded-2xl glass-panel flex items-center justify-between border border-crimson-900/40">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-xl bg-crimson-950 border border-crimson-700/50 shadow-crimson-glow">
            <Cpu className="w-6 h-6 text-crimson-500 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display font-bold text-base text-white flex items-center gap-2">
              EDITH NEURAL INTERFACE v2.4
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                ONLINE
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Future API Integration Ready • Gemini & OpenAI Protocol</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-400">
          <div><span className="text-crimson-500 font-bold">LATENCY:</span> 12ms</div>
          <div><span className="text-gold-400 font-bold">MODEL:</span> EDITH-v2-TURBO</div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-6 rounded-2xl glass-panel overflow-y-auto space-y-4 max-h-[500px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'bg-crimson-950 text-crimson-500 border border-crimson-700/60 shadow-crimson-glow'
              }`}
            >
              {msg.sender === 'user' ? 'YOU' : 'E'}
            </div>

            <div
              className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 border border-slate-800 text-white rounded-tr-none'
                  : 'bg-surface-card border border-crimson-950 text-slate-200 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[9px] text-slate-500 mt-2 block text-right font-mono">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-crimson-400 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>EDITH neural engine processing query...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="p-2.5 rounded-xl bg-surface-card hover:bg-crimson-950/40 border border-crimson-950 text-[11px] text-slate-300 hover:text-white transition-all text-left truncate"
          >
            💬 {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-3 p-2 bg-surface-card border border-crimson-900/40 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Issue a command to EDITH (e.g., Analyze my monthly spending)..."
          className="flex-1 bg-transparent px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-gradient-to-r from-crimson-800 to-crimson-600 hover:from-crimson-700 text-white rounded-xl shadow-crimson-glow transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default AIAssistantPage;
