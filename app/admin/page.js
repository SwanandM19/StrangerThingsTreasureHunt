'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teams, setTeams] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        toast.success('Welcome to Admin Dashboard!');
        fetchData();
      } else {
        toast.error('Invalid credentials!');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [teamsRes, submissionsRes] = await Promise.all([
        fetch('/api/teams'),
        fetch('/api/submissions')
      ]);

      const teamsData = await teamsRes.json();
      const submissionsData = await submissionsRes.json();

      if (teamsData.success) setTeams(teamsData.teams);
      if (submissionsData.success) setSubmissions(submissionsData.submissions);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();

    if (!newTeamName.trim()) {
      toast.error('Team name cannot be empty');
      return;
    }

    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTeamName.trim() })
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Team added successfully!');
        setNewTeamName('');
        fetchData();
      } else {
        toast.error(data.error || 'Failed to add team');
      }
    } catch (error) {
      toast.error('Error adding team');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!confirm('Are you sure you want to delete this team?')) return;

    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Team deleted!');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete team');
    }
  };

  const handleRefresh = () => {
    fetchData();
    toast.success('Data refreshed!');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen upside-down-bg flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <h1 className="text-3xl font-bold glow-text text-center mb-6">
            Admin Login
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-red-400 font-semibold mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-red-400 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/" className="text-red-500 hover:text-red-400 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen upside-down-bg p-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold glow-text">Admin Dashboard</h1>
          <div className="space-x-4">
            <button onClick={handleRefresh} className="btn-secondary">
              🔄 Refresh
            </button>
            <Link href="/" className="btn-secondary">
              🏠 Home
            </Link>
          </div>
        </div>

        {/* Team Management Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">👥 Team Management</h2>
          
          {/* Add Team Form */}
          <form onSubmit={handleAddTeam} className="flex gap-4 mb-6">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter new team name..."
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary">
              ➕ Add Team
            </button>
          </form>

          {/* Teams List */}
          <div className="space-y-2">
            <h3 className="text-red-400 font-semibold">Registered Teams ({teams.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <span className="text-white">{team.name}</span>
                  <button
                    onClick={() => handleDeleteTeam(team._id)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
            {teams.length === 0 && (
              <p className="text-gray-500 text-center py-4">No teams registered yet</p>
            )}
          </div>
        </div>

        {/* Submissions Section */}
        <div className="card">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            📊 Submissions Tracker ({submissions.length})
          </h2>

          {submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No submissions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-red-900">
                    <th className="p-3 text-red-400">#</th>
                    <th className="p-3 text-red-400">Team Name</th>
                    <th className="p-3 text-red-400">Clue #</th>
                    <th className="p-3 text-red-400">Fragment</th>
                    <th className="p-3 text-red-400">Answer</th>
                    <th className="p-3 text-red-400">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, index) => (
                    <tr key={sub._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-3 text-gray-400">{index + 1}</td>
                      <td className="p-3 text-white font-semibold">{sub.teamName}</td>
                      <td className="p-3 text-gray-300">Clue {sub.clueNumber}</td>
                      <td className="p-3 text-red-400 font-mono">{sub.fragment}</td>
                      <td className="p-3 text-green-400 font-mono">{sub.answer}</td>
                      <td className="p-3 text-gray-400 text-sm">
                        {new Date(sub.timestamp).toLocaleString('en-IN', {
                          dateStyle: 'short',
                          timeStyle: 'medium'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Team Progress Summary */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">🏆 Team Progress</h2>
          <div className="space-y-3">
            {teams.map((team) => {
              const teamSubmissions = submissions.filter(sub => sub.teamName === team.name);
              const completedClues = teamSubmissions.length;
              const lastSubmission = teamSubmissions[teamSubmissions.length - 1];
              
              return (
                <div
                  key={team._id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-bold text-lg">{team.name}</h3>
                      <p className="text-gray-400 text-sm">
                        Completed: {completedClues}/8 clues
                      </p>
                      {lastSubmission && (
                        <p className="text-gray-500 text-xs mt-1">
                          Last: {new Date(lastSubmission.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400">
                        {Math.round((completedClues / 8) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">Progress</div>
                    </div>
                  </div>
                  <div className="mt-3 bg-gray-900 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${(completedClues / 8) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
