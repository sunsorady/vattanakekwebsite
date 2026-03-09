import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home, User, Video, Stethoscope, Mail, Sun, Moon } from 'lucide-react';

import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import VideosPage from './pages/VideosPage';
import ClinicalToolsPage from './pages/ClinicalToolsPage';
import ContactPage from './pages/ContactPage';

import AIAssistant from './components/AIAssistant';
import DailyGITip from './components/DailyGITip';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<'en' | 'kh' | 'fr'>('en');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'portfolio', icon: User, label: 'Portfolio' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'tools', icon: Stethoscope, label: 'Library' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'home': return <HomePage setSection={setCurrentSection} lang={lang} setLang={setLang} />;
      case 'portfolio': return <PortfolioPage />;
      case 'videos': return <VideosPage />;
      case 'tools': return <ClinicalToolsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setSection={setCurrentSection} lang={lang} setLang={setLang} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent cursor-pointer" onClick={() => setCurrentSection('home')}>
          Dr. EK Vattanak
        </div>
        <div className="flex items-center gap-4">
          {/* Language Selector */}
         
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 w-full md:w-24 md:h-screen md:right-0 md:bottom-auto md:top-0 bg-white dark:bg-slate-900 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 z-40 flex md:flex-col justify-around md:justify-center items-center py-2 md:py-0 md:gap-8 overflow-x-auto shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:shadow-[-10px_0_40px_rgba(0,0,0,0.05)]">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentSection(item.id)}
            className={`flex flex-col items-center gap-1 p-2 md:p-3 rounded-xl transition-all ${currentSection === item.id ? 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'text-slate-500 hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] md:text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-24 md:pb-12 md:pr-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
  key={currentSection}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  {renderSection()}
</motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Widgets */}
      <AIAssistant />
      <DailyGITip />
    </div>
  );
}
