import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Share2, Globe2, X, Activity } from 'lucide-react';
import InteractiveAnatomy from '../components/InteractiveAnatomy';
import LiverHealthQuiz from '../components/LiverHealthQuiz';

const giFacts = [
{ en: "The stomach uses acid to break down food.", kh: "ក្រពះប្រើអាស៊ីតដើម្បីរំលាយអាហារ", fr: "L'estomac utilise l'acide pour décomposer les aliments." },
{ en: "The pancreas produces enzymes that help digest food.", kh: "លំពែងផលិតអង់ស៊ីមដែលជួយរំលាយអាហារ", fr: "Le pancréas produit des enzymes qui aident à digérer les aliments." },
{ en: "The gallbladder stores bile produced by the liver.", kh: "ថង់ទឹកប្រមាត់រក្សាទុកទឹកប្រមាត់ដែលផលិតដោយថ្លើម", fr: "La vésicule biliaire stocke la bile produite par le foie." },
{ en: "Bile helps digest fats in the small intestine.", kh: "ទឹកប្រមាត់ជួយរំលាយជាតិខ្លាញ់ក្នុងពោះវៀនតូច", fr: "La bile aide à digérer les graisses dans l'intestin grêle." },
{ en: "The small intestine is about 6 meters long.", kh: "ពោះវៀនតូចមានប្រវែងប្រហែល ៦ ម៉ែត្រ", fr: "L'intestin grêle mesure environ 6 mètres." },
{ en: "Most nutrient absorption occurs in the small intestine.", kh: "ការស្រូបយកសារធាតុចិញ្ចឹមភាគច្រើនកើតឡើងក្នុងពោះវៀនតូច", fr: "La plupart de l'absorption des nutriments se fait dans l'intestin grêle." },
{ en: "The esophagus moves food to the stomach using muscle contractions.", kh: "បំពង់អាហារជួយបញ្ជូនអាហារទៅក្រពះដោយចលនាសាច់ដុំ", fr: "L'œsophage transporte les aliments vers l'estomac grâce à des contractions musculaires." },
{ en: "Acid reflux occurs when stomach acid flows back into the esophagus.", kh: "អាស៊ីតក្រពះត្រឡប់ឡើងទៅបំពង់អាហារបង្កឲ្យមានអាស៊ីតឡើង", fr: "Le reflux acide se produit lorsque l'acide de l'estomac remonte dans l'œsophage." },
{ en: "Helicobacter pylori infection can cause stomach ulcers.", kh: "ការឆ្លងមេរោគ Helicobacter pylori អាចបង្កឲ្យមានដំបៅក្រពះ", fr: "L'infection par Helicobacter pylori peut provoquer des ulcères gastriques." },
{ en: "Fiber helps maintain healthy digestion.", kh: "ជាតិសរសៃជួយរក្សាសុខភាពប្រព័ន្ធរំលាយអាហារ", fr: "Les fibres aident à maintenir une digestion saine." },
{ en: "Chronic alcohol use can damage the liver.", kh: "ការផឹកស្រារយៈពេលយូរអាចបំផ្លាញថ្លើម", fr: "La consommation chronique d'alcool peut endommager le foie." },
{ en: "Fatty liver disease is increasingly common worldwide.", kh: "ជំងឺថ្លើមមានខ្លាញ់កំពុងកើនឡើងនៅទូទាំងពិភពលោក", fr: "La stéatose hépatique devient de plus en plus fréquente dans le monde." },
{ en: "The gut contains trillions of bacteria called the microbiome.", kh: "ពោះវៀនមានបាក់តេរីរាប់លានលានដែលហៅថា microbiome", fr: "L'intestin contient des billions de bactéries appelées microbiote." },
{ en: "A healthy microbiome supports digestion and immunity.", kh: "microbiome ដែលមានសុខភាពល្អជួយការរំលាយអាហារ និងប្រព័ន្ធភាពស៊ាំ", fr: "Un microbiote sain soutient la digestion et l'immunité." },
{ en: "The appendix may play a role in gut immunity.", kh: "អាប់ផេនឌិចអាចមានតួនាទីក្នុងប្រព័ន្ធភាពស៊ាំនៃពោះវៀន", fr: "L'appendice pourrait jouer un rôle dans l'immunité intestinale." },
{ en: "Gallstones form when bile components crystallize.", kh: "ក្រួសថង់ទឹកប្រមាត់កើតឡើងពេលសារធាតុក្នុងទឹកប្រមាត់កកជាគ្រាប់", fr: "Les calculs biliaires se forment lorsque les composants de la bile cristallisent." },
{ en: "Constipation can occur when stool moves too slowly through the colon.", kh: "ការទល់លាមកកើតឡើងពេលលាមកផ្លាស់ទីយឺតក្នុងពោះវៀនធំ", fr: "La constipation survient lorsque les selles avancent trop lentement dans le côlon." },
{ en: "Diarrhea happens when the intestine does not absorb enough water.", kh: "រាគកើតឡើងពេលពោះវៀនមិនស្រូបទឹកគ្រប់គ្រាន់", fr: "La diarrhée survient lorsque l'intestin n'absorbe pas assez d'eau." },
{ en: "The digestive system works together to convert food into energy.", kh: "ប្រព័ន្ធរំលាយអាហារធ្វើការជាមួយគ្នាដើម្បីបម្លែងអាហារជាថាមពល", fr: "Le système digestif travaille ensemble pour transformer les aliments en énergie." },
{ en: "Regular screening helps detect digestive diseases early.", kh: "ការត្រួតពិនិត្យជាប្រចាំជួយរកឃើញជំងឺរំលាយអាហារដំបូង", fr: "Le dépistage régulier aide à détecter précocement les maladies digestives." }
];

export default function HomePage({ setSection, lang, setLang }: { setSection: (s: string) => void, lang: 'en'|'kh'|'fr', setLang: (l: 'en'|'kh'|'fr') => void }) {
  const [factIndex, setFactIndex] = useState(0);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % giFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const cycleLang = () => {
    if (lang === 'en') setLang('kh');
    else if (lang === 'kh') setLang('fr');
    else setLang('en');
  };
  const handleShare = async () => {
  const fact = giFacts[factIndex][lang];

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Interactive GI Fact",
        text: fact,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(
        `Interactive GI Fact:\n\n${fact}\n\n${window.location.href}`
      );
      alert("GI fact copied to clipboard!");
    }
  } catch (err) {
    console.error("Share failed:", err);
  }
};
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 pt-12">
        <div className="flex-1 space-y-8 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide"
          >
            Welcome to Modern GI Care
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold leading-tight"
          >
            Dr. EK <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Vattanak</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0"
          >
            Gastroenterologist and Proctologist Specialist based in Cambodia. 
            Clear Answers. Trusted Treatment.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button onClick={() => setSection('portfolio')} className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
              More About Me <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => setSection('videos')} className="px-8 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 font-semibold transition-all">
              Watch Videos
            </button>
          </motion.div>
        </div>

        <div className="flex-1 relative w-full max-w-lg lg:max-w-none flex flex-col items-center">
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl -z-10" />
          
          {/* Animated Person WebM (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-sm mb-8 relative z-10"
          >
            {/* Replace 'hero-doctor.webm' with your actual file path later */}
            <video 
              src="hero-doctor.webm" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto object-contain mix-blend-multiply dark:mix-blend-screen opacity-90 translate-y-15"
              style={{ minHeight: '300px', backgroundColor: 'transparent' }}
            >
              <p>Your browser does not support the video tag.</p>
            </video>
          </motion.div>

          {/* Interactive GI Fact Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-20 w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700 shadow-2xl rounded-3xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                Interactive GI Fact
              </span>
              <div className="flex gap-2">
                <button onClick={cycleLang} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 flex items-center gap-1 text-xs font-semibold">
                  <Globe2 className="w-4 h-4" /> {lang.toUpperCase()}
                </button>
                <button
  onClick={handleShare}
  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500"
>
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="h-32 flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={factIndex + lang}
                  initial={{ opacity: 0, y: 10, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -10, rotateX: 20 }}
                  transition={{ duration: 0.5 }}
                  className={`text-xl font-medium ${lang === 'kh' ? 'font-sans' : 'font-serif'} text-slate-800 dark:text-slate-200`}
                >
                  {giFacts[factIndex][lang]}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {giFacts.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === factIndex ? 'bg-blue-500 w-6' : 'bg-slate-300 dark:bg-slate-600'}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Anatomy Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Interactive Anatomy Explorer</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Click on the organs to learn more about their functions, common conditions, and prevention tips.
          </p>
          
          {/* Alcohol & Liver Health Check Button */}
          <button 
            onClick={() => setIsQuizModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-800 shadow-sm"
          >
            <Activity className="w-5 h-5" />
            Alcohol & Liver Health Quizz Check
          </button>
        </div>
        <InteractiveAnatomy lang={lang} />
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isQuizModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-2">
                <LiverHealthQuiz />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
