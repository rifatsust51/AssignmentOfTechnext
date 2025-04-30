import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/authcontext';
import { useEffect, useState, useCallback } from 'react';
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Clients', path: '/clients' },
  { name: 'Projects', path: '/projects' },
  { name: 'Reminders', path: '/reminders' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { logout } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 h-screen z-30 bg-gray-800 text-white p-4 flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Mini CRM</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded hover:bg-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-2 flex-grow">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`p-3 rounded-md transition-colors ${
                location.pathname === path
                  ? 'bg-gray-700 font-medium'
                  : 'hover:bg-gray-700'
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-full p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? (
              <>
                <SunIcon className="h-5 w-5 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <MoonIcon className="h-5 w-5 mr-2" />
                Dark Mode
              </>
            )}
          </button>

          <button
            onClick={logout}
            className="w-full p-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="lg:hidden p-4 bg-white dark:bg-gray-800 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 p-6 bg-white dark:bg-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
