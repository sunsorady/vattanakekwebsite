import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Book, Briefcase, GraduationCap, MapPin, Calendar, X } from 'lucide-react';

const journeyData = [
  {
    year: '2026 – Present',
    role: 'Gastroenterologist and Proctologist',
    place: 'Calmette Hospital, Phnom Penh, Cambodia',
    desc: 'Providing modern gastrointestinal care, clear diagnostics, and trusted treatments. Focusing on patient-centered gastroenterology and proctology in my home country.',
    highlight: false
  },
  {
    year: '2026 – February',
    role: 'Gastroenterologist Specialist Graduation',
    place: 'University of Health Sciences, Phnom Penh',
    desc: 'After years of intensive medical training, I obtained my specialization in Gastroenterology, focusing on diseases of the digestive system and liver.',
    highlight: true,
    images: ['/gr1.jpg', '/gr2.jpg']
  },
  {
    year: '2024 – 2025',
    role: 'Hospital Internship (FFI)',
    place: 'Institute of Medical and Surgical Proctology, Paris Saint-Joseph Hospital, France',
    desc: 'A transformative year immersed in advanced medical and surgical proctology. Worked closely with international teams on complex cases, refined endoscopy skills, and built lifelong professional relationships.',
    highlight: true,
    images: ['/sj1.jpg', '/sj2.jpg']
  },
  {
    year: '2020 – 2023',
    role: 'Medical Residency',
    place: 'University of Health Sciences, Cambodia',
    desc: 'Built core competencies in gastroenterology through clinical rotations, diagnostic procedures, and patient management.',
    highlight: false,
    images: ['/re1.jpg', '/re2.jpg']
  },
  {
    year: '2014 – 2019',
    role: 'Doctor of Medicine',
    place: 'University of Health Sciences, Phnom Penh, Cambodia',
    desc: 'Completed medical education with early exposure to clinical practice. Developed strong interest in digestive health and proctology.',
    highlight: false
  }
];

export default function PortfolioPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="space-y-20">
      {/* Portfolio Section */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl mb-6">
            <video
  src="hero.webm"
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
></video>
          </div>
          <h1 className="text-4xl font-bold mb-2">EK Vattanak</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-6">
            Gastroenterologist and Proctologist
          </p>
          <div className="flex flex-wrap justify-center gap-4">
  
  <a
    href="/CV_EN.pdf"
    download
    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
  >
    <Download className="w-5 h-5" /> Download CV (EN)
  </a>

  <a
    href="/CV_FR.pdf"
    download
    className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-2"
  >
    <Download className="w-5 h-5"  /> Download CV (FR)
  </a>

</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl"><Briefcase className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold font-serif">Core Skills</h2>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Proctoscopy', value: 90 },
                { name: 'Gastroscopy', value: 85 },
                { name: 'Endoscopy', value: 80 }
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2 font-bold text-sm">
                    <span>{skill.name}</span>
                    <span className="text-rose-500">{skill.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: `${skill.value}%` }} 
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-rose-500 to-orange-400 rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl"><Book className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold font-serif">Languages</h2>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Khmer', value: 99 },
                { name: 'French', value: 95 },
                { name: 'English', value: 93 }
              ].map(lang => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-2 font-bold text-sm">
                    <span>{lang.name}</span>
                    <span className="text-orange-500">{lang.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: `${lang.value}%` }} 
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl"><GraduationCap className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold font-serif">Education & Qualifications</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'DIU in Medical & Surgical Proctology — Université Paris Cité, Paris (Dec 2025)',
                'DFMS in Hepato-gastroenterology — Université Sorbonne Paris Nord, Paris',
                'International Program in Medicine — University of Health Sciences, Phnom Penh (Sep 2018)',
                'Bachelor of Medical Sciences — University of Health Sciences, Phnom Penh (Sep 2018)',
                'Member — SNFCP (French National Society of Colo-Proctology)'
              ].map((edu, i) => (
                <li key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:-translate-y-1 hover:shadow-md transition-all cursor-default">
                  {edu}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="pt-16 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            From training in France to serving patients in Cambodia — a path of learning, collaboration, and care.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-200 via-orange-200 to-transparent dark:from-rose-900/50 dark:via-orange-900/50 -translate-x-1/2 rounded-full" />

          <div className="space-y-12">
            {journeyData.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-rose-500 border-4 border-white dark:border-slate-900 shadow-lg -translate-x-1/2 z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className={`p-6 md:p-8 rounded-3xl shadow-xl border transition-transform hover:-translate-y-2 ${item.highlight ? 'bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border-rose-200 dark:border-rose-800' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-4 ${item.highlight ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                      <Calendar className="w-4 h-4" /> {item.year}
                    </div>
                    <h3 className="text-2xl font-bold font-serif mb-2 text-slate-900 dark:text-white">{item.role}</h3>
                    <div className={`flex items-center gap-2 text-sm font-medium mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''} text-slate-500 dark:text-slate-400`}>
                      <MapPin className="w-4 h-4 text-rose-500" /> {item.place}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                    
                    {item.images && (
  <div className="mt-6 grid grid-cols-2 gap-4">
    {item.images.map((img, idx) => (
      <button
        key={idx}
        type="button"
        onClick={() => setSelectedImage(img)}
        className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
      >
        <img
          src={img}
          alt={`Journey ${idx + 1}`}
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </button>
    ))}
  </div>
)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
  {selectedImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setSelectedImage(null)}
    >
      <button
        type="button"
        onClick={() => setSelectedImage(null)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        src={selectedImage}
        alt="Preview"
        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}
