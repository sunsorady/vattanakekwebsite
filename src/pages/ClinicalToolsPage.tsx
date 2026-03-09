import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Calculator,
  Activity,
  HeartPulse,
  BookOpen,
  ArrowRight,
  X,
  AlertCircle,
  Info,
  Stethoscope,
  Apple,
  Activity as ActivityIcon,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Pill,
  Coffee,
  Leaf,
  Flame,
  Search,
} from 'lucide-react';

type ArticleSection = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
};

type Article = {
  id: string;
  title: string;
  desc: string;
  color: string;
  image: string;
  intro: string;
  sections: ArticleSection[];
};

const articlesData: Article[] = [
  {
    id: 'gerd',
    title: 'Acid Reflux & GERD',
    desc: 'Understanding the causes, symptoms, and treatments for chronic heartburn.',
    color: 'from-orange-400 to-rose-400',
    image: '/gerd.png',
    intro:
      'Gastroesophageal reflux disease (GERD) occurs when stomach acid frequently flows back into the tube connecting your mouth and stomach.',
    sections: [
      {
        title: 'What is Acid Reflux / GERD?',
        icon: Flame,
        content:
          'Acid reflux is the backward flow of stomach acid into the esophagus. When this happens repeatedly and causes damage or persistent symptoms, it is classified as GERD.',
      },
      {
        title: 'Common Symptoms in Cambodia',
        icon: AlertTriangle,
        content:
          'Patients often report a burning sensation in the chest (heartburn), usually after eating, which might be worse at night. Other symptoms include difficulty swallowing, regurgitation of food or sour liquid, and a sensation of a lump in the throat.',
      },
      {
        title: 'Causes (Cambodian lifestyle focus)',
        icon: Info,
        content:
          'Frequent consumption of spicy foods, late-night heavy meals, and high stress levels contribute significantly. The local diet, which can sometimes be rich in oils and spices, may exacerbate symptoms.',
      },
      {
        title: 'Foods That Trigger',
        icon: Coffee,
        content:
          'Spicy foods, citrus fruits, tomatoes, chocolate, mint, garlic, onions, and caffeinated or alcoholic beverages are common triggers.',
      },
      {
        title: 'Simple Lifestyle Changes',
        icon: Leaf,
        content:
          'Eat smaller meals, avoid lying down immediately after eating, elevate the head of your bed, and maintain a healthy weight.',
      },
      {
        title: 'When to See a Doctor',
        icon: Stethoscope,
        content:
          'Seek medical attention if you experience severe or frequent GERD symptoms, or if you take over-the-counter medications for heartburn more than twice a week.',
      },
      {
        title: 'Treatment Options',
        icon: Pill,
        content:
          'Treatments range from lifestyle modifications and over-the-counter antacids to prescription medications (like PPIs) and, in severe cases, surgery.',
      },
    ],
  },
  {
    id: 'hemorrhoids',
    title: 'Hemorrhoids',
    desc: 'Effective management and modern treatment options for hemorrhoidal disease.',
    color: 'from-rose-400 to-pink-500',
    image: '/herm.png',
    intro:
      'Hemorrhoids are swollen veins in your lower rectum, similar to varicose veins. They are a common cause of rectal bleeding and discomfort.',
    sections: [
      {
        title: 'What are Hemorrhoids?',
        icon: Info,
        content:
          'They are vascular structures in the anal canal that help with stool control. They become pathological or “piles” when swollen or inflamed.',
      },
      {
        title: 'Common Symptoms',
        icon: AlertTriangle,
        content:
          'Painless bleeding during bowel movements, itching or irritation in your anal region, pain or discomfort, and swelling around your anus.',
      },
      {
        title: 'Causes and Risk Factors',
        icon: ActivityIcon,
        content:
          'Straining during bowel movements, sitting for long periods on the toilet, chronic diarrhea or constipation, obesity, pregnancy, and a low-fiber diet.',
      },
      {
        title: 'Home Care Tips',
        icon: Leaf,
        content:
          'Eat high-fiber foods, drink plenty of fluids, consider fiber supplements, do not strain during bowel movements, and take warm sitz baths.',
      },
      {
        title: 'When to See a Doctor',
        icon: Stethoscope,
        content:
          'If you experience bleeding during bowel movements or have hemorrhoids that do not improve after a week of home care, consult a doctor.',
      },
      {
        title: 'Treatment Options',
        icon: Pill,
        content:
          'Over-the-counter creams, minimally invasive procedures like rubber band ligation, and surgical removal for severe cases.',
      },
    ],
  },
  {
    id: 'fatty-liver',
    title: 'Fatty Liver Disease',
    desc: 'Lifestyle changes and medical interventions to protect your liver.',
    color: 'from-emerald-400 to-teal-500',
    image: '/fatliver.png',
    intro:
      'Fatty liver disease is a common condition caused by the storage of extra fat in the liver. Most people have no symptoms, and it does not cause serious problems for them.',
    sections: [
      {
        title: 'What is Fatty Liver?',
        icon: Info,
        content:
          'It occurs when fat builds up in the liver. While it is normal to have some fat in the liver, more than 5% to 10% of your liver’s weight is fat in fatty liver disease.',
      },
      {
        title: 'Causes and Risk Factors',
        icon: ActivityIcon,
        content:
          'Obesity, type 2 diabetes, insulin resistance, high levels of fats such as triglycerides in the blood, and metabolic syndrome.',
      },
      {
        title: 'Symptoms',
        icon: AlertTriangle,
        content:
          'Often a silent disease with no symptoms. If symptoms occur, they may include fatigue, weight loss, or abdominal pain.',
      },
      {
        title: 'Foods and Lifestyle Advice',
        icon: Apple,
        content:
          'Adopt a plant-based diet, reduce consumption of refined carbs and trans fats, exercise regularly, and manage your weight.',
      },
      {
        title: 'When to Get Checked',
        icon: Clock,
        content:
          'Routine blood tests or ultrasounds often detect it. If you have risk factors like obesity or diabetes, discuss screening with your doctor.',
      },
      {
        title: 'Treatment Options',
        icon: ShieldCheck,
        content:
          'Currently, no medications have been approved to treat fatty liver disease. The main line of treatment is weight loss through a healthy diet and exercise.',
      },
    ],
  },
  {
    id: 'colon-cancer',
    title: 'Colon Cancer Screening',
    desc: 'Why colonoscopy saves lives and when you should get screened.',
    color: 'from-blue-400 to-indigo-500',
    image: 'colon.png',
    intro:
      'Colorectal cancer almost always develops from precancerous polyps in the colon or rectum. Screening tests can find precancerous polyps so they can be removed before they turn into cancer.',
    sections: [
      {
        title: 'Why Screening Matters',
        icon: ShieldCheck,
        content:
          'Screening can detect cancer early when treatment is most effective. It can also prevent cancer by finding and removing precancerous polyps.',
      },
      {
        title: 'Who Should Be Screened',
        icon: Info,
        content:
          'Adults at average risk should start regular screening at age 45. Those with a family history or other risk factors may need to start earlier.',
      },
      {
        title: 'Warning Signs',
        icon: AlertTriangle,
        content:
          'A persistent change in bowel habits, rectal bleeding or blood in stool, persistent abdominal discomfort, and unexplained weight loss.',
      },
      {
        title: 'Screening Methods',
        icon: Search,
        content:
          'Options include stool tests like FIT, flexible sigmoidoscopy, and colonoscopy. Discuss the best option for you with your doctor.',
      },
      {
        title: 'Colonoscopy Benefits',
        icon: CheckCircle2,
        content:
          'It allows the doctor to view the entire colon and rectum and to remove polyps or take tissue samples during the procedure.',
      },
      {
        title: 'When to Consult a Specialist',
        icon: Stethoscope,
        content:
          'If you experience any warning signs, or when it is time to begin your routine screening based on your age and risk factors.',
      },
    ],
  },
  {
    id: 'constipation',
    title: 'Chronic Constipation',
    desc: 'Dietary adjustments and therapies for better bowel motility.',
    color: 'from-violet-400 to-purple-500',
    image: 'constip.png',
    intro:
      'Chronic constipation is characterized by infrequent bowel movements or difficult passage of stools that persists for several weeks or longer.',
    sections: [
      {
        title: 'What is Chronic Constipation?',
        icon: Info,
        content:
          'Having fewer than three bowel movements a week, straining, having lumpy or hard stools, or feeling as though you cannot completely empty your bowels.',
      },
      {
        title: 'Common Causes',
        icon: ActivityIcon,
        content:
          'Low fiber diet, inadequate fluid intake, lack of physical activity, certain medications, and ignoring the urge to have a bowel movement.',
      },
      {
        title: 'Symptoms',
        icon: AlertTriangle,
        content:
          'Passing fewer than three stools a week, having lumpy or hard stools, straining to have bowel movements, and feeling a blockage in your rectum.',
      },
      {
        title: 'Diet and Lifestyle Tips',
        icon: Apple,
        content:
          'Increase fiber intake gradually, drink plenty of water, exercise regularly, and do not ignore the urge to pass stool.',
      },
      {
        title: 'When to See a Doctor',
        icon: Stethoscope,
        content:
          'If you experience unexplained changes in bowel habits, or if constipation is accompanied by severe pain, bleeding, or unexplained weight loss.',
      },
      {
        title: 'Treatment Options',
        icon: Pill,
        content:
          'Dietary changes, fiber supplements, laxatives, and in some cases prescription medications or biofeedback training.',
      },
    ],
  },
  {
    id: 'ibs',
    title: 'Irritable Bowel Syndrome',
    desc: 'Managing IBS symptoms through diet, stress reduction, and medication.',
    color: 'from-amber-400 to-orange-500',
    image: 'bowel.png',
    intro:
      'Irritable bowel syndrome is a common disorder that affects the large intestine. Symptoms include cramping, abdominal pain, bloating, gas, and diarrhea or constipation.',
    sections: [
      {
        title: 'What is IBS?',
        icon: Info,
        content:
          'IBS is a chronic condition that you need to manage long term. It does not cause changes in bowel tissue or increase your risk of colorectal cancer.',
      },
      {
        title: 'Common Symptoms',
        icon: AlertTriangle,
        content:
          'Abdominal pain, cramping or bloating that is typically relieved or partially relieved by passing a bowel movement. Excess gas, diarrhea, or constipation.',
      },
      {
        title: 'Trigger Foods and Stress',
        icon: Coffee,
        content:
          'Symptoms can be triggered by certain foods like dairy, citrus, beans, and cabbage, as well as stress. The exact triggers vary from person to person.',
      },
      {
        title: 'Lifestyle and Diet Advice',
        icon: Leaf,
        content:
          'Experiment with fiber, avoid problem foods, eat at regular times, exercise regularly, and consider the low FODMAP diet under guidance.',
      },
      {
        title: 'When to Seek Medical Advice',
        icon: Stethoscope,
        content:
          'If you have a persistent change in bowel habits or other signs or symptoms of IBS, as they may indicate a more serious condition.',
      },
      {
        title: 'Treatment Options',
        icon: Pill,
        content:
          'Treatment focuses on relieving symptoms. It includes dietary changes, stress management, fiber supplements, anti-diarrheal medications, antispasmodics, and sometimes antidepressants.',
      },
    ],
  },
];

function GlobalStyles() {
  useEffect(() => {
    const styleId = 'medical-library-single-file-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .medical-library-single-file .custom-scrollbar::-webkit-scrollbar { width: 8px; }
      .medical-library-single-file .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .medical-library-single-file .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5);
        border-radius: 20px;
      }
      .medical-library-single-file .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(107, 114, 128, 0.8);
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  return null;
}

export default function MedicalLibrarySingleFile() {
  return (
    <div className="medical-library-single-file min-h-screen bg-slate-50 text-slate-900 font-sans dark:bg-slate-900 dark:text-slate-100">
      <GlobalStyles />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ClinicalToolsPage />
      </div>
    </div>
  );
}

function ClinicalToolsPage() {
  const [activeTab, setActiveTab] = useState<'meld' | 'child' | 'bmi'>('meld');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="space-y-20">
      <div className="space-y-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold font-serif">Medical Library</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Interactive medical calculators for gastroenterology and hepatology.
            <br />
            <span className="text-xs text-blue-500">For educational purposes only.</span>
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-4">
          {[
            { id: 'meld' as const, label: 'MELD Score', icon: Activity },
            { id: 'child' as const, label: 'Child-Pugh', icon: HeartPulse },
            { id: 'bmi' as const, label: 'BMI Calculator', icon: Calculator },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          {activeTab === 'meld' && <MeldCalculator />}
          {activeTab === 'child' && <ChildPughCalculator />}
          {activeTab === 'bmi' && <BmiCalculator />}
        </div>
      </div>

      <div className="space-y-8 border-t border-slate-200 pt-16 dark:border-slate-800">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold font-serif">Educational Articles</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Clear, professional medical information to help you understand your digestive health.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articlesData.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedArticle(topic)}
              className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800`}
            >
              <div className={`absolute left-0 top-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r ${topic.color} transition-transform duration-500 group-hover:scale-x-100`} />
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-5 bg-gradient-to-br ${topic.color}`} />

              <div className={`relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${topic.color} text-white shadow-lg transition-all duration-300 group-hover:rotate-3 group-hover:scale-110`}>
                <BookOpen className="h-6 w-6" />
              </div>

              <h3 className="relative z-10 mb-4 text-2xl font-bold font-serif text-slate-900 dark:text-white">{topic.title}</h3>
              <p className="relative z-10 mb-8 flex-grow text-base leading-relaxed text-slate-600 dark:text-slate-400">{topic.desc}</p>

              <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-700">
                <span className="text-sm font-bold text-slate-500 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white">
                  Read Article
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 transition-colors duration-300 group-hover:bg-blue-500 group-hover:text-white dark:bg-slate-700">
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
      >
        <motion.div
          className={`absolute left-0 right-0 top-0 z-50 h-1.5 origin-left bg-gradient-to-r ${article.color}`}
          style={{ scaleX }}
        />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/40"
        >
          <X className="h-5 w-5" />
        </button>

        <div ref={scrollRef} className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="relative h-64 overflow-hidden sm:h-80 md:h-96 shrink-0">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${article.color} text-white shadow-lg`}
                >
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="mb-4 text-3xl font-bold leading-tight text-white font-serif sm:text-4xl md:text-5xl">
                  {article.title}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-200">
                  {article.intro}
                </p>
              </motion.div>
            </div>
          </div>

          <div className="space-y-12 p-8 sm:p-12">
            {article.sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col gap-6 sm:flex-row"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-blue-200 group-hover:text-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:border-blue-800">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-800/50 sm:p-12">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <AlertCircle className="h-4 w-4" />
              <p>For educational purposes only. Not a substitute for professional medical advice.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MeldCalculator() {
  const [bilirubin, setBilirubin] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [inr, setInr] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const calculateMeld = () => {
    const b = parseFloat(bilirubin);
    const c = parseFloat(creatinine);
    const i = parseFloat(inr);
    if (b && c && i) {
      const m = 3.78 * Math.log(b) + 11.2 * Math.log(i) + 9.57 * Math.log(c) + 6.43;
      setScore(Math.round(m));
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="mb-6 text-2xl font-bold font-serif">MELD Score Calculator</h2>
      <div className="space-y-4">
        <InputField label="Bilirubin (mg/dL)" value={bilirubin} onChange={setBilirubin} />
        <InputField label="Creatinine (mg/dL)" value={creatinine} onChange={setCreatinine} />
        <InputField label="INR" value={inr} onChange={setInr} />
        <PrimaryButton onClick={calculateMeld}>Calculate Score</PrimaryButton>
      </div>

      {score !== null && (
        <ResultCard title="Estimated MELD Score">
          <div className="mb-2 text-5xl font-black text-slate-900 dark:text-white">{score}</div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {score >= 40
              ? '71.3% estimated 3-month mortality'
              : score >= 30
                ? '52.6% estimated 3-month mortality'
                : score >= 20
                  ? '19.6% estimated 3-month mortality'
                  : '6.0% estimated 3-month mortality'}
          </p>
        </ResultCard>
      )}
    </motion.div>
  );
}

function ChildPughCalculator() {
  const [bilirubin, setBilirubin] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [inr, setInr] = useState('');
  const [ascites, setAscites] = useState('1');
  const [enceph, setEnceph] = useState('1');
  const [score, setScore] = useState<{ points: number; class: string } | null>(null);

  const calculateChildPugh = () => {
    let points = 0;
    const b = parseFloat(bilirubin);
    const a = parseFloat(albumin);
    const i = parseFloat(inr);

    if (b && a && i) {
      if (b < 2) points += 1;
      else if (b <= 3) points += 2;
      else points += 3;

      if (a > 3.5) points += 1;
      else if (a >= 2.8) points += 2;
      else points += 3;

      if (i < 1.7) points += 1;
      else if (i <= 2.2) points += 2;
      else points += 3;

      points += parseInt(ascites, 10);
      points += parseInt(enceph, 10);

      let childClass = 'A';
      if (points >= 7 && points <= 9) childClass = 'B';
      if (points >= 10) childClass = 'C';

      setScore({ points, class: childClass });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="mb-6 text-2xl font-bold font-serif">Child-Pugh Calculator</h2>
      <div className="space-y-4">
        <InputField label="Bilirubin (mg/dL)" value={bilirubin} onChange={setBilirubin} />
        <InputField label="Albumin (g/dL)" value={albumin} onChange={setAlbumin} />
        <InputField label="INR" value={inr} onChange={setInr} />

        <SelectField label="Ascites" value={ascites} onChange={setAscites} options={[
          { value: '1', label: 'Absent' },
          { value: '2', label: 'Slight' },
          { value: '3', label: 'Moderate/Severe' },
        ]} />

        <SelectField label="Encephalopathy" value={enceph} onChange={setEnceph} options={[
          { value: '1', label: 'None' },
          { value: '2', label: 'Grade I-II' },
          { value: '3', label: 'Grade III-IV' },
        ]} />

        <PrimaryButton onClick={calculateChildPugh}>Calculate Score</PrimaryButton>
      </div>

      {score !== null && (
        <ResultCard title="Child-Pugh Class">
          <div className="mb-2 text-5xl font-black text-slate-900 dark:text-white">{score.class}</div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Points: {score.points}</p>
        </ResultCard>
      )}
    </motion.div>
  );
}

function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) {
      setBmi(Math.round((w / (h * h)) * 10) / 10);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="mb-6 text-2xl font-bold font-serif">BMI Calculator</h2>
      <div className="space-y-4">
        <InputField label="Weight (kg)" value={weight} onChange={setWeight} />
        <InputField label="Height (cm)" value={height} onChange={setHeight} />
        <PrimaryButton onClick={calculateBmi}>Calculate BMI</PrimaryButton>
      </div>

      {bmi !== null && (
        <ResultCard title="Your BMI">
          <div className="mb-2 text-5xl font-black text-slate-900 dark:text-white">{bmi}</div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            {bmi < 18.5
              ? 'Underweight. May impact nutrient absorption.'
              : bmi < 25
                ? 'Normal weight. Good for overall GI health.'
                : bmi < 30
                  ? 'Overweight. Increased risk of GERD and fatty liver.'
                  : 'Obese. High risk of fatty liver disease and GERD.'}
          </p>
        </ResultCard>
      )}
    </motion.div>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-900"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-slate-900"
    >
      {children}
    </button>
  );
}

function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center dark:border-blue-800 dark:bg-blue-900/20"
    >
      <div className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{title}</div>
      {children}
    </motion.div>
  );
}