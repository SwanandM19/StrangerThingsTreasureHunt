'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ClueTemplate({ clueData }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch teams on component mount
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
      // Verify flag
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
        // Submit to database
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
          
          // Show next location reveal
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
    <div className="min-h-screen upside-down-bg p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-red-500 hover:text-red-400 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold glow-text mb-2">
            {clueData.title}
          </h1>
          <p className="text-red-400 text-lg">Fragment: {clueData.fragmentAwarded}</p>
        </div>

        {/* Clue Card */}
        <div className="card space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-red-500 mb-3">
              📡 {clueData.puzzle}
            </h2>
            <p className="text-gray-300 text-lg mb-4">{clueData.description}</p>
          </div>

          {/* Encoded Text Display */}
          <div className="bg-gray-800 border-2 border-red-900/50 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">Encrypted Message:</h3>
            <p className="font-mono text-xl text-white break-all">
              {clueData.encodedText}
            </p>
          </div>

          {/* Hint */}
          <div className="bg-red-900/20 border-2 border-red-700 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">💡 Hint:</h3>
            <p className="text-gray-300">{clueData.hint}</p>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Team Selection */}
            <div>
              <label className="block text-red-400 font-semibold mb-2">
                Select Your Team
              </label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="input-field"
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

            {/* Flag Input */}
            <div>
              <label className="block text-red-400 font-semibold mb-2">
                Enter Flag (UPPERCASE)
              </label>
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="Enter your answer here..."
                className="input-field uppercase"
                required
              />
              <p className="text-gray-500 text-sm mt-1">
                * Flag must be in UPPERCASE
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : '🚀 Submit Flag'}
            </button>
          </form>
        </div>

        {/* Warning */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>⚠️ Make sure your flag is correct before submitting</p>
        </div>
      </div>
    </div>
  );
}
