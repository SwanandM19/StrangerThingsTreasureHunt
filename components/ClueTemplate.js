
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ClueTemplate({ clueData }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/teams');
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (error) {
      toast.error('Failed to load teams');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTeam) {
      toast.error('Please select your team!');
      return;
    }

    if (!flag.trim()) {
      toast.error('Please enter a flag!');
      return;
    }

    setIsSubmitting(true);

    try {
      const verifyRes = await fetch('/api/verify-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fragment: clueData.fragment,
          submittedFlag: flag.trim().toUpperCase(),
          correctFlag: clueData.correctFlag
        })
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        const submitRes = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            teamName: selectedTeam,
            clueNumber: clueData.number,
            fragment: clueData.fragment,
            answer: flag.trim().toUpperCase(),
            timestamp: new Date().toISOString()
          })
        });

        const submitData = await submitRes.json();

        if (submitData.success) {
          toast.success('🎉 Correct! Moving to next location...');
          
          setTimeout(() => {
            alert(`✅ ${clueData.nextLocationReveal}`);
            setFlag('');
          }, 1000);
        }
      } else {
        toast.error('❌ Incorrect flag. Try again!');
      }
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Background – fixed so it doesn’t move on scroll; works on mobile */}
      <div
        className="page-bg"
        style={{ backgroundImage: "url('/hint1.png')" }}
        aria-hidden
      />

      {/* Scrollable, centered content */}
      <div className="flex-1 min-h-screen flex items-center justify-center px-3 py-5 min-[375px]:px-4 sm:px-5 sm:py-6 md:px-6 md:py-8 overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[22rem] sm:max-w-xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-5">
          {/* Title */}
          <div className="text-center mb-0">
            <h1 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-500 glow-text leading-tight">
              {clueData.title}
            </h1>
            <p className="text-red-400/90 text-sm min-[375px]:text-base sm:text-lg md:text-xl font-semibold mt-2 sm:mt-3">
              Fragment: {clueData.fragmentAwarded}
            </p>
          </div>

          {/* Centered clue panel */}
          <div className="clue-panel text-center mx-auto w-full">
            {/* Encrypted Message – clear spacing below */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-red-400 font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                🔐 Encrypted Message
              </h3>
              <p
                className="font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold break-all hyphens-none"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
              >
                {clueData.encodedText}
              </p>
            </div>

            {/* Form – grouped spacing via clue-form-group */}
            <form onSubmit={handleSubmit} className="text-left">
              <div className="clue-form-group">
                <label htmlFor="team-select" className="text-red-400 font-bold text-sm sm:text-base">
                  Select Your Team
                </label>
                <select
                  id="team-select"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="input-field w-full text-sm sm:text-base"
                  required
                >
                  <option value="">-- Choose Team --</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="clue-form-group">
                <label htmlFor="flag-input" className="text-red-400 font-bold text-sm sm:text-base">
                  Enter Flag (UPPERCASE)
                </label>
                <input
                  id="flag-input"
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="TYPE YOUR ANSWER..."
                  className="input-field uppercase w-full text-sm sm:text-base"
                  required
                />
              </div>

              <div className="clue-form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '⏳ SUBMITTING...' : '🚀 SUBMIT FLAG'}
                </button>
              </div>
            </form>
          </div>

          <p
            className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 text-center max-w-[20rem] sm:max-w-md"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            ⚠️ Make sure your flag is correct before submitting
          </p>
        </div>
      </div>
    </div>
  );
}
