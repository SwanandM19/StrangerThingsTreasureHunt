// 'use client';

// import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import Link from 'next/link';

// export default function ClueTemplate({ clueData }) {
//   const [teams, setTeams] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState('');
//   const [flag, setFlag] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const fetchTeams = async () => {  
//     try {
//       const res = await fetch('/api/teams');
//       const data = await res.json();
//       if (data.success) {
//         setTeams(data.teams);
//       }
//     } catch (error) {
//       toast.error('Failed to load teams');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedTeam) {
//       toast.error('Please select your team!');
//       return;
//     }

//     if (!flag.trim()) {
//       toast.error('Please enter a flag!');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const verifyRes = await fetch('/api/verify-flag', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fragment: clueData.fragment,
//           submittedFlag: flag.trim().toUpperCase(),
//           correctFlag: clueData.correctFlag
//         })
//       });

//       const verifyData = await verifyRes.json();

//       if (verifyData.success) {
//         const submitRes = await fetch('/api/submissions', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             teamName: selectedTeam,
//             clueNumber: clueData.number,
//             fragment: clueData.fragment,
//             answer: flag.trim().toUpperCase(),
//             timestamp: new Date().toISOString()
//           })
//         });

//         const submitData = await submitRes.json();

//         if (submitData.success) {
//           toast.success('🎉 Correct! Moving to next location...');
          
//           setTimeout(() => {
//             alert(`✅ ${clueData.nextLocationReveal}`);
//             setFlag('');
//           }, 1000);
//         }
//       } else {
//         toast.error('❌ Incorrect flag. Try again!');
//       }
//     } catch (error) {
//       toast.error('Submission failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     // DIFFERENT BACKGROUND FOR CLUE PAGES
//     <div 
//       className="min-h-screen bg-cover bg-center bg-no-repeat p-4 py-8"
//       style={{ backgroundImage: "url('/clue-background.png')" }} // Different background!
//     >
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           {/* <Link href="/" className="text-red-500 hover:text-red-400 text-sm mb-4 inline-block">
//             ← Back to Home
//           </Link> */}
//           <h1 className="text-4xl md:text-6xl font-bold glow-text mb-2">
//             {clueData.title}
//           </h1>
//           <p className="text-red-400 text-lg">Fragment: {clueData.fragmentAwarded}</p>
//         </div>

//         {/* Clue Card */}
//         <div className="card space-y-6">
//           {/* <div>
//             <h2 className="text-2xl font-bold text-red-500 mb-3">
//               📡 {clueData.puzzle}
//             </h2>
//             <p className="text-gray-300 text-lg mb-4">{clueData.description}</p>
//           </div> */}

//           {/* Encoded Text Display */}
//           <div className="bg-gray-800  border-red-900/50 rounded-lg p-4">
//             <h3 className="text-red-400 font-semibold mb-2">Encrypted Message:</h3>
//             <p className="font-mono text-xl text-white break-all">
//               {clueData.encodedText}
//             </p>
//           </div>

//           {/* Hint */}
//           {/* <div className="bg-red-900/20 border-2 border-red-700 rounded-lg p-4">
//             <h3 className="text-red-400 font-semibold mb-2">💡 Hint:</h3>
//             <p className="text-gray-300">{clueData.hint}</p>
//           </div> */}

//           {/* Submission Form */}
//           <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//             {/* Team Selection */}
//             <div>
//               <label className="block text-red-400 font-semibold mb-2">
//                 Select Your Team
//               </label>
//               <select
//                 value={selectedTeam}
//                 onChange={(e) => setSelectedTeam(e.target.value)}
//                 className="input-field"
//                 required
//               >
//                 <option value="">-- Choose Team --</option>
//                 {teams.map((team) => (
//                   <option key={team._id} value={team.name}>
//                     {team.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Flag Input */}
//             <div>
//               <label className="block text-red-400 font-semibold mb-2">
//                 Enter Flag (UPPERCASE)
//               </label>
//               <input
//                 type="text"
//                 value={flag}
//                 onChange={(e) => setFlag(e.target.value)}
//                 placeholder="Enter your answer here..."
//                 className="input-field uppercase"
//                 required
//               />
//               <p className="text-gray-500 text-sm mt-1">
//                 * Flag must be in UPPERCASE
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Submitting...' : '🚀 Submit Flag'}
//             </button>
//           </form>
//         </div>

//         {/* Warning */}
//         <div className="text-center mt-6 text-gray-500 text-sm">
//           <p>⚠️ Make sure your flag is correct before submitting</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';

// export default function ClueTemplate({ clueData }) {
//   const [teams, setTeams] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState('');
//   const [flag, setFlag] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   const fetchTeams = async () => {
//     try {
//       const res = await fetch('/api/teams');
//       const data = await res.json();
//       if (data.success) {
//         setTeams(data.teams);
//       }
//     } catch (error) {
//       toast.error('Failed to load teams');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedTeam) {
//       toast.error('Please select your team!');
//       return;
//     }

//     if (!flag.trim()) {
//       toast.error('Please enter a flag!');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const verifyRes = await fetch('/api/verify-flag', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fragment: clueData.fragment,
//           submittedFlag: flag.trim().toUpperCase(),
//           correctFlag: clueData.correctFlag
//         })
//       });

//       const verifyData = await verifyRes.json();

//       if (verifyData.success) {
//         const submitRes = await fetch('/api/submissions', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             teamName: selectedTeam,
//             clueNumber: clueData.number,
//             fragment: clueData.fragment,
//             answer: flag.trim().toUpperCase(),
//             timestamp: new Date().toISOString()
//           })
//         });

//         const submitData = await submitRes.json();

//         if (submitData.success) {
//           toast.success('🎉 Correct! Moving to next location...');
          
//           setTimeout(() => {
//             alert(`✅ ${clueData.nextLocationReveal}`);
//             setFlag('');
//           }, 1000);
//         }
//       } else {
//         toast.error('❌ Incorrect flag. Try again!');
//       }
//     } catch (error) {
//       toast.error('Submission failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
//       style={{ 
//         backgroundImage: "url('/hint1.png')",
//         backgroundSize: 'cover',
//         backgroundAttachment: 'fixed'
//       }}
//     >
//       <div className="w-full max-w-2xl text-center space-y-8">
        
//         {/* Title */}
//         <h1 className="text-5xl md:text-6xl font-bold glow-text">
//           {clueData.title}
//         </h1>
//         <p className="text-red-400 text-lg">Fragment: {clueData.fragmentAwarded}</p>
//         {/* Encrypted Message - Floating */}
//         <div className="backdrop-blur-md bg-red-900/30 border-2 border-red-500 rounded-xl p-6 shadow-2xl">
//           <h3 className="text-red-400 font-bold text-xl mb-4">🔐 Encrypted Message</h3>
//           <p className="font-mono text-2xl md:text-3xl text-white break-all font-bold">
//             {clueData.encodedText}
//           </p>
//         </div>

//         {/* Submission Form - Floating */}
//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Team Selection */}
//           <div className="backdrop-blur-md bg-black/40 border-2 border-red-500 rounded-xl p-4">
//             <label className="block text-red-400 font-bold mb-3 text-lg">
//               Select Your Team
//             </label>
//             <select
//               value={selectedTeam}
//               onChange={(e) => setSelectedTeam(e.target.value)}
//               className="w-full p-4 bg-gray-900/80 border-2 border-red-600 rounded-lg text-white text-lg font-semibold focus:border-red-400 focus:outline-none"
//               required
//             >
//               <option value="">-- Choose Team --</option>
//               {teams.map((team) => (
//                 <option key={team._id} value={team.name}>
//                   {team.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Flag Input */}
//           <div className="backdrop-blur-md bg-black/40 border-2 border-red-500 rounded-xl p-4">
//             <label className="block text-red-400 font-bold mb-3 text-lg">
//               Enter Flag (UPPERCASE)
//             </label>
//             <input
//               type="text"
//               value={flag}
//               onChange={(e) => setFlag(e.target.value)}
//               placeholder="TYPE YOUR ANSWER..."
//               className="w-full p-4 bg-gray-900/80 border-2 border-red-600 rounded-lg text-white text-xl font-bold uppercase focus:border-red-400 focus:outline-none placeholder:text-gray-500"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-xl border-2 border-red-800 shadow-lg shadow-red-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? '⏳ SUBMITTING...' : '🚀 SUBMIT FLAG'}
//           </button>
//         </form>

//         {/* Warning */}
//         <p className="text-gray-400 text-sm backdrop-blur-sm bg-black/20 py-2 px-4 rounded-lg inline-block">
//           ⚠️ Make sure your flag is correct before submitting
//         </p>
//       </div>
//     </div>
//   );
// }



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
      <div className="flex-1 min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:py-10 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
          {/* Title */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-500 glow-text">
              {clueData.title}
            </h1>
            <p className="text-red-400/90 text-base sm:text-lg md:text-xl font-semibold mt-1 sm:mt-2">
              Fragment: {clueData.fragmentAwarded}
            </p>
          </div>

          {/* Centered clue panel (title + form block) */}
          <div className="clue-panel text-center space-y-5 sm:space-y-6 mx-auto">
            <div>
              <h3 className="text-red-400 font-bold text-lg sm:text-xl mb-3 sm:mb-4">🔐 Encrypted Message</h3>
              <p className="font-mono text-xl sm:text-2xl md:text-3xl text-white font-bold break-all" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
                {clueData.encodedText}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
              <div>
                <label className="block text-red-400 font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Select Your Team
                </label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="input-field w-full text-base sm:text-lg"
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

              <div>
                <label className="block text-red-400 font-bold mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Enter Flag (UPPERCASE)
                </label>
                <input
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="TYPE YOUR ANSWER..."
                  className="input-field uppercase w-full text-base sm:text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 sm:py-4 text-base sm:text-lg md:text-xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '⏳ SUBMITTING...' : '🚀 SUBMIT FLAG'}
              </button>
            </form>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6 text-center max-w-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
            ⚠️ Make sure your flag is correct before submitting
          </p>
        </div>
      </div>
    </div>
  );
}
