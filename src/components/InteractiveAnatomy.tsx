import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Activity, AlertCircle, ShieldCheck } from 'lucide-react';

const organData: Record<string, any> = {
  esophagus: {
    name: { en: "Esophagus", kh: "បំពង់អាហារ", fr: "Œsophage" },
    function: {
      en: "Moves food from the mouth to the stomach using muscle waves called peristalsis.",
      kh: "បញ្ជូនអាហារពីមាត់ទៅក្រពះដោយប្រើរលកសាច់ដុំដែលហៅថា peristalsis។",
      fr: "Déplace les aliments de la bouche vers l'estomac à l'aide d'ondes musculaires appelées péristaltisme."
    },
    conditions: {
      en: ["Acid Reflux", "GERD", "Esophagitis"],
      kh: ["ច្រាលអាស៊ីត", "GERD", "រលាកបំពង់អាហារ"],
      fr: ["Reflux Acide", "RGO", "Œsophagite"]
    },
    prevention: {
      en: "Avoid eating large meals before bedtime and limit spicy or acidic foods.",
      kh: "ជៀសវាងការញ៉ាំអាហារច្រើនមុនពេលចូលគេង និងកាត់បន្ថយអាហារហឹរ ឬជូរ។",
      fr: "Évitez les gros repas avant de vous coucher et limitez les aliments épicés ou acides."
    },
    color: "#94a3b8"
  },
  liver: {
    name: { en: "Liver", kh: "ថ្លើម", fr: "Foie" },
    function: {
      en: "Filters blood, detoxifies chemicals, and secretes bile.",
      kh: "ចម្រោះឈាម បន្សាបជាតិពុល និងបញ្ចេញទឹកប្រមាត់។",
      fr: "Filtre le sang, détoxifie les produits chimiques et sécrète la bile."
    },
    conditions: {
      en: ["Fatty Liver Disease", "Hepatitis", "Cirrhosis"],
      kh: ["ជំងឺខ្លាញ់រុំថ្លើម", "រលាកថ្លើម", "ក្រិនថ្លើម"],
      fr: ["Stéatose Hépatique", "Hépatite", "Cirrhose"]
    },
    prevention: {
      en: "Limit alcohol consumption, maintain a healthy weight, and get vaccinated for Hepatitis A and B.",
      kh: "កាត់បន្ថយការផឹកស្រា រក្សាទម្ងន់ឱ្យបានល្អ និងចាក់វ៉ាក់សាំងការពារជំងឺរលាកថ្លើមប្រភេទ A និង B។",
      fr: "Limitez la consommation d'alcool, maintenez un poids santé et faites-vous vacciner contre l'hépatite A et B."
    },
    color: "#fb923c"
  },
  gallbladder: {
    name: { en: "Gallbladder", kh: "ថង់ប្រមាត់", fr: "Vésicule Biliaire" },
    function: {
      en: "Stores and concentrates bile produced by the liver to help digest fats.",
      kh: "ផ្ទុក និងប្រមូលផ្តុំទឹកប្រមាត់ដែលផលិតដោយថ្លើម ដើម្បីជួយរំលាយជាតិខ្លាញ់។",
      fr: "Stocke et concentre la bile produite par le foie pour aider à digérer les graisses."
    },
    conditions: {
      en: ["Gallstones", "Cholecystitis", "Biliary Colic"],
      kh: ["គ្រួសក្នុងថង់ប្រមាត់", "រលាកថង់ប្រមាត់", "ការឈឺចាប់បំពង់ប្រមាត់"],
      fr: ["Calculs Biliaires", "Cholécystite", "Colique Biliaire"]
    },
    prevention: {
      en: "Eat a high-fiber diet with healthy fats and avoid rapid weight loss.",
      kh: "ញ៉ាំអាហារដែលមានជាតិសរសៃខ្ពស់ជាមួយខ្លាញ់ល្អ និងជៀសវាងការសម្រកទម្ងន់លឿនពេក។",
      fr: "Mangez une alimentation riche en fibres avec des graisses saines et évitez une perte de poids rapide."
    },
    color: "#14b8a6"
  },
  stomach: {
    name: { en: "Stomach", kh: "ក្រពះ", fr: "Estomac" },
    function: {
      en: "Secretes acid and enzymes that digest food.",
      kh: "បញ្ចេញអាស៊ីត និងអង់ស៊ីមដែលរំលាយអាហារ។",
      fr: "Sécrète de l'acide et des enzymes qui digèrent les aliments."
    },
    conditions: {
      en: ["Gastritis", "Peptic Ulcers", "GERD"],
      kh: ["រលាកក្រពះ", "ដំបៅក្រពះ", "GERD"],
      fr: ["Gastrite", "Ulcères Gastro-duodénaux", "RGO"]
    },
    prevention: {
      en: "Eat smaller, more frequent meals and manage stress levels.",
      kh: "ញ៉ាំអាហារតិចតួចតែញឹកញាប់ និងគ្រប់គ្រងភាពតានតឹង។",
      fr: "Prenez des repas plus petits et plus fréquents et gérez votre niveau de stress."
    },
    color: "#f43f5e"
  },
  pancreas: {
    name: { en: "Pancreas", kh: "លំពែង", fr: "Pancréas" },
    function: {
      en: "Produces digestive enzymes and regulates blood sugar.",
      kh: "ផលិតអង់ស៊ីមរំលាយអាហារ និងគ្រប់គ្រងជាតិស្ករក្នុងឈាម។",
      fr: "Produit des enzymes digestives et régule la glycémie."
    },
    conditions: {
      en: ["Pancreatitis", "Pancreatic Cancer"],
      kh: ["រលាកលំពែង", "មហារីកលំពែង"],
      fr: ["Pancréatite", "Cancer du Pancréas"]
    },
    prevention: {
      en: "Avoid excessive alcohol, quit smoking, and maintain a low-fat diet.",
      kh: "ជៀសវាងការផឹកស្រាច្រើនពេក ឈប់ជក់បារី និងរក្សារបបអាហារដែលមានជាតិខ្លាញ់ទាប។",
      fr: "Évitez l'excès d'alcool, arrêtez de fumer et maintenez une alimentation pauvre en graisses."
    },
    color: "#eab308"
  },
  small_intestine: {
    name: { en: "Small Intestine", kh: "ពោះវៀនតូច", fr: "Intestin Grêle" },
    function: {
      en: "Absorbs most of the nutrients and minerals from food.",
      kh: "ស្រូបយកសារធាតុចិញ្ចឹម និងសារធាតុរ៉ែភាគច្រើនពីអាហារ។",
      fr: "Absorbe la plupart des nutriments et des minéraux des aliments."
    },
    conditions: {
      en: ["Celiac Disease", "Crohn's Disease", "SIBO"],
      kh: ["ជំងឺ Celiac", "ជំងឺ Crohn", "SIBO"],
      fr: ["Maladie Cœliaque", "Maladie de Crohn", "SIBO"]
    },
    prevention: {
      en: "Chew food thoroughly and consume a balanced diet rich in vitamins.",
      kh: "ទំពារអាហារឱ្យបានម៉ត់ល្អ និងញ៉ាំរបបអាហារដែលមានតុល្យភាពសម្បូរវីតាមីន។",
      fr: "Mâchez bien les aliments et consommez une alimentation équilibrée riche en vitamines."
    },
    color: "#3b82f6"
  },
  large_intestine: {
    name: { en: "Large Intestine", kh: "ពោះវៀនធំ", fr: "Gros Intestin" },
    function: {
      en: "Absorbs water and forms stool from indigestible food matter.",
      kh: "ស្រូបយកទឹក និងបង្កើតលាមកពីកាកសំណល់អាហារដែលមិនអាចរំលាយបាន។",
      fr: "Absorbe l'eau et forme les selles à partir des matières alimentaires non digestibles."
    },
    conditions: {
      en: ["IBS", "Colorectal Cancer", "Diverticulitis"],
      kh: ["IBS", "មហារីកពោះវៀនធំ", "រលាក Diverticulitis"],
      fr: ["SII", "Cancer Colorectal", "Diverticulite"]
    },
    prevention: {
      en: "Stay hydrated, eat plenty of fiber, and get regular colon cancer screenings.",
      kh: "ផឹកទឹកឱ្យបានគ្រប់គ្រាន់ ញ៉ាំជាតិសរសៃឱ្យបានច្រើន និងពិនិត្យមហារីកពោះវៀនធំជាប្រចាំ។",
      fr: "Restez hydraté, mangez beaucoup de fibres et faites des dépistages réguliers du cancer colorectal."
    },
    color: "#10b981"
  }
};

const uiText = {
  en: {
    placeholder: "Select an organ to view detailed medical information.",
    function: "Function",
    conditions: "Common Conditions",
    prevention: "Prevention Tips"
  },
  kh: {
    placeholder: "ជ្រើសរើសសរីរាង្គដើម្បីមើលព័ត៌មានវេជ្ជសាស្ត្រលម្អិត។",
    function: "មុខងារ",
    conditions: "ជំងឺទូទៅ",
    prevention: "គន្លឹះការពារ"
  },
  fr: {
    placeholder: "Sélectionnez un organe pour voir les informations médicales détaillées.",
    function: "Fonction",
    conditions: "Conditions Courantes",
    prevention: "Conseils de Prévention"
  }
};

// Refactored positioning to create a realistic, cohesive layout
const organImages = [
   {
    key: 'gallbladder',
    src: '/gallbladder.png',
    className: 'top-[38%] left-[28%] w-[30%]',
    zIndex: 30
  },
  {
    key: 'esophagus',
    src: '/esophagus.png',
    className: 'top-[10%] left-[68%] -translate-x-1/2 w-[50%]',
    zIndex: 10
  },
  {
    key: 'liver',
    src: '/liver.png',
    className: 'top-[28%] left-[17%] w-[50%]',
    zIndex: 27
  },
  {
    key: 'stomach',
    src: '/stomach.png',
    className: 'top-[28%] right-[12%] w-[55%]',
    zIndex: 26
  },
  {
    key: 'pancreas',
    src: '/pancreas.png',
    className: 'top-[46%] left-[35%] -translate-x-1/2 w-[40%]',
    zIndex: 35
  },
  {
    key: 'large_intestine',
    src: '/large-intestine.png',
    className: 'top-[50%] left-1/2 -translate-x-1/2 w-[95%]',
    zIndex: 34
  },
  
];

export default function InteractiveAnatomy({ lang }: { lang: 'en' | 'kh' | 'fr' }) {
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 bg-white dark:bg-slate-800/50 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 w-full">
        
        {/* Realistic Anatomy Image Layout */}
        <div className="relative w-full max-w-md aspect-[3/4] bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
          {/* Torso background */}
          <img
            src="/bg.png"
            alt="Human torso background"
            className="absolute inset-0 w-full h-full object-contain opacity-20 dark:opacity-10 pointer-events-none"
          />

          {/* Organs */}
          {organImages.map((organ) => {
            const isActive = activeOrgan === organ.key;
            const isHovered = hoveredOrgan === organ.key;
            const organColor = organData[organ.key].color;

            return (
              <motion.button
                key={organ.key}
                type="button"
                onClick={() => setActiveOrgan(organ.key)}
                onMouseEnter={() => setHoveredOrgan(organ.key)}
                onMouseLeave={() => setHoveredOrgan(null)}
                className={`absolute cursor-pointer bg-transparent border-0 p-0 outline-none ${organ.className}`}
                style={{ zIndex: organ.zIndex }}
              >
                <img
                  src={organ.src}
                  alt={organData[organ.key].name[lang]}
                  className={`w-full h-auto object-contain transition-all duration-300 ${
                    isActive ? 'scale-110' : isHovered ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    filter: isActive 
                      ? `drop-shadow(0 0 16px ${organColor})` 
                      : isHovered
                      ? `drop-shadow(0 0 8px ${organColor})`
                      : 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))'
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-96 h-[420px]">
          <AnimatePresence mode="wait">
            {activeOrgan ? (
              <motion.div
                key={activeOrgan + lang}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col overflow-y-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: organData[activeOrgan].color }}
                  >
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className={`text-2xl font-bold ${lang === 'kh' ? 'font-sans' : 'font-serif'}`}>
                    {organData[activeOrgan].name[lang]}
                  </h3>
                </div>

                <div className="space-y-5 flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      <Info className="w-4 h-4" /> {uiText[lang].function}
                    </div>
                    <p className={`text-slate-700 dark:text-slate-300 ${lang === 'kh' ? 'font-sans text-sm' : ''}`}>
                      {organData[activeOrgan].function[lang]}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      <AlertCircle className="w-4 h-4" /> {uiText[lang].conditions}
                    </div>
                    <ul className="space-y-2">
                      {organData[activeOrgan].conditions[lang].map((cond: string, i: number) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 ${lang === 'kh' ? 'font-sans' : ''}`}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: organData[activeOrgan].color }}
                          />
                          {cond}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      <ShieldCheck className="w-4 h-4" /> {uiText[lang].prevention}
                    </div>
                    <p className={`text-slate-700 dark:text-slate-300 ${lang === 'kh' ? 'font-sans text-sm' : ''}`}>
                      {organData[activeOrgan].prevention[lang]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400"
              >
                <Activity className="w-12 h-12 mb-4 opacity-50" />
                <p className={lang === 'kh' ? 'font-sans' : ''}>{uiText[lang].placeholder}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}