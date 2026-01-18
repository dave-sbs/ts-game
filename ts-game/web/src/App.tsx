import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Home, Map, BookOpen, HelpCircle, Trophy } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Zones from './pages/Zones';
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';
import Achievements from './pages/Achievements';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <NavLink to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-ts-blue to-quest-purple rounded-lg flex items-center justify-center font-bold text-lg">
                  TS
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-ts-blue to-quest-purple bg-clip-text text-transparent">
                  TypeScript Quest
                </span>
              </NavLink>
              
              <nav className="flex items-center gap-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-ts-blue text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`
                  }
                >
                  <Home size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </NavLink>
                
                <NavLink
                  to="/zones"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-ts-blue text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`
                  }
                >
                  <Map size={18} />
                  <span className="hidden sm:inline">Skill Tree</span>
                </NavLink>
                
                <NavLink
                  to="/learn/basic-annotations"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-ts-blue text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`
                  }
                >
                  <BookOpen size={18} />
                  <span className="hidden sm:inline">Learn</span>
                </NavLink>
                
                <NavLink
                  to="/quiz/basic-annotations"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-ts-blue text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`
                  }
                >
                  <HelpCircle size={18} />
                  <span className="hidden sm:inline">Quiz</span>
                </NavLink>
                
                <NavLink
                  to="/achievements"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-ts-blue text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`
                  }
                >
                  <Trophy size={18} />
                  <span className="hidden sm:inline">Badges</span>
                </NavLink>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/learn/:topic" element={<Lesson />} />
            <Route path="/quiz/:topic" element={<Quiz />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-slate-800 border-t border-slate-700 py-4">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>TypeScript Quest - Learn TypeScript through gamified exercises</p>
            <p className="mt-1">
              Run <code className="bg-slate-700 px-2 py-0.5 rounded text-ts-blue">ts-quest start</code> in your terminal to begin coding!
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
