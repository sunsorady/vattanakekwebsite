import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, X } from 'lucide-react';

const tips = [
  {
    en: "Drink a glass of water first thing in the morning to kickstart digestion.",
    kh: "ផឹកទឹកមួយកែវនៅពេលព្រឹកដើម្បីជួយចាប់ផ្តើមការរំលាយអាហារបានល្អ។",
    fr: "Buvez un verre d'eau le matin pour stimuler la digestion."
  },
  {
    en: "Chew your food thoroughly; digestion begins in the mouth.",
    kh: "ទំពារអាហារឲ្យម៉ត់ ព្រោះការរំលាយអាហារចាប់ផ្តើមពីមាត់។",
    fr: "Mâchez bien les aliments; la digestion commence dans la bouche."
  },
  {
    en: "Include probiotic-rich foods like yogurt or kimchi in your diet.",
    kh: "បន្ថែមអាហារដែលមានប្រូបាយអូទិក ដូចជា yogurt ឬ kimchi ក្នុងអាហាររបស់អ្នក។",
    fr: "Incluez des aliments riches en probiotiques comme le yaourt ou le kimchi."
  },
  {
    en: "Take a short walk after meals to aid digestion and lower blood sugar.",
    kh: "ដើរបន្តិចបន្ទាប់ពីញ៉ាំអាហារ ដើម្បីជួយរំលាយអាហារ និងបន្ថយជាតិស្ករក្នុងឈាម។",
    fr: "Faites une petite marche après les repas pour faciliter la digestion."
  },
  {
    en: "Avoid eating heavy meals within 3 hours of bedtime to prevent acid reflux.",
    kh: "ជៀសវាងអាហារដែលមានបរិមាណច្រើនក្នុងរយៈពេល ៣ ម៉ោង មុនពេលគេង ដើម្បីបង្ការការឡើងអាស៊ីត។",
    fr: "Évitez les repas lourds dans les 3 heures avant le coucher."
  }
];

export default function DailyGITip() {
  const [isVisible, setIsVisible] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [lang, setLang] = useState<'en' | 'kh' | 'fr'>(
  () => (localStorage.getItem('tipLang') as 'en' | 'kh' | 'fr') || 'en'
);
  useEffect(() => {
  localStorage.setItem('tipLang', lang);
}, [lang]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTipIndex(randomIndex);

    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed top-24 left-6 max-w-xs bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 shadow-lg rounded-2xl p-4 z-40"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>Daily GI Tip</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Language buttons */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 text-xs rounded-full ${
                lang === 'en'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('kh')}
              className={`px-2 py-1 text-xs rounded-full ${
                lang === 'kh'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}
            >
              KH
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-1 text-xs rounded-full ${
                lang === 'fr'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}
            >
              FR
            </button>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {tips[tipIndex][lang]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}