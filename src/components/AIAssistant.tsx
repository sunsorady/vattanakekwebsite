import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am Megan AI. How can I help you with your digestive health today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMsg = input.trim();
  setInput('');
  setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
  setIsLoading(true);

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error('Missing VITE_GEMINI_API_KEY in .env');
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMsg,
      config: {
        systemInstruction:
          "You are Dr. EK AI, a helpful medical assistant for a gastroenterologist website. Answer only digestive and liver health questions. Keep answers concise. Always include this disclaimer at the end: Disclaimer: This does not replace professional medical consultation."
      }
    });

    setMessages(prev => [
      ...prev,
      {
        role: 'ai',
        text: response.text || 'Sorry, I could not process that.'
      }
    ]);
  } catch (error: any) {
    console.error('Gemini error:', error);
    setMessages(prev => [
      ...prev,
      {
        role: 'ai',
        text: `Error: ${error?.message || 'Unknown error'}`
      }
    ]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <motion.button
        className="fixed bottom-24 md:bottom-6 right-6 md:right-32 w-14 h-14 bg-gradient-to-r from-rose-500 to-orange-400 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-40 md:bottom-24 right-6 md:right-32 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: '70vh' }}
          >
            <div className="p-4 bg-gradient-to-r from-rose-500 to-orange-400 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">Ask Me Chatbot</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-rose-500 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 dark:text-white border border-slate-100 dark:border-slate-600 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <motion.div className="w-2 h-2 bg-rose-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-rose-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 bg-rose-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a medical question..."
                  className="flex-1 bg-transparent outline-none text-sm dark:text-white"
                />
                <button onClick={handleSend} disabled={isLoading || !input.trim()} className="text-rose-500 disabled:opacity-50">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
