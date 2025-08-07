import { Link, useLocation } from "wouter";
import { 
  Home, 
  Heart, 
  Calendar, 
  DollarSign, 
  Users, 
  LogOut,
  BellRing
} from "lucide-react";

const sidebarItems = [
  { path: "/", label: "HOME", icon: Home },
  { path: "/health", label: "HEALTH", icon: Heart },
  { path: "/coach-ai", label: "COACH AI", icon: BellRing },
  { path: "/life-years", label: "LIFE YEARS", icon: Calendar },
  { path: "/payoffs", label: "PAYOFFS", icon: DollarSign },
  { path: "/football", label: "FOOTBALL", icon: Users },
];

const languages = [
  { code: "BR", color: "bg-green-500" },
  { code: "US", color: "bg-blue-500" },
  { code: "ES", color: "bg-red-500" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center">
            <span className="text-gold text-xl font-bold">⚽</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-navy uppercase tracking-wider">World Cup</h1>
            <p className="text-xs text-gray-600 uppercase tracking-wider">of Healing</p>
            <p className="text-xs text-gold font-semibold mt-1">FC MOTHER</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <a className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'text-white bg-navy shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </div>

        {/* Sign Out */}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full">
            <LogOut className="w-5 h-5 mr-3" />
            SIGN OUT
          </button>
        </div>
      </nav>

      {/* Language Selector */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-8 h-6 ${lang.color} rounded flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity`}
            >
              {lang.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
