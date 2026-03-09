import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const questions = [
  {
    question: "How often do you consume alcoholic beverages?",
    options: [
      { text: "Never", score: 0 },
      { text: "Monthly or less", score: 5 },
      { text: "2-4 times a month", score: 10 },
      { text: "2-3 times a week", score: 15 },
      { text: "4 or more times a week", score: 20 }
    ]
  },
  {
    question: "How many drinks containing alcohol do you have on a typical day when you are drinking?",
    options: [
      { text: "1 or 2", score: 0 },
      { text: "3 or 4", score: 5 },
      { text: "5 or 6", score: 10 },
      { text: "7 to 9", score: 15 },
      { text: "10 or more", score: 20 }
    ]
  },
  {
    question: "Do you have abdominal obesity (excess weight around the stomach)?",
    options: [
      { text: "No", score: 0 },
      { text: "Slightly", score: 5 },
      { text: "Yes, moderately", score: 10 },
      { text: "Yes, significantly", score: 15 }
    ]
  },
  {
    question: "Do you frequently experience unexplained fatigue or weakness?",
    options: [
      { text: "Rarely or never", score: 0 },
      { text: "Sometimes", score: 5 },
      { text: "Often", score: 10 },
      { text: "Almost always", score: 15 }
    ]
  },
  {
    question: "Have you ever been diagnosed with fatty liver, high cholesterol, or type 2 diabetes?",
    options: [
      { text: "No", score: 0 },
      { text: "High cholesterol only", score: 5 },
      { text: "Type 2 diabetes", score: 10 },
      { text: "Fatty liver disease", score: 15 }
    ]
  },
  {
    question: "How often do you engage in moderate to vigorous physical exercise?",
    options: [
      { text: "3 or more times a week", score: 0 },
      { text: "1-2 times a week", score: 5 },
      { text: "Rarely", score: 10 },
      { text: "Never", score: 15 }
    ]
  }
];

export default function LiverHealthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    if (currentQuestion < questions.length - 1) {
      setScore(newScore);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Normalize score to 0-100 (Max possible score is 100)
      setScore(Math.min(100, newScore));
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const getResultData = () => {
    if (score <= 40) {
      return {
        category: "Low Risk",
        color: "text-emerald-500",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        borderColor: "border-emerald-200 dark:border-emerald-800",
        icon: <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />,
        explanation: "Your lifestyle habits suggest a low risk for liver disease. You are making good choices regarding alcohol consumption and overall health.",
        recommendations: [
          "Continue maintaining a balanced diet rich in fruits, vegetables, and whole grains.",
          "Keep up your regular exercise routine.",
          "Maintain your current moderate or zero alcohol intake."
        ]
      };
    } else if (score <= 70) {
      return {
        category: "Moderate Risk",
        color: "text-amber-500",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        borderColor: "border-amber-200 dark:border-amber-800",
        icon: <Info className="w-12 h-12 text-amber-500 mb-4 mx-auto" />,
        explanation: "Your score indicates a moderate risk for developing fatty liver disease or other liver conditions. Some lifestyle adjustments are recommended.",
        recommendations: [
          "Consider reducing your alcohol intake.",
          "Incorporate more cardiovascular exercise into your weekly routine.",
          "Limit processed foods and added sugars to reduce liver fat accumulation.",
          "Schedule a routine check-up with your doctor to monitor liver enzymes."
        ]
      };
    } else {
      return {
        category: "High Risk",
        color: "text-rose-500",
        bgColor: "bg-rose-50 dark:bg-rose-900/20",
        borderColor: "border-rose-200 dark:border-rose-800",
        icon: <AlertTriangle className="w-12 h-12 text-rose-500 mb-4 mx-auto" />,
        explanation: "Your score suggests a high risk for liver disease. Your current habits may be putting significant stress on your liver.",
        recommendations: [
          "Strongly consider significantly reducing or eliminating alcohol consumption.",
          "Consult a gastroenterologist or hepatologist for a comprehensive liver health evaluation.",
          "Discuss a structured weight management and exercise plan with a healthcare professional.",
          "Avoid self-medicating with over-the-counter drugs that can stress the liver."
        ]
      };
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif mb-2 text-slate-900 dark:text-white">Alcohol & Liver Health Check</h2>
          <p className="text-slate-500 dark:text-slate-400">Assess your liver health risk based on your lifestyle and habits.</p>
        </div>

        {!showResult ? (
          <div className="space-y-8">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-between group"
                    >
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{option.text}</span>
                      <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className={`p-8 rounded-2xl border text-center ${getResultData().bgColor} ${getResultData().borderColor}`}>
              {getResultData().icon}
              <div className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Your Liver Health Score</div>
              <div className={`text-6xl font-black mb-2 ${getResultData().color}`}>
                {score} <span className="text-2xl text-slate-400">/ 100</span>
              </div>
              <div className={`text-xl font-bold mb-4 ${getResultData().color}`}>
                {getResultData().category}
              </div>
              <p className="text-slate-700 dark:text-slate-300 max-w-lg mx-auto">
                {getResultData().explanation}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" /> Recommendations
              </h4>
              <ul className="space-y-3">
                {getResultData().recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {score > 70 && (
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
                <p className="text-sm text-rose-800 dark:text-rose-200">
                  <strong>Medical Consultation Advised:</strong> Based on your score, we strongly recommend scheduling an appointment with a gastroenterologist or hepatologist for a professional evaluation.
                </p>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
