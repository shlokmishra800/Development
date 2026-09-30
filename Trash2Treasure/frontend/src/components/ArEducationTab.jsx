import React, { useState } from 'react';
import { Gamepad2, Award, Sparkles, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ArEducationTab({ onEarnPoints }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      q: "Which bin color is standard for clean plastic bottles & recyclables?",
      options: ["Green Composting Bin", "Yellow Recycling Bin", "Black Landfill Bin", "Red Hazard Bin"],
      answer: 1,
      explanation: "Yellow bins are designated for dry recyclables like PET bottles, cans, and paper."
    },
    {
      q: "Why should old lithium phone batteries NEVER be thrown in general trash?",
      options: ["They rot too quickly", "They cause fire hazards & chemical leaks", "They take up no space", "They turn into soil"],
      answer: 1,
      explanation: "Lithium batteries can rupture, sparking severe landfill fires and leaching heavy metals into groundwater."
    },
    {
      q: "How many liters of water can recycling 1 ton of paper save?",
      options: ["100 Liters", "500 Liters", "About 26,000 Liters", "50 Liters"],
      answer: 2,
      explanation: "Recycling paper saves up to 26,000 liters of water per ton compared to virgin tree pulping!"
    }
  ];

  const handleSelect = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    if (idx === questions[currentQuestion].answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      onEarnPoints(50);
      try {
        confetti({ particleCount: 80, spread: 60 });
      } catch (e) {}
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="glass-panel rounded-3xl p-6 border border-teal-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
          <Gamepad2 className="w-3.5 h-3.5" /> Gamified AR & Kids Eco Education
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Eco Recycling Challenge & Quiz
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Test your eco-knowledge, unlock badges, and claim <span className="text-teal-400 font-bold">+50 bonus Eco-Points!</span>
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        {!quizFinished ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-3">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-teal-400 font-mono">Score: {score}/{questions.length}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100">
              {questions[currentQuestion].q}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((opt, idx) => {
                let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                if (selectedOption !== null) {
                  if (idx === questions[currentQuestion].answer) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && idx === questions[currentQuestion].answer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {selectedOption === idx && idx !== questions[currentQuestion].answer && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2 animate-fade-in">
                <p className="font-semibold text-teal-400">💡 Eco Fact:</p>
                <p>{questions[currentQuestion].explanation}</p>
                <button
                  onClick={handleNext}
                  className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs"
                >
                  {currentQuestion + 1 < questions.length ? 'Next Question →' : 'Complete Quiz & Claim +50 Pts'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100">Quiz Completed!</h3>
            <p className="text-sm text-slate-300">
              You scored <span className="text-teal-400 font-bold">{score}/{questions.length}</span>! You've been rewarded <span className="text-emerald-400 font-bold">+50 Eco-Points</span>.
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
